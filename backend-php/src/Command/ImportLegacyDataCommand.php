<?php

declare(strict_types=1);

namespace App\Command;

use App\Entity\BlogPost;
use App\Entity\BlogPostTranslation;
use App\Entity\GalleryImage;
use App\Repository\BlogPostTranslationRepository;
use App\Repository\GalleryImageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

#[AsCommand(
    name: 'app:import-legacy',
    description: 'Imports BlogPost, BlogPostTranslation and GalleryImage rows from the legacy Prisma database.',
)]
final class ImportLegacyDataCommand extends Command
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly BlogPostTranslationRepository $translationRepository,
        private readonly GalleryImageRepository $galleryRepository,
        #[Autowire(env: 'LEGACY_DATABASE_URL')]
        private readonly string $legacyDatabaseUrl,
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        if ($this->legacyDatabaseUrl === '') {
            $io->error('Missing required environment variable: LEGACY_DATABASE_URL');

            return Command::FAILURE;
        }

        $legacyConnection = $this->createLegacyConnection();

        $importedGallery = $this->importGalleryImages($legacyConnection, $io);
        $importedPosts = $this->importBlogPosts($legacyConnection, $io);

        $this->entityManager->flush();

        $io->success(sprintf(
            'Import zakończony. Posty: %d nowych, galeria: %d nowych.',
            $importedPosts,
            $importedGallery,
        ));

        return Command::SUCCESS;
    }

    private function importGalleryImages(\PDO $legacy, SymfonyStyle $io): int
    {
        $rows = $legacy->query('SELECT id, image, category, "sortOrder", "createdAt", "updatedAt" FROM "GalleryImage" ORDER BY "sortOrder" ASC, id ASC')->fetchAll(\PDO::FETCH_ASSOC);
        if ($rows === false || $rows === []) {
            $io->writeln('Brak rekordów GalleryImage do importu.');

            return 0;
        }

        $imported = 0;
        foreach ($rows as $row) {
            $image = $row['image'] !== null ? (string) $row['image'] : null;
            $category = (string) $row['category'];

            $existing = $this->galleryRepository->findOneBy([
                'image' => $image,
                'category' => $category,
            ]);
            if ($existing !== null) {
                continue;
            }

            $entity = new GalleryImage();
            $entity->setImage($image);
            $entity->setCategory($category);
            $entity->setSortOrder((int) $row['sortOrder']);

            $this->entityManager->persist($entity);
            $imported++;
        }

        $io->writeln(sprintf('Galeria: %d nowych rekordów do dodania.', $imported));

        return $imported;
    }

    private function importBlogPosts(\PDO $legacy, SymfonyStyle $io): int
    {
        $postRows = $legacy->query('SELECT id, image, "publishedAt", "createdAt", "updatedAt" FROM "BlogPost" ORDER BY id ASC')->fetchAll(\PDO::FETCH_ASSOC);
        if ($postRows === false || $postRows === []) {
            $io->writeln('Brak rekordów BlogPost do importu.');

            return 0;
        }

        $translationStmt = $legacy->prepare('SELECT locale, title, header, content FROM "BlogPostTranslation" WHERE "blogPostId" = :postId');

        $imported = 0;
        foreach ($postRows as $row) {
            $publishedAt = new \DateTimeImmutable((string) $row['publishedAt']);
            $image = $row['image'] !== null ? (string) $row['image'] : null;

            $translationStmt->execute(['postId' => (int) $row['id']]);
            $translations = $translationStmt->fetchAll(\PDO::FETCH_ASSOC);
            if ($translations === false || $translations === []) {
                continue;
            }

            $plTranslation = null;
            foreach ($translations as $translation) {
                if ($translation['locale'] === 'pl') {
                    $plTranslation = $translation;
                    break;
                }
            }

            if ($plTranslation !== null && $this->postExists($publishedAt, (string) $plTranslation['title'])) {
                continue;
            }

            $post = new BlogPost();
            $post->setImage($image);
            $post->setPublishedAt($publishedAt);

            foreach ($translations as $translation) {
                $entity = new BlogPostTranslation();
                $entity->setLocale((string) $translation['locale']);
                $entity->setTitle((string) $translation['title']);
                $entity->setHeader((string) $translation['header']);
                $entity->setContent((string) $translation['content']);
                $post->addTranslation($entity);
            }

            $this->entityManager->persist($post);
            $imported++;
        }

        $io->writeln(sprintf('Posty: %d nowych rekordów do dodania.', $imported));

        return $imported;
    }

    private function postExists(\DateTimeImmutable $publishedAt, string $plTitle): bool
    {
        $qb = $this->translationRepository->createQueryBuilder('t')
            ->select('1')
            ->innerJoin('t.blogPost', 'p')
            ->andWhere('p.publishedAt = :publishedAt')
            ->andWhere('t.locale = :locale')
            ->andWhere('t.title = :title')
            ->setParameter('publishedAt', $publishedAt)
            ->setParameter('locale', 'pl')
            ->setParameter('title', $plTitle)
            ->setMaxResults(1);

        return $qb->getQuery()->getOneOrNullResult() !== null;
    }

    private function createLegacyConnection(): \PDO
    {
        $dsn = $this->buildDsn($this->legacyDatabaseUrl);

        return new \PDO(
            $dsn['dsn'],
            $dsn['user'],
            $dsn['password'],
            [
                \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            ],
        );
    }

    /**
     * @return array{dsn: string, user: string|null, password: string|null}
     */
    private function buildDsn(string $url): array
    {
        $parts = parse_url($url);
        if ($parts === false || !isset($parts['scheme'], $parts['host'])) {
            throw new \InvalidArgumentException(sprintf('Invalid LEGACY_DATABASE_URL: %s', $url));
        }

        $database = ltrim($parts['path'] ?? '', '/');
        if ($database === '') {
            throw new \InvalidArgumentException('LEGACY_DATABASE_URL is missing the database name.');
        }

        $port = $parts['port'] ?? 5432;
        $dsn = sprintf('pgsql:host=%s;port=%d;dbname=%s', $parts['host'], $port, $database);

        return [
            'dsn' => $dsn,
            'user' => isset($parts['user']) ? urldecode($parts['user']) : null,
            'password' => isset($parts['pass']) ? urldecode($parts['pass']) : null,
        ];
    }
}
