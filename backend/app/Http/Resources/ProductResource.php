<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $images = $this->getMedia('images')->map(fn ($media, $i) => [
            'id'         => $media->id,
            'url'        => $media->getUrl('preview'),
            'thumb_url'  => $media->getUrl('thumb'),
            'alt'        => $media->name,
            'is_primary' => $i === 0,
        ])->values();

        $brochure = $this->getFirstMedia('brochure');

        return [
            'id'                  => $this->id,
            'name'                => $this->name,
            'slug'                => $this->slug,
            'category'            => new CategoryResource($this->whenLoaded('category')),
            'short_description'   => $this->short_description,
            'full_description'    => $this->full_description,
            'images'              => $images,
            'specifications'      => $this->specifications ?? [],
            'brochure_url'        => $brochure?->getUrl(),
            'availability_status' => $this->availability_status,
            'is_featured'         => $this->is_featured,
            'seo_title'           => $this->seo_title,
            'seo_description'     => $this->seo_description,
            'created_at'          => $this->created_at,
            'updated_at'          => $this->updated_at,
        ];
    }
}
