<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// 🔥 TAMBAHAN
use App\Models\Product;
use App\Models\Placement;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'placement_id',
        'product_id',
        'qty_sold',
        'sale_date',
        'status'
    ];

    public function placement()
    {
        return $this->belongsTo(Placement::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}