<?php

declare(strict_types=1);

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;

final class ImageUrlNormalizer
{
    public function normalize(?string $image, Request $request): ?string
    {
        if ($image === null || $image === '') {
            return $image;
        }

        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://')) {
            return $image;
        }

        $baseUrl = $request->getSchemeAndHttpHost();

        if (str_starts_with($image, 'uploads/')) {
            return $baseUrl . '/' . $image;
        }

        if (str_starts_with($image, '/')) {
            return $baseUrl . $image;
        }

        return $baseUrl . '/uploads/' . $image;
    }
}
