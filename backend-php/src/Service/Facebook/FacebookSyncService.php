<?php

declare(strict_types=1);

namespace App\Service\Facebook;

use App\Entity\BlogPost;
use App\Repository\BlogPostRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Contracts\HttpClient\HttpClientInterface;

final class FacebookSyncService
{
    private const POST_LIMIT = 25;
    private const TITLE_MAX_LENGTH = 255;

    public function __construct(
        private readonly HttpClientInterface $httpClient,
        private readonly EntityManagerInterface $entityManager,
        private readonly BlogPostRepository $blogPostRepository,
        #[Autowire(env: 'FACEBOOK_PAGE_ID')]
        private readonly string $pageId,
        #[Autowire(env: 'FACEBOOK_PAGE_ACCESS_TOKEN')]
        private readonly string $pageAccessToken,
        #[Autowire(env: 'FACEBOOK_GRAPH_VERSION')]
        private readonly string $graphVersion,
    ) {
        if ($this->pageId === '') {
            throw new \RuntimeException('Missing required environment variable: FACEBOOK_PAGE_ID');
        }
        if ($this->pageAccessToken === '') {
            throw new \RuntimeException('Missing required environment variable: FACEBOOK_PAGE_ACCESS_TOKEN');
        }
        if ($this->graphVersion === '') {
            throw new \RuntimeException('Missing required environment variable: FACEBOOK_GRAPH_VERSION');
        }
    }

    /**
     * @return array{imported: int, skipped: int}
     */
    public function sync(): array
    {
        $posts = $this->fetchPublishedPosts();
        $imported = 0;
        $skipped = 0;

        foreach ($posts as $postData) {
            if ($this->importPost($postData)) {
                $imported++;
            } else {
                $skipped++;
            }
        }

        if ($imported > 0) {
            $this->entityManager->flush();
        }

        return ['imported' => $imported, 'skipped' => $skipped];
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function fetchPublishedPosts(): array
    {
        $url = sprintf(
            'https://graph.facebook.com/%s/%s/published_posts',
            $this->graphVersion,
            $this->pageId,
        );

        $response = $this->httpClient->request('GET', $url, [
            'query' => [
                'fields' => 'id,message,created_time,full_picture',
                'limit' => self::POST_LIMIT,
                'access_token' => $this->pageAccessToken,
            ],
        ]);

        $statusCode = $response->getStatusCode();
        $payload = $response->toArray(false);

        if ($statusCode >= 400) {
            $message = is_array($payload['error'] ?? null)
                ? (string) ($payload['error']['message'] ?? 'Facebook Graph API error')
                : 'Facebook Graph API error';
            throw new \RuntimeException(sprintf('Facebook Graph API responded with %d: %s', $statusCode, $message));
        }

        $data = $payload['data'] ?? null;
        if (!is_array($data)) {
            throw new \RuntimeException('Facebook Graph API returned an unexpected response shape.');
        }

        /** @var list<array<string, mixed>> $posts */
        $posts = array_values(array_filter($data, 'is_array'));

        return $posts;
    }

    /**
     * @param array<string, mixed> $postData
     */
    private function importPost(array $postData): bool
    {
        $externalId = isset($postData['id']) ? (string) $postData['id'] : '';
        if ($externalId === '') {
            return false;
        }

        if ($this->blogPostRepository->findOneByExternalId($externalId) !== null) {
            return false;
        }

        $message = isset($postData['message']) ? trim((string) $postData['message']) : '';
        $image = isset($postData['full_picture']) ? trim((string) $postData['full_picture']) : '';
        if ($message === '' || $image === '') {
            return false;
        }

        $createdTime = isset($postData['created_time']) ? (string) $postData['created_time'] : '';
        if ($createdTime === '') {
            return false;
        }

        $post = new BlogPost();
        $post->setExternalId($externalId);
        $post->setImage($image);
        $post->setContent($message);
        $post->setTitle($this->buildTitle($message));
        $post->setPublishedAt(new \DateTimeImmutable($createdTime));

        $this->entityManager->persist($post);

        return true;
    }

    private function buildTitle(string $message): string
    {
        $lines = preg_split('/\R/u', $message);
        if ($lines === false) {
            $title = $message;
        } else {
            $title = '';
            foreach ($lines as $line) {
                $line = trim($line);
                if ($line !== '') {
                    $title = $line;
                    break;
                }
            }
            if ($title === '') {
                $title = $message;
            }
        }

        if (mb_strlen($title) > self::TITLE_MAX_LENGTH) {
            return rtrim(mb_substr($title, 0, self::TITLE_MAX_LENGTH - 3)) . '...';
        }

        return $title;
    }
}
