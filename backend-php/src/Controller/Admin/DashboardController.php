<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminDashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Config\UserMenu;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;

#[AdminDashboard(routePath: '/admin', routeName: 'app_admin_dashboard')]
final class DashboardController extends AbstractDashboardController
{
    public function index(): Response
    {
        return $this->render('admin/dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Pałac Roszkowice Admin')
            ->setFaviconPath('/images/roszkowice/logo_with_transparent_background.png')
            ->setLocales(['pl'])
            ->setDefaultColorScheme('light')
            ->setTextDirection('ltr');
    }

    public function configureCrud(): Crud
    {
        return Crud::new()
            ->showEntityActionsInlined();
    }

    public function configureAssets(): Assets
    {
        return Assets::new()
            ->addCssFile('/palac-admin-branding.css');
    }

    public function configureUserMenu(UserInterface $user): UserMenu
    {
        return UserMenu::new()
            ->setName($user->getUserIdentifier())
            ->displayUserName(true)
            ->displayUserAvatar(false)
            ->addMenuItems([
                MenuItem::linkToLogout('Wyloguj się', 'fa fa-right-from-bracket'),
            ]);
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Panel', 'fa fa-house');
        yield MenuItem::linkTo(BlogPostCrudController::class, 'Posty', 'fa fa-newspaper');
        yield MenuItem::linkTo(GalleryImageCrudController::class, 'Galeria', 'fa fa-images');
        yield MenuItem::linkToRoute('Ułóż galerię', 'fa fa-arrows-up-down-left-right', 'app_admin_dashboard_gallery_reorder');
    }
}
