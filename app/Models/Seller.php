<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'city_id',
        'logo_url',
        'is_verified',
        'phone_number',
        'external_url',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
