<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// 🔥 TAMBAHAN
use App\Models\Product;
use App\Models\Mitra;
use App\Models\User;
use App\Models\Sale;

class Placement extends Model
{
    use HasFactory;

    protected $fillable = [
        'canvassing_id',
        'mitra_id',
        'product_id',
        'initial_qty',
        'returned_qty',
        'status',
        'placed_at',
        'collected_at',
        'settled_at'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function mitra()
    {
        return $this->belongsTo(Mitra::class);
    }

    public function canvassing()
    {
        return $this->belongsTo(User::class, 'canvassing_id');
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}