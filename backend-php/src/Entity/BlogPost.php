<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\BlogPostRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BlogPostRepository::class)]
#[ORM\Table(name: 'blog_post')]
#[ORM\HasLifecycleCallbacks]
class BlogPost
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 1024, nullable: true)]
    private ?string $image = null;

    #[ORM\Column(name: 'published_at', type: 'datetime_immutable')]
    private \DateTimeImmutable $publishedAt;

    #[ORM\Column(name: 'created_at', type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(name: 'updated_at', type: 'datetime_immutable')]
    private \DateTimeImmutable $updatedAt;

    /** @var Collection<int, BlogPostTranslation> */
    #[ORM\OneToMany(
        targetEntity: BlogPostTranslation::class,
        mappedBy: 'blogPost',
        cascade: ['persist', 'remove'],
        orphanRemoval: true,
    )]
    private Collection $translations;

    public function __construct()
    {
        $this->translations = new ArrayCollection();
        $this->publishedAt = new \DateTimeImmutable();
    }

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $now = new \DateTimeImmutable();
        $this->createdAt = $now;
        $this->updatedAt = $now;
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getPublishedAt(): \DateTimeImmutable
    {
        return $this->publishedAt;
    }

    public function setPublishedAt(\DateTimeImmutable $publishedAt): self
    {
        $this->publishedAt = $publishedAt;

        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): \DateTimeImmutable
    {
        return $this->updatedAt;
    }

    /** @return Collection<int, BlogPostTranslation> */
    public function getTranslations(): Collection
    {
        return $this->translations;
    }

    public function addTranslation(BlogPostTranslation $translation): self
    {
        if (!$this->translations->contains($translation)) {
            $this->translations->add($translation);
            $translation->setBlogPost($this);
        }

        return $this;
    }

    public function removeTranslation(BlogPostTranslation $translation): self
    {
        if ($this->translations->removeElement($translation)) {
            if ($translation->getBlogPost() === $this) {
                $translation->setBlogPost(null);
            }
        }

        return $this;
    }

    public function getTranslationByLocale(string $locale): ?BlogPostTranslation
    {
        foreach ($this->translations as $translation) {
            if ($translation->getLocale() === $locale) {
                return $translation;
            }
        }

        return null;
    }

    public function __toString(): string
    {
        $primary = $this->getTranslationByLocale('pl');
        if ($primary instanceof BlogPostTranslation) {
            return $primary->getTitle();
        }

        return sprintf('Post #%s', $this->id ?? '?');
    }
}
