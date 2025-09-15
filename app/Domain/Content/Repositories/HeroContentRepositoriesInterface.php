<?php


namespace App\Domain\Content\Repositories;

use App\Domain\Content\Entities\HeroContentEntity;

interface HeroContentRepositoriesInterface
{
    public function getAll();

    public function getById(int $id);

    public function create(HeroContentEntity $heroContent);
}
