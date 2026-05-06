<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\GalleryImage;
use App\Repository\GalleryImageRepository;
use Doctrine\ORM\EntityManagerInterface;

final class GalleryReorderService
{
    public const DIRECTION_UP = 'up';
    public const DIRECTION_DOWN = 'down';

    public function __construct(
        private readonly GalleryImageRepository $repository,
        private readonly EntityManagerInterface $entityManager,
    ) {
    }

    /**
     * Re-numbers `sort_order` to the dense sequence 1..N preserving current order.
     *
     * @return GalleryImage[]
     */
    public function normalize(): array
    {
        $images = $this->repository->findAllSorted();

        foreach ($images as $index => $image) {
            $expected = $index + 1;
            if ($image->getSortOrder() !== $expected) {
                $image->setSortOrder($expected);
            }
        }

        return $images;
    }

    public function moveAdjacent(GalleryImage $image, string $direction): void
    {
        if ($direction !== self::DIRECTION_UP && $direction !== self::DIRECTION_DOWN) {
            throw new \InvalidArgumentException(sprintf('Invalid direction: %s', $direction));
        }

        $images = $this->normalize();
        $currentIndex = null;
        foreach ($images as $index => $candidate) {
            if ($candidate->getId() === $image->getId()) {
                $currentIndex = $index;
                break;
            }
        }
        if ($currentIndex === null) {
            return;
        }

        $targetIndex = $direction === self::DIRECTION_UP ? $currentIndex - 1 : $currentIndex + 1;
        if ($targetIndex < 0 || $targetIndex >= count($images)) {
            return;
        }

        $reordered = $images;
        $moved = array_splice($reordered, $currentIndex, 1);
        array_splice($reordered, $targetIndex, 0, $moved);

        foreach ($reordered as $index => $entity) {
            $entity->setSortOrder($index + 1);
        }
    }

    /**
     * Applies the given ordered list of image IDs and assigns dense sort_order = 1..N.
     * Missing IDs (not in $orderedIds but present in DB) keep their relative order at the end.
     *
     * @param int[] $orderedIds
     *
     * @return GalleryImage[] All gallery images after reordering, sorted by sort_order.
     */
    public function applyOrder(array $orderedIds): array
    {
        $images = $this->repository->findAllSorted();
        if ($images === []) {
            return [];
        }

        /** @var array<int, GalleryImage> $byId */
        $byId = [];
        foreach ($images as $image) {
            $byId[$image->getId()] = $image;
        }

        $sequence = [];
        $seen = [];
        foreach ($orderedIds as $id) {
            $intId = (int) $id;
            if ($intId <= 0 || !isset($byId[$intId]) || isset($seen[$intId])) {
                continue;
            }
            $sequence[] = $byId[$intId];
            $seen[$intId] = true;
        }
        foreach ($images as $image) {
            if (!isset($seen[$image->getId()])) {
                $sequence[] = $image;
            }
        }

        $this->entityManager->wrapInTransaction(function () use ($sequence): void {
            foreach ($sequence as $index => $image) {
                $image->setSortOrder($index + 1);
            }
        });

        return $sequence;
    }
}
