<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260430000001 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Initial schema: blog_post, blog_post_translation, gallery_image';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<'SQL'
            CREATE TABLE blog_post (
                id SERIAL NOT NULL,
                image VARCHAR(1024) DEFAULT NULL,
                published_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
                created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
                updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
                PRIMARY KEY(id)
            )
        SQL);

        $this->addSql(<<<'SQL'
            CREATE TABLE blog_post_translation (
                id SERIAL NOT NULL,
                blog_post_id INT NOT NULL,
                locale VARCHAR(8) NOT NULL,
                title VARCHAR(255) NOT NULL,
                header VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                PRIMARY KEY(id)
            )
        SQL);
        $this->addSql('CREATE INDEX IDX_BLOG_POST_TRANSLATION_BLOG_POST_ID ON blog_post_translation (blog_post_id)');
        $this->addSql('CREATE UNIQUE INDEX blog_post_translation_unique ON blog_post_translation (blog_post_id, locale)');

        $this->addSql(<<<'SQL'
            ALTER TABLE blog_post_translation
            ADD CONSTRAINT FK_BLOG_POST_TRANSLATION_BLOG_POST
            FOREIGN KEY (blog_post_id) REFERENCES blog_post(id)
            ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);

        $this->addSql(<<<'SQL'
            CREATE TABLE gallery_image (
                id SERIAL NOT NULL,
                image VARCHAR(1024) DEFAULT NULL,
                category VARCHAR(32) NOT NULL,
                sort_order INT DEFAULT 0 NOT NULL,
                created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
                updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
                PRIMARY KEY(id)
            )
        SQL);
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE blog_post_translation DROP CONSTRAINT FK_BLOG_POST_TRANSLATION_BLOG_POST');
        $this->addSql('DROP TABLE gallery_image');
        $this->addSql('DROP TABLE blog_post_translation');
        $this->addSql('DROP TABLE blog_post');
    }
}
