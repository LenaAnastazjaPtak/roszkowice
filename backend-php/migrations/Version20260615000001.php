<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260615000001 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Flatten blog_post: title, content, external_id on blog_post; drop blog_post_translation';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE blog_post ADD title VARCHAR(255) DEFAULT \'\' NOT NULL, ADD content LONGTEXT DEFAULT NULL, ADD external_id VARCHAR(255) DEFAULT NULL');

        $this->addSql(<<<'SQL'
            UPDATE blog_post p
            INNER JOIN blog_post_translation t ON t.blog_post_id = p.id AND t.locale = 'pl'
            SET p.title = t.title, p.content = t.content
            WHERE p.image IS NOT NULL AND TRIM(p.image) != ''
        SQL);

        $this->addSql("DELETE FROM blog_post WHERE title = '' OR content IS NULL OR TRIM(content) = '' OR image IS NULL OR TRIM(image) = ''");

        $this->addSql('ALTER TABLE blog_post_translation DROP FOREIGN KEY FK_BLOG_POST_TRANSLATION_BLOG_POST');
        $this->addSql('DROP TABLE blog_post_translation');

        $this->addSql('ALTER TABLE blog_post CHANGE image image VARCHAR(1024) NOT NULL, CHANGE title title VARCHAR(255) NOT NULL, CHANGE content content LONGTEXT NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_BLOG_POST_EXTERNAL_ID ON blog_post (external_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP INDEX UNIQ_BLOG_POST_EXTERNAL_ID ON blog_post');
        $this->addSql('ALTER TABLE blog_post CHANGE image image VARCHAR(1024) DEFAULT NULL, DROP title, DROP content, DROP external_id');

        $this->addSql(<<<'SQL'
            CREATE TABLE blog_post_translation (
                id INT AUTO_INCREMENT NOT NULL,
                blog_post_id INT NOT NULL,
                locale VARCHAR(8) NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql('CREATE INDEX IDX_BLOG_POST_TRANSLATION_BLOG_POST_ID ON blog_post_translation (blog_post_id)');
        $this->addSql('CREATE UNIQUE INDEX blog_post_translation_unique ON blog_post_translation (blog_post_id, locale)');
        $this->addSql(<<<'SQL'
            ALTER TABLE blog_post_translation
            ADD CONSTRAINT FK_BLOG_POST_TRANSLATION_BLOG_POST
            FOREIGN KEY (blog_post_id) REFERENCES blog_post(id)
            ON DELETE CASCADE
        SQL);
    }
}
