<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEnquiryRequest;
use App\Models\Enquiry;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use App\Mail\EnquiryReceived;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class EnquiryController extends Controller
{
    public function store(StoreEnquiryRequest $request): JsonResponse
    {
        $data = $request->validated();

        $turnstile = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret'   => config('services.turnstile.secret'),
            'response' => $data['turnstile_token'],
            'remoteip' => $request->ip(),
        ]);

        if (!$turnstile->json('success')) {
            return response()->json(['message' => 'Security check failed. Please refresh and try again.'], 422);
        }

        unset($data['turnstile_token']);

        // Resolve product_id from slug if provided
        if (!empty($data['product_slug'])) {
            $product = Product::where('slug', $data['product_slug'])->first();
            $data['product_id'] = $product?->id;
        }
        unset($data['product_slug']);

        $enquiry = Enquiry::create(array_merge($data, ['status' => 'new']));

        try {
            Mail::to('info@medcina.mv')->send(new EnquiryReceived($enquiry));
        } catch (\Throwable $e) {
            Log::error('Enquiry notification email failed: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Your enquiry has been received. We will contact you within 1–2 business days.',
            'id'      => $enquiry->id,
        ], 201);
    }
}
