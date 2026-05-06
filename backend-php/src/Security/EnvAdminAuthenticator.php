<?php

declare(strict_types=1);

namespace App\Security;

use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Http\SecurityRequestAttributes;
use Symfony\Component\Security\Http\Util\TargetPathTrait;

final class EnvAdminAuthenticator extends AbstractLoginFormAuthenticator
{
    use TargetPathTrait;

    public const LOGIN_ROUTE = 'app_admin_login';

    public function __construct(
        private readonly UrlGeneratorInterface $urlGenerator,
        #[Autowire(env: 'ADMIN_EMAIL')]
        private readonly string $adminEmail,
        #[Autowire(env: 'ADMIN_PASSWORD')]
        private readonly string $adminPassword,
    ) {
        if ($this->adminEmail === '' || $this->adminPassword === '') {
            throw new \RuntimeException('Missing required environment variables: ADMIN_EMAIL and/or ADMIN_PASSWORD');
        }
    }

    public function authenticate(Request $request): Passport
    {
        $email = trim((string) $request->request->get('email', ''));
        $password = (string) $request->request->get('password', '');
        $csrfToken = (string) $request->request->get('_csrf_token', '');

        $request->getSession()->set(SecurityRequestAttributes::LAST_USERNAME, $email);

        if ($email === '' || $password === '') {
            throw new BadCredentialsException('Email i hasło są wymagane.');
        }

        if (!hash_equals($this->adminEmail, $email) || !hash_equals($this->adminPassword, $password)) {
            throw new BadCredentialsException('Nieprawidłowe dane logowania.');
        }

        return new SelfValidatingPassport(
            new UserBadge($email),
            [new CsrfTokenBadge('authenticate', $csrfToken)],
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): Response
    {
        $targetPath = $this->getTargetPath($request->getSession(), $firewallName);
        if ($targetPath !== null) {
            return new RedirectResponse($targetPath);
        }

        return new RedirectResponse($this->urlGenerator->generate('app_admin_dashboard'));
    }

    protected function getLoginUrl(Request $request): string
    {
        return $this->urlGenerator->generate(self::LOGIN_ROUTE);
    }
}
