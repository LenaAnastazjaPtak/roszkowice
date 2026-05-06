<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Repository\GalleryImageRepository;
use App\Service\GalleryReorderService;
use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminRoute;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_ADMIN')]
final class GalleryReorderController extends AbstractController
{
    public function __construct(
        private readonly GalleryImageRepository $repository,
        private readonly GalleryReorderService $reorderService,
    ) {
    }

    #[AdminRoute(path: '/gallery/reorder', name: 'gallery_reorder', options: ['methods' => ['GET']])]
    public function page(): Response
    {
        $images = $this->reorderService->normalize();

        return $this->render('admin/gallery_reorder.html.twig', [
            'images' => $this->serializeImages($images),
        ]);
    }

    #[AdminRoute(path: '/gallery/reorder', name: 'gallery_reorder_save', options: ['methods' => ['POST']])]
    public function save(Request $request): JsonResponse
    {
        if (!$this->isCsrfTokenValid('gallery_reorder', (string) $request->request->get('_csrf_token', ''))) {
            return new JsonResponse(['error' => 'Nieprawidłowy token CSRF.'], Response::HTTP_BAD_REQUEST);
        }

        $payload = $this->extractOrder($request);
        $reordered = $this->reorderService->applyOrder($payload);

        return new JsonResponse([
            'images' => $this->serializeImages($reordered),
        ]);
    }

    /**
     * @return int[]
     */
    private function extractOrder(Request $request): array
    {
        $raw = $request->request->all('order');
        if ($raw === []) {
            $body = $request->getContent();
            if ($body !== '') {
                $decoded = json_decode($body, true);
                if (is_array($decoded) && isset($decoded['order']) && is_array($decoded['order'])) {
                    $raw = $decoded['order'];
                }
            }
        }

        return array_map(static fn ($value): int => (int) $value, $raw);
    }

    /**
     * @param iterable<\App\Entity\GalleryImage> $images
     *
     * @return array<int, array{id: int, image: string, category: string, sortOrder: int}>
     */
    private function serializeImages(iterable $images): array
    {
        $result = [];
        foreach ($images as $image) {
            $id = $image->getId();
            if ($id === null) {
                continue;
            }
            $result[] = [
                'id' => $id,
                'image' => $this->buildPublicImagePath($image->getImage()),
                'category' => $image->getCategory(),
                'sortOrder' => $image->getSortOrder(),
            ];
        }

        return $result;
    }

    private function buildPublicImagePath(?string $image): string
    {
        if ($image === null || $image === '') {
            return '';
        }
        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://') || str_starts_with($image, '/')) {
            return $image;
        }
        if (str_starts_with($image, 'uploads/')) {
            return '/' . $image;
        }

        return '/uploads/' . $image;
    }
}
