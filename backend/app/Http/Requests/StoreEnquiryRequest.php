<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEnquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'         => ['required', 'string', 'max:255'],
            'email'        => ['required', 'email', 'max:255'],
            'phone'        => ['required', 'string', 'max:30'],
            'company'      => ['nullable', 'string', 'max:255'],
            'subject'      => ['required', 'string', 'max:255'],
            'message'      => ['required', 'string', 'min:10', 'max:5000'],
            'product_slug' => ['nullable', 'string', 'exists:products,slug'],
        ];
    }
}
