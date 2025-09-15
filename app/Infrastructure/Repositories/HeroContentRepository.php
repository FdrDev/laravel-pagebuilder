<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Content\Entities\HeroContentEntity;
use App\Domain\Content\Repositories\HeroContentRepositoriesInterface;
use App\Models\HeroContent as HeroContentModel;
use Illuminate\Support\Collection;

class HeroContentRepository implements HeroContentRepositoriesInterface
{
    public function getAll(): Collection
    {
        $heroContents = HeroContentModel::query()->get();

        return $heroContents->map(function ($heroContent) {
            return $this->toEntity($heroContent);
        });
    }

    public function getById(int $id): ?HeroContentEntity
    {
        $heroContent = HeroContentModel::query()->find($id);

        if (!$heroContent) {
            return null;
        }

        return $this->toEntity($heroContent);
    }

    public function create(HeroContentEntity $heroContent): HeroContentEntity
    {
        $model = new HeroContentModel();
        $model->fill([
            'title' => $heroContent->getTitle(),
            'subtitle' => $heroContent->getSubtitle(),
            'image' => $heroContent->getImage()
        ]);
        $model->save();

        return $this->toEntity($model);
    }

    private function toEntity(HeroContentModel $model): HeroContentEntity
    {
        return new HeroContentEntity(
            $model->getAttribute('id'),
            $model->getAttribute('title'),
            $model->getAttribute('subtitle'),
            $model->getAttribute('image')
        );
    }
}
