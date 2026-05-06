<?php

declare(strict_types=1);

namespace App\Security;

use Symfony\Component\Security\Core\User\UserInterface;

final class EnvAdminUser implements UserInterface
{
    public function __construct(private readonly string $email)
    {
    }

    public function getRoles(): array
    {
        return ['ROLE_ADMIN'];
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function eraseCredentials(): void
    {
    }
}
