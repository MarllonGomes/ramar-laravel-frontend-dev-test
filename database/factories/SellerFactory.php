<?php

namespace Database\Factories;

use App\Models\City;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seller>
 */
class SellerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->company(),
            'city_id' => City::factory(),
            // 'logo_url' => $this->faker->imageUrl(512, 512, 'business'),
            'logo_url'=> "https://avatar.iran.liara.run/public/boy?u=" . $this->faker->unique()->randomNumber(),
            'is_verified' => $this->faker->boolean(30),
            'phone_number' => $this->faker->e164PhoneNumber(),
            'external_url' => $this->faker->url(),
        ];
    }
}
