<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\EnquiryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SettingsController;
use Illuminate\Support\Facades\Route;

/*
|----------------------------------------------------------------------
| Medcina API Routes
|----------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // Products
    Route::get('/products/featured', [ProductController::class, 'featured']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{slug}', [ProductController::class, 'show']);

    // Categories
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{slug}', [CategoryController::class, 'show']);

    // Enquiries
    Route::post('/enquiries', [EnquiryController::class, 'store']);
    Route::post('/contact', [EnquiryController::class, 'store']); // Alias

    // Settings
    Route::get('/settings/contact', [SettingsController::class, 'contact']);
    Route::get('/settings/hero',    [SettingsController::class, 'hero']);
    Route::get('/settings/about',   [SettingsController::class, 'about']);
});
