<?php


namespace App\Domain\Content\Entities;

final readonly class HeroContentEntity
{

    public function __construct(private ?int $id, private string $title, private ?string $subtitle, private ?string $image)
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getSubtitle(): ?string
    {
        return $this->subtitle;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }
}
