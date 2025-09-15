<?php

namespace App\Http\Controllers\Content;

use App\Application\Services\HeroContentService;
use App\Domain\Content\Entities\HeroContentEntity;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContentController extends Controller
{
    public function __construct(
        private readonly HeroContentService $heroContentService
    ) {
    }

    public function index(): JsonResponse
    {
        $contents = $this->heroContentService->getAllContents();

        return response()->json([
            'data' => $contents->map(fn($content) => $this->mapEntityToArray($content))
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $content = $this->heroContentService->getContentById($id);

        if (!$content) {
            return response()->json(['message' => 'Contenuto non trovato'], 404);
        }

        return response()->json([
            'data' => $this->mapEntityToArray($content)
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        // Validazione
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string',
            'image' => 'nullable|string'
        ]);

        $content = $this->heroContentService->createContent(
            $validated['title'],
            $validated['subtitle'] ?? null,
            $validated['image'] ?? null
        );

        return response()->json([
            'message' => 'Contenuto creato con successo',
            'data' => $this->mapEntityToArray($content)
        ], 201);
    }

    private function mapEntityToArray(HeroContentEntity $entity): array
    {
        return [
            'id' => $entity->getId(),
            'title' => $entity->getTitle(),
            'subtitle' => $entity->getSubtitle(),
            'image' => $entity->getImage()
        ];
    }
}
