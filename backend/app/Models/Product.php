<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// 🔥 TAMBAHAN
use App\Models\Placement;
use App\Models\Sale;
use App\Models\Mitra;
use App\Models\User;
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'image',
        'is_active'
    ];

    public function placements()
    {
        return $this->hasMany(Placement::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}