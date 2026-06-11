<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260611000001 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Remove header column from blog_post_translation';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE blog_post_translation DROP header');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE blog_post_translation ADD header VARCHAR(255) NOT NULL');
    }
}
