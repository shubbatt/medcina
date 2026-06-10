<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
            SettingsSeeder::class,
        ]);

        \App\Models\User::firstOrCreate(
            ['email' => 'admin@medcina.mv'],
            [
                'name'     => 'Medcina Admin',
                'password' => bcrypt('change-me-immediately'),
            ]
        );

        $this->command->info('✓ Medcina database seeded successfully.');
    }
}
