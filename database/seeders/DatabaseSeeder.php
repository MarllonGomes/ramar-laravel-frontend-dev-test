<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Seller;
use App\Models\State;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        State::factory(10)->create()
            ->each(function (State $state) {
                City::factory(10)->for($state)->create()->each(function (City $city) {
                    Seller::factory(30)->for($city)->create();
                });
            });
    }
}
