<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Entity\GalleryImage;
use App\Repository\GalleryImageRepository;
use App\Service\GalleryReorderService;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminRoute;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Context\AdminContext;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Constraints\Image;

final class GalleryImageCrudController extends AbstractCrudController
{
    private const CATEGORY_LABELS = [
        'exterior' => 'Zewnątrz',
        'park' => 'Park',
        'remont' => 'Remont',
    ];

    private const ACTION_MOVE_UP = 'moveUp';
    private const ACTION_MOVE_DOWN = 'moveDown';
    private const ACTION_REORDER = 'reorderGallery';

    public function __construct(
        private readonly GalleryImageRepository $repository,
        private readonly GalleryReorderService $reorderService,
        private readonly EntityManagerInterface $entityManager,
        private readonly AdminUrlGenerator $adminUrlGenerator,
    ) {
    }

    public static function getEntityFqcn(): string
    {
        return GalleryImage::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Zdjęcie')
            ->setEntityLabelInPlural('Galeria')
            ->setDefaultSort(['sortOrder' => 'ASC', 'id' => 'ASC'])
            ->setPageTitle(Crud::PAGE_INDEX, 'Galeria')
            ->setPageTitle(Crud::PAGE_NEW, 'Nowe zdjęcie')
            ->setPageTitle(Crud::PAGE_EDIT, 'Edycja zdjęcia');
    }

    public function configureActions(Actions $actions): Actions
    {
        $moveUp = Action::new(self::ACTION_MOVE_UP, 'Wyżej', 'fa fa-arrow-up')
            ->linkToCrudAction(self::ACTION_MOVE_UP)
            ->renderAsForm();

        $moveDown = Action::new(self::ACTION_MOVE_DOWN, 'Niżej', 'fa fa-arrow-down')
            ->linkToCrudAction(self::ACTION_MOVE_DOWN)
            ->renderAsForm();

        $reorder = Action::new(self::ACTION_REORDER, 'Ułóż kolejność', 'fa fa-arrows-up-down-left-right')
            ->createAsGlobalAction()
            ->linkToRoute('app_admin_dashboard_gallery_reorder');

        return $actions
            ->add(Crud::PAGE_INDEX, $moveUp)
            ->add(Crud::PAGE_INDEX, $moveDown)
            ->add(Crud::PAGE_INDEX, $reorder);
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id', 'ID')->onlyOnIndex();

        yield ImageField::new('image', 'Zdjęcie')
            ->setBasePath('/uploads/')
            ->setUploadDir('public/uploads/')
            ->setUploadedFileNamePattern('gallery/[timestamp]-[randomhash].[extension]')
            ->mimeTypes('.jpg,.jpeg,.png,.webp,.avif')
            ->setFileConstraints(new Image(
                maxSize: '15M',
                mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
                mimeTypesMessage: 'Plik musi być obrazem (JPEG, PNG, WebP lub AVIF).',
                maxSizeMessage: 'Maksymalny rozmiar pliku to 15 MB.',
            ))
            ->setRequired(false);

        yield ChoiceField::new('category', 'Kategoria')
            ->setChoices(array_flip(self::CATEGORY_LABELS))
            ->setRequired(true);

        yield IntegerField::new('sortOrder', 'Kolejność')
            ->onlyOnIndex();

        yield DateTimeField::new('updatedAt', 'Zaktualizowano')
            ->onlyOnIndex();
    }

    public function createEntity(string $entityFqcn): GalleryImage
    {
        $image = new GalleryImage();
        $image->setSortOrder($this->repository->findMaxSortOrder() + 1);

        return $image;
    }

    #[AdminRoute(path: '/move-up/{entityId}', name: 'move_up')]
    public function moveUp(AdminContext $context): Response
    {
        return $this->moveInDirection($context, GalleryReorderService::DIRECTION_UP);
    }

    #[AdminRoute(path: '/move-down/{entityId}', name: 'move_down')]
    public function moveDown(AdminContext $context): Response
    {
        return $this->moveInDirection($context, GalleryReorderService::DIRECTION_DOWN);
    }

    private function moveInDirection(AdminContext $context, string $direction): Response
    {
        $entity = $context->getEntity()->getInstance();
        if (!$entity instanceof GalleryImage) {
            throw $this->createNotFoundException('Nie znaleziono rekordu galerii.');
        }

        $this->reorderService->moveAdjacent($entity, $direction);
        $this->entityManager->flush();

        $url = $this->adminUrlGenerator
            ->setController(self::class)
            ->setAction(Action::INDEX)
            ->generateUrl();

        return new RedirectResponse($url);
    }
}
