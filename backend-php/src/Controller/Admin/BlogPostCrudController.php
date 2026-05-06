<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Entity\BlogPost;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use Symfony\Component\Validator\Constraints\Image;

final class BlogPostCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return BlogPost::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Post')
            ->setEntityLabelInPlural('Posty')
            ->setSearchFields(['translations.title', 'translations.header'])
            ->setDefaultSort(['publishedAt' => 'DESC'])
            ->setPageTitle(Crud::PAGE_INDEX, 'Posty na blogu')
            ->setPageTitle(Crud::PAGE_NEW, 'Nowy post')
            ->setPageTitle(Crud::PAGE_EDIT, 'Edycja posta')
            ->setPageTitle(Crud::PAGE_DETAIL, 'Szczegóły posta');
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id', 'ID')
            ->onlyOnIndex();

        yield ImageField::new('image', 'Zdjęcie')
            ->setBasePath('/uploads/')
            ->setUploadDir('public/uploads/')
            ->setUploadedFileNamePattern('posts/[timestamp]-[randomhash].[extension]')
            ->setFileConstraints(new Image(
                maxSize: '15M',
                mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
                mimeTypesMessage: 'Plik musi być obrazem (JPEG, PNG, WebP lub AVIF).',
                maxSizeMessage: 'Maksymalny rozmiar pliku to 15 MB.',
            ))
            ->setRequired(false);

        yield DateTimeField::new('publishedAt', 'Data publikacji')
            ->setFormat('yyyy-MM-dd HH:mm');

        yield CollectionField::new('translations', 'Tłumaczenia')
            ->useEntryCrudForm(BlogPostTranslationCrudController::class)
            ->renderExpanded()
            ->setEntryIsComplex(true)
            ->showEntryLabel(true)
            ->onlyOnForms();

        yield DateTimeField::new('createdAt', 'Utworzono')
            ->onlyOnDetail();

        yield DateTimeField::new('updatedAt', 'Zaktualizowano')
            ->onlyOnDetail();
    }
}
