<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\GalleryImage;
use App\Repository\GalleryImageRepository;
use App\Service\ImageUrlNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/gallery')]
final class GalleryController extends AbstractController
{
    public function __construct(
        private readonly GalleryImageRepository $repository,
        private readonly ImageUrlNormalizer $imageUrlNormalizer,
    ) {
    }

    #[Route('', name: 'api_gallery_index', methods: ['GET'])]
    public function index(Request $request): JsonResponse
    {
        $images = $this->repository->findAllSorted();

        $payload = [];
        foreach ($images as $image) {
            if (!in_array($image->getCategory(), GalleryImage::CATEGORIES, true)) {
                continue;
            }
            $payload[] = [
                'id' => (int) $image->getId(),
                'src' => $this->imageUrlNormalizer->normalize($image->getImage(), $request),
                'category' => $image->getCategory(),
            ];
        }

        return new JsonResponse($payload);
    }
}
