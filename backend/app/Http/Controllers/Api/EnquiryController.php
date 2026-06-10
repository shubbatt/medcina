<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEnquiryRequest;
use App\Models\Enquiry;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class EnquiryController extends Controller
{
    public function store(StoreEnquiryRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Resolve product_id from slug if provided
        if (!empty($data['product_slug'])) {
            $product = Product::where('slug', $data['product_slug'])->first();
            $data['product_id'] = $product?->id;
        }
        unset($data['product_slug']);

        $enquiry = Enquiry::create(array_merge($data, ['status' => 'new']));

        // TODO: Send notification email to Medcina
        // Mail::to(config('mail.from.address'))->send(new EnquiryReceived($enquiry));

        return response()->json([
            'message' => 'Your enquiry has been received. We will contact you within 1–2 business days.',
            'id'      => $enquiry->id,
        ], 201);
    }
}
