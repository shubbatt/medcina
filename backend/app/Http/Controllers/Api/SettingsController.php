<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller
{
    public function contact(): JsonResponse
    {
        return response()->json(['data' => Setting::contact()]);
    }

    public function hero(): JsonResponse
    {
        $data = Setting::hero();
        $data['hero_image'] = $this->storageUrl($data['hero_image']);
        return response()->json(['data' => $data]);
    }

    public function about(): JsonResponse
    {
        $data = Setting::about();
        $data['about_company_image'] = $this->storageUrl($data['about_company_image']);
        return response()->json(['data' => $data]);
    }

    private function storageUrl(?string $path): ?string
    {
        if (!$path) return null;
        if (str_starts_with($path, 'http')) return $path;
        return rtrim(config('app.url'), '/') . '/storage/' . ltrim($path, '/');
    }
}
