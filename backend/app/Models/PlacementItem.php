<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class PlacementItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'placement_id',
        'product_id',
        'initial_qty',
        'returned_qty',
        'sold_qty',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    public function placement()
    {
        return $this->belongsTo(Placement::class, 'placement_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    // Audit relations
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function deleter()
    {
        return $this->belongsTo(User::class, 'deleted_by');
    }
}