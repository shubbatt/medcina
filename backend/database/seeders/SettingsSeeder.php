<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            // Contact
            'contact_phone'     => null,
            'contact_email'     => null,
            'contact_address'   => null,
            'contact_whatsapp'  => null,
            'opening_hours'     => "Sunday – Thursday: 8:00 AM – 5:00 PM\nFriday – Saturday: Closed",
            'company_tagline'   => 'Supplying medical equipment, consumables, and wound care products across the Maldives, Nepal, and Myanmar. Authorised distributor of Advancis Medical.',

            // Hero
            'hero_image'        => null,
            'hero_headline'     => 'Advanced Medical Supplies & Wound Care Solutions',
            'hero_subheadline'  => 'Medcina supplies medical equipment, consumables, and wound care products across the Maldives, Nepal, and Myanmar — and is the authorised distributor of Advancis Medical wound care range in the region.',

            // About
            'about_headline'    => 'Your Trusted Medical Supply Partner',
            'about_subheadline' => 'Supplying clinics, hospitals, and pharmacies with high-quality medical products across the region.',
            'about_company_image' => null,
            'about_intro_1'     => 'Medcina Pvt Ltd supplies medical equipment, consumables, and advanced wound care products to healthcare providers across the Maldives, Nepal, and Myanmar. We are the authorised distributor of Advancis Medical — a UK-based specialist wound care company with a strong clinical evidence base.',
            'about_intro_2'     => 'Our product range covers everything from foam dressings and Manuka honey wound care to NPWT systems, medical equipment, and essential consumables — ensuring healthcare professionals have reliable access to the supplies they need.',
            'about_mission'     => 'To improve patient outcomes across the Maldives, Nepal, and Myanmar by providing healthcare professionals with reliable access to high-quality medical products, equipment, and wound care solutions.',
            'about_vision'      => 'To be the most trusted medical supply partner in the region — known for product authenticity, clinical expertise, and a commitment to healthcare excellence at every level of the system.',
        ];

        foreach ($defaults as $key => $value) {
            Setting::firstOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
