<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'value'];

    public static function get(string $key, ?string $default = null): ?string
    {
        return static::where('key', $key)->value('value') ?? $default;
    }

    public static function set(string $key, ?string $value): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value]);
    }

    private static function fetch(array $keys): array
    {
        $rows = static::whereIn('key', $keys)->pluck('value', 'key');
        return collect($keys)->mapWithKeys(fn ($k) => [$k => $rows[$k] ?? null])->all();
    }

    public static function contact(): array
    {
        return static::fetch([
            'contact_phone',
            'contact_email',
            'contact_address',
            'contact_whatsapp',
            'opening_hours',
            'company_tagline',
        ]);
    }

    public static function hero(): array
    {
        return static::fetch([
            'hero_image',
            'hero_headline',
            'hero_subheadline',
        ]);
    }

    public static function about(): array
    {
        return static::fetch([
            'about_headline',
            'about_subheadline',
            'about_company_image',
            'about_intro_1',
            'about_intro_2',
            'about_mission',
            'about_vision',
        ]);
    }
}
