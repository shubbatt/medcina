<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name'        => 'Foam Dressings',
                'slug'        => 'foam-dressings',
                'description' => 'Advazorb range — border, lite, and silicone foam dressings for moderate to high exudate wounds.',
                'sort_order'  => 1,
            ],
            [
                'name'        => 'Super Absorbent',
                'slug'        => 'super-absorbent',
                'description' => 'Eclypse range — super absorbent pads and dressings for heavily exuding wounds.',
                'sort_order'  => 2,
            ],
            [
                'name'        => 'Manuka Honey',
                'slug'        => 'manuka-honey',
                'description' => 'Activon range — medical grade Manuka honey dressings for infected and hard-to-heal wounds.',
                'sort_order'  => 3,
            ],
            [
                'name'        => 'Specialist Dressings',
                'slug'        => 'specialist-dressings',
                'description' => 'Silflex, Siltape, Advasil Conform, and Advadraw specialist wound contact layers and tapes.',
                'sort_order'  => 4,
            ],
            [
                'name'        => 'Antimicrobial',
                'slug'        => 'antimicrobial',
                'description' => 'Advanced antimicrobial dressings for infection prevention and wound biofilm management.',
                'sort_order'  => 5,
            ],
            [
                'name'        => 'NPWT',
                'slug'        => 'npwt',
                'description' => 'Negative Pressure Wound Therapy systems and accessories for complex wound management.',
                'sort_order'  => 6,
            ],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
