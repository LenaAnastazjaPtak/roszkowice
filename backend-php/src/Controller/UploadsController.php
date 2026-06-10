<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;

final class UploadsController extends AbstractController
{
    public function __construct(
        #[Autowire('%kernel.project_dir%/public/uploads')]
        private readonly string $uploadsDir,
    ) {
        if ($this->uploadsDir === '') {
            throw new \RuntimeException('Missing required parameter: uploads directory');
        }
    }

    #[Route('/uploads/{path}', name: 'app_uploads', methods: ['GET'], requirements: ['path' => '.+'])]
    public function serve(string $path): BinaryFileResponse
    {
        $rootRealPath = realpath($this->uploadsDir);
        if ($rootRealPath === false || !is_dir($rootRealPath)) {
            throw new NotFoundHttpException(sprintf('Uploads dir not found: %s', $this->uploadsDir));
        }

        $candidate = $rootRealPath . DIRECTORY_SEPARATOR . str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $path);
        $resolved = realpath($candidate);
        if ($resolved === false || !is_file($resolved)) {
            throw new NotFoundHttpException(sprintf('Upload not found: %s', $path));
        }

        if (!str_starts_with($resolved, $rootRealPath . DIRECTORY_SEPARATOR) && $resolved !== $rootRealPath) {
            throw new NotFoundHttpException('Path traversal blocked.');
        }

        $response = new BinaryFileResponse($resolved);
        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_INLINE,
            basename($resolved),
        );
        $response->headers->set('Cache-Control', 'public, max-age=86400');

        return $response;
    }
}
