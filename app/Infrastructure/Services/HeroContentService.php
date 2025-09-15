<?php


namespace App\Application\Services;

use App\Domain\Content\Entities\HeroContentEntity;
use App\Domain\Content\Repositories\HeroContentRepositoriesInterface;

class HeroContentService
{
    public function __construct(
        private HeroContentRepositoriesInterface $heroContentRepository
    )
    {
    }

    public function getAllContents()
    {
        return $this->heroContentRepository->getAll();
    }

    public function getContentById(int $id): ?HeroContentEntity
    {
        return $this->heroContentRepository->getById($id);
    }

    public function createContent(string $title, ?string $subtitle = null, ?string $image = null): HeroContentEntity
    {
        $heroContent = new HeroContentEntity(
            null,
            $title,
            $subtitle,
            $image
        );

        return $this->heroContentRepository->create($heroContent);
    }
}
