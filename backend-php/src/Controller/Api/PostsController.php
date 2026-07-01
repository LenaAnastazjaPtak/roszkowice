<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\BlogPost;
use App\Repository\BlogPostRepository;
use App\Service\ImageUrlNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/posts')]
final class PostsController extends AbstractController
{
    private const VALID_LOCALES = ['pl', 'en', 'de'];

    public function __construct(
        private readonly BlogPostRepository $repository,
        private readonly ImageUrlNormalizer $imageUrlNormalizer,
    ) {
    }

    #[Route('', name: 'api_posts_index', methods: ['GET'])]
    public function index(Request $request): JsonResponse
    {
        if ($this->getValidatedLocale($request) === null) {
            return $this->invalidLocaleResponse();
        }

        $posts = $this->repository->findAllOrderedByPublishedAt();
        $payload = array_map(
            fn (BlogPost $post) => $this->formatPost($post, $request),
            $posts,
        );

        return new JsonResponse($payload);
    }

    #[Route('/{id}', name: 'api_posts_show', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function show(int $id, Request $request): JsonResponse
    {
        if ($this->getValidatedLocale($request) === null) {
            return $this->invalidLocaleResponse();
        }

        $post = $this->repository->find($id);
        if (!$post instanceof BlogPost) {
            return new JsonResponse(['error' => 'Post not found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse($this->formatPost($post, $request));
    }

    private function getValidatedLocale(Request $request): ?string
    {
        $locale = $request->query->get('locale');
        if (!is_string($locale) || !in_array($locale, self::VALID_LOCALES, true)) {
            return null;
        }

        return $locale;
    }

    private function invalidLocaleResponse(): JsonResponse
    {
        return new JsonResponse(
            ['error' => 'Missing or invalid locale query param (pl, en, de)'],
            Response::HTTP_BAD_REQUEST,
        );
    }

    /**
     * @return array{id: int, image: string, publishedAt: string, title: string, content: string}
     */
    private function formatPost(BlogPost $post, Request $request): array
    {
        return [
            'id' => (int) $post->getId(),
            'image' => $this->imageUrlNormalizer->normalize($post->getImage(), $request),
            'publishedAt' => $post->getPublishedAt()->format(\DateTimeInterface::ATOM),
            'title' => $post->getTitle(),
            'content' => $post->getContent(),
        ];
    }
}
