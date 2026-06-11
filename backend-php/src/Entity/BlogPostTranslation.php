<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\BlogPostTranslationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: BlogPostTranslationRepository::class)]
#[ORM\Table(name: 'blog_post_translation')]
#[ORM\UniqueConstraint(name: 'blog_post_translation_unique', columns: ['blog_post_id', 'locale'])]
#[UniqueEntity(fields: ['blogPost', 'locale'], message: 'Tłumaczenie dla tego języka już istnieje.')]
class BlogPostTranslation
{
    public const LOCALES = ['pl', 'en', 'de'];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 8)]
    #[Assert\NotBlank]
    #[Assert\Choice(choices: self::LOCALES)]
    private string $locale = 'pl';

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: 'Tytuł jest wymagany.')]
    private string $title = '';

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank(message: 'Treść jest wymagana.')]
    private string $content = '';

    #[ORM\ManyToOne(targetEntity: BlogPost::class, inversedBy: 'translations')]
    #[ORM\JoinColumn(name: 'blog_post_id', referencedColumnName: 'id', nullable: false, onDelete: 'CASCADE')]
    private ?BlogPost $blogPost = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLocale(): string
    {
        return $this->locale;
    }

    public function setLocale(string $locale): self
    {
        $this->locale = $locale;

        return $this;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getBlogPost(): ?BlogPost
    {
        return $this->blogPost;
    }

    public function setBlogPost(?BlogPost $blogPost): self
    {
        $this->blogPost = $blogPost;

        return $this;
    }

    public function __toString(): string
    {
        if ($this->title !== '') {
            return sprintf('[%s] %s', strtoupper($this->locale), $this->title);
        }

        return sprintf('Tłumaczenie #%s', $this->id ?? '?');
    }
}
