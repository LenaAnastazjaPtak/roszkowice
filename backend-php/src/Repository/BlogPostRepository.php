<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\BlogPost;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<BlogPost>
 */
class BlogPostRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BlogPost::class);
    }

    /**
     * @return BlogPost[]
     */
    public function findAllWithTranslationForLocale(string $locale): array
    {
        return $this->createQueryBuilder('p')
            ->innerJoin('p.translations', 't', 'WITH', 't.locale = :locale')
            ->addSelect('t')
            ->setParameter('locale', $locale)
            ->orderBy('p.publishedAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findOneWithTranslationForLocale(int $id, string $locale): ?BlogPost
    {
        return $this->createQueryBuilder('p')
            ->innerJoin('p.translations', 't', 'WITH', 't.locale = :locale')
            ->addSelect('t')
            ->andWhere('p.id = :id')
            ->setParameter('id', $id)
            ->setParameter('locale', $locale)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
