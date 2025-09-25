<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sellers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('city_id')->constrained()->cascadeOnUpdate()->restrictOnDelete();
            $table->string('logo_url')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->string('phone_number', 32)->nullable();
            $table->string('external_url', 2048)->nullable();
            $table->timestamps();

            $table->index('name');
            $table->index('is_verified');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sellers');
    }
};
