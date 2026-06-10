<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Product::query()
            ->with('category')
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name');

        // Filter by category slug
        if ($request->filled('category')) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $request->category));
        }

        // Search
        if ($request->filled('search')) {
            $search = '%' . $request->search . '%';
            $query->where(fn ($q) => $q
                ->where('name', 'like', $search)
                ->orWhere('short_description', 'like', $search)
            );
        }

        // Featured
        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $perPage = min($request->integer('per_page', 12), 48);

        return ProductResource::collection($query->paginate($perPage));
    }

    public function show(string $slug): ProductResource
    {
        $product = Product::with('category')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return new ProductResource($product);
    }

    public function featured(): AnonymousResourceCollection
    {
        $products = Product::with('category')
            ->where('is_active', true)
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->limit(8)
            ->get();

        return ProductResource::collection($products);
    }
}
