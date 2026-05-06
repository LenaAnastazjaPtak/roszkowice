<?php

declare(strict_types=1);

namespace App\Security;

use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

/**
 * @implements UserProviderInterface<EnvAdminUser>
 */
final class EnvAdminUserProvider implements UserProviderInterface
{
    public function __construct(
        #[Autowire(env: 'ADMIN_EMAIL')]
        private readonly string $adminEmail,
    ) {
        if ($this->adminEmail === '') {
            throw new \RuntimeException('Missing required environment variable: ADMIN_EMAIL');
        }
    }

    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        if ($identifier !== $this->adminEmail) {
            throw new UserNotFoundException(sprintf('Admin "%s" not found.', $identifier));
        }

        return new EnvAdminUser($identifier);
    }

    public function refreshUser(UserInterface $user): UserInterface
    {
        if (!$user instanceof EnvAdminUser) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        if ($user->getUserIdentifier() !== $this->adminEmail) {
            throw new UserNotFoundException('Admin email changed; session is no longer valid.');
        }

        return new EnvAdminUser($user->getUserIdentifier());
    }

    public function supportsClass(string $class): bool
    {
        return $class === EnvAdminUser::class || is_subclass_of($class, EnvAdminUser::class);
    }
}
