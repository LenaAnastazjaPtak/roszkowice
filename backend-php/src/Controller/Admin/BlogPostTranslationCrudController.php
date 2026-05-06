<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Entity\BlogPostTranslation;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

final class BlogPostTranslationCrudController extends AbstractCrudController
{
    private const LOCALE_LABELS = [
        'pl' => 'Polski',
        'en' => 'Angielski',
        'de' => 'Niemiecki',
    ];

    public static function getEntityFqcn(): string
    {
        return BlogPostTranslation::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Tłumaczenie')
            ->setEntityLabelInPlural('Tłumaczenia');
    }

    public function configureFields(string $pageName): iterable
    {
        yield ChoiceField::new('locale', 'Język')
            ->setChoices(array_flip(self::LOCALE_LABELS))
            ->setRequired(true)
            ->setColumns(4);

        yield TextField::new('title', 'Tytuł')
            ->setRequired(true)
            ->setColumns(8);

        yield TextField::new('header', 'Nagłówek')
            ->setRequired(true)
            ->setColumns(12);

        yield TextareaField::new('content', 'Treść')
            ->setRequired(true)
            ->setNumOfRows(8)
            ->setColumns(12);
    }
}
