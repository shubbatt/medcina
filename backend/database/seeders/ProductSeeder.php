<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // ── Foam Dressings (Advazorb) ──────────────────────────────────
            [
                'category_slug' => 'foam-dressings',
                'name'          => 'Advazorb Border',
                'short_description' => 'Bordered foam dressing with a soft silicone wound contact layer, suitable for moderate to high exuding wounds.',
                'full_description'  => '<p>Advazorb Border is a highly absorbent foam dressing with an adhesive border for easy application and secure wear. The soft silicone wound contact layer ensures gentle, pain-free removal. Suitable for moderate to heavily exuding wounds including leg ulcers, pressure ulcers, and diabetic foot ulcers.</p>',
                'specifications'    => [
                    ['label' => 'Brand',        'value' => 'Advancis Medical'],
                    ['label' => 'Range',         'value' => 'Advazorb'],
                    ['label' => 'Type',          'value' => 'Bordered foam dressing'],
                    ['label' => 'Exudate level', 'value' => 'Moderate to high'],
                    ['label' => 'Contact layer', 'value' => 'Soft silicone'],
                ],
                'is_featured'   => true,
            ],
            [
                'category_slug' => 'foam-dressings',
                'name'          => 'Advazorb Lite',
                'short_description' => 'Lightweight thin foam dressing for low to moderately exuding wounds and fragile skin.',
                'full_description'  => '<p>Advazorb Lite is a thin, soft foam dressing designed for low to moderately exuding wounds. Its gentle formulation makes it ideal for patients with fragile or sensitive skin. Provides a moist wound healing environment to support natural wound healing.</p>',
                'specifications'    => [
                    ['label' => 'Brand',        'value' => 'Advancis Medical'],
                    ['label' => 'Range',         'value' => 'Advazorb'],
                    ['label' => 'Type',          'value' => 'Thin foam dressing'],
                    ['label' => 'Exudate level', 'value' => 'Low to moderate'],
                ],
                'is_featured'   => true,
            ],
            [
                'category_slug' => 'foam-dressings',
                'name'          => 'Advazorb Silfix',
                'short_description' => 'Soft silicone bordered foam dressing designed to minimise trauma and pain at dressing change.',
                'full_description'  => '<p>Advazorb Silfix combines a highly absorbent foam core with a soft silicone border for secure but gentle adhesion. Designed to minimise pain and trauma at dressing change, making it ideal for patients with sensitive or fragile skin.</p>',
                'specifications'    => [
                    ['label' => 'Brand',        'value' => 'Advancis Medical'],
                    ['label' => 'Range',         'value' => 'Advazorb'],
                    ['label' => 'Type',          'value' => 'Silicone bordered foam'],
                    ['label' => 'Exudate level', 'value' => 'Moderate to high'],
                ],
                'is_featured'   => false,
            ],

            // ── Super Absorbent (Eclypse) ──────────────────────────────────
            [
                'category_slug' => 'super-absorbent',
                'name'          => 'Eclypse Adherent',
                'short_description' => 'Super absorbent wound dressing with a soft non-adherent wound contact layer for heavily exuding wounds.',
                'full_description'  => '<p>Eclypse Adherent is a super absorbent dressing designed to manage heavily exuding wounds. Its non-adherent wound contact layer ensures gentle removal while the super absorbent core locks in exudate to protect peri-wound skin from maceration.</p>',
                'specifications'    => [
                    ['label' => 'Brand',        'value' => 'Advancis Medical'],
                    ['label' => 'Range',         'value' => 'Eclypse'],
                    ['label' => 'Type',          'value' => 'Super absorbent adherent'],
                    ['label' => 'Exudate level', 'value' => 'Heavy'],
                ],
                'is_featured'   => true,
            ],
            [
                'category_slug' => 'super-absorbent',
                'name'          => 'Eclypse Boot',
                'short_description' => 'Super absorbent boot-shaped dressing designed specifically for the management of heavily exuding lower limb wounds.',
                'full_description'  => '<p>Eclypse Boot is a uniquely shaped super absorbent dressing designed for lower limb wounds including leg ulcers. The boot shape provides full coverage of the foot and lower leg while its super absorbent core manages high levels of exudate effectively.</p>',
                'specifications'    => [
                    ['label' => 'Brand',  'value' => 'Advancis Medical'],
                    ['label' => 'Range',  'value' => 'Eclypse'],
                    ['label' => 'Type',   'value' => 'Super absorbent boot'],
                    ['label' => 'Indication', 'value' => 'Lower limb wounds'],
                ],
                'is_featured'   => true,
            ],

            // ── Manuka Honey (Activon) ─────────────────────────────────────
            [
                'category_slug' => 'manuka-honey',
                'name'          => 'Activon Tube',
                'short_description' => 'Medical grade Manuka honey in a tube for direct application to infected and hard-to-heal wounds.',
                'full_description'  => '<p>Activon Tube contains 100% medical grade Manuka honey for direct application to wounds. Manuka honey creates a moist wound healing environment, has antimicrobial properties, and helps to debride necrotic tissue. Suitable for infected wounds, sloughy wounds, and hard-to-heal wounds.</p>',
                'specifications'    => [
                    ['label' => 'Brand',      'value' => 'Advancis Medical'],
                    ['label' => 'Range',       'value' => 'Activon'],
                    ['label' => 'Type',        'value' => 'Medical grade Manuka honey'],
                    ['label' => 'Application', 'value' => 'Direct wound application'],
                    ['label' => 'Content',     'value' => '100% Manuka honey'],
                ],
                'is_featured'   => true,
            ],
            [
                'category_slug' => 'manuka-honey',
                'name'          => 'Activon Tulle',
                'short_description' => 'Medical grade Manuka honey impregnated tulle dressing for infected and sloughy wounds.',
                'full_description'  => '<p>Activon Tulle is a knitted viscose dressing impregnated with 100% medical grade Manuka honey. It provides all the benefits of Manuka honey in an easy-to-apply dressing format, suitable for infected wounds, sloughy wounds, and wounds requiring antimicrobial management.</p>',
                'specifications'    => [
                    ['label' => 'Brand',   'value' => 'Advancis Medical'],
                    ['label' => 'Range',    'value' => 'Activon'],
                    ['label' => 'Type',     'value' => 'Honey impregnated tulle'],
                    ['label' => 'Content',  'value' => '100% Manuka honey'],
                ],
                'is_featured'   => false,
            ],

            // ── Specialist Dressings ───────────────────────────────────────
            [
                'category_slug' => 'specialist-dressings',
                'name'          => 'Silflex',
                'short_description' => 'Soft silicone wound contact layer for pain-free dressing changes on delicate wounds.',
                'full_description'  => '<p>Silflex is a soft silicone wound contact layer that allows exudate to pass through to a secondary dressing while providing a pain-free, atraumatic interface with the wound. Ideal for patients with fragile skin, painful wounds, or where frequent dressing changes are required.</p>',
                'specifications'    => [
                    ['label' => 'Brand', 'value' => 'Advancis Medical'],
                    ['label' => 'Type',  'value' => 'Soft silicone contact layer'],
                    ['label' => 'Use',   'value' => 'Primary wound contact layer'],
                ],
                'is_featured'   => false,
            ],
            [
                'category_slug' => 'specialist-dressings',
                'name'          => 'Siltape',
                'short_description' => 'Soft silicone retention tape for securing dressings without damaging fragile or sensitive skin.',
                'full_description'  => '<p>Siltape is a soft silicone-coated retention tape that provides secure dressing fixation while being gentle on fragile or sensitive skin. Suitable for patients on long-term dressing regimens where skin damage from traditional tapes is a concern.</p>',
                'specifications'    => [
                    ['label' => 'Brand', 'value' => 'Advancis Medical'],
                    ['label' => 'Type',  'value' => 'Soft silicone retention tape'],
                ],
                'is_featured'   => false,
            ],
            [
                'category_slug' => 'specialist-dressings',
                'name'          => 'Advasil Conform',
                'short_description' => 'Conformable silicone dressing suitable for awkward wound areas including skin tears and superficial wounds.',
                'full_description'  => '<p>Advasil Conform is a soft, conformable silicone dressing that moulds to difficult wound areas. Gentle on the wound bed and peri-wound skin, it is ideal for skin tears, superficial wounds, and wounds in anatomically challenging locations.</p>',
                'specifications'    => [
                    ['label' => 'Brand', 'value' => 'Advancis Medical'],
                    ['label' => 'Type',  'value' => 'Conformable silicone dressing'],
                ],
                'is_featured'   => false,
            ],
            [
                'category_slug' => 'specialist-dressings',
                'name'          => 'Advadraw Ribbon',
                'short_description' => 'Ribbon dressing for packing and managing cavity wounds and sinus wounds.',
                'full_description'  => '<p>Advadraw Ribbon is designed for packing cavity and sinus wounds. It gently absorbs exudate from deep wounds while maintaining a moist healing environment. Its ribbon format allows precise wound packing without over-packing.</p>',
                'specifications'    => [
                    ['label' => 'Brand',       'value' => 'Advancis Medical'],
                    ['label' => 'Type',         'value' => 'Cavity wound ribbon'],
                    ['label' => 'Indication',   'value' => 'Cavity and sinus wounds'],
                ],
                'is_featured'   => false,
            ],

            // ── NPWT ──────────────────────────────────────────────────────
            [
                'category_slug' => 'npwt',
                'name'          => 'NPWT System',
                'short_description' => 'Negative Pressure Wound Therapy system for the management of complex, hard-to-heal, and post-surgical wounds.',
                'full_description'  => '<p>Negative Pressure Wound Therapy (NPWT) applies controlled negative pressure to wounds to promote healing. It removes exudate, reduces wound oedema, promotes granulation tissue formation, and prepares the wound bed for closure. Suitable for complex wounds, dehisced surgical wounds, pressure ulcers, and diabetic foot ulcers.</p>',
                'specifications'    => [
                    ['label' => 'Brand',       'value' => 'Advancis Medical'],
                    ['label' => 'Type',         'value' => 'NPWT System'],
                    ['label' => 'Indication',   'value' => 'Complex and hard-to-heal wounds'],
                    ['label' => 'Mechanism',    'value' => 'Negative pressure wound therapy'],
                ],
                'is_featured'   => true,
            ],
        ];

        foreach ($products as $data) {
            $category = Category::where('slug', $data['category_slug'])->first();
            if (!$category) continue;

            Product::firstOrCreate(
                ['name' => $data['name']],
                [
                    'category_id'       => $category->id,
                    'short_description' => $data['short_description'],
                    'full_description'  => $data['full_description'],
                    'specifications'    => $data['specifications'],
                    'availability_status' => 'available',
                    'is_featured'       => $data['is_featured'],
                    'is_active'         => true,
                    'sort_order'        => 0,
                ]
            );
        }

        $this->command->info('✓ ' . Product::count() . ' products seeded.');
    }
}
