<?php

declare(strict_types=1);

$backendFrontController = __DIR__ . '/backend-php/public/index.php';

if (!is_file($backendFrontController)) {
    throw new RuntimeException('Backend front controller not found: ' . $backendFrontController);
}

return require $backendFrontController;
