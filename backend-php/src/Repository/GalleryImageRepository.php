<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\GalleryImage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<GalleryImage>
 */
class GalleryImageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GalleryImage::class);
    }

    /**
     * @return GalleryImage[]
     */
    public function findAllSorted(): array
    {
        return $this->createQueryBuilder('g')
            ->orderBy('g.sortOrder', 'ASC')
            ->addOrderBy('g.id', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function findMaxSortOrder(): int
    {
        $result = $this->createQueryBuilder('g')
            ->select('MAX(g.sortOrder)')
            ->getQuery()
            ->getSingleScalarResult();

        return $result === null ? 0 : (int) $result;
    }
}
