<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Placement extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'canvasser_id',
        'mitra_id',
        'status',
        'placed_at',
        'collected_at',
        'settled_at',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    // Canvasser yang melakukan penitipan
    public function canvasser()
    {
        return $this->belongsTo(User::class, 'canvasser_id');
    }

    // Mitra / warung yang dititipkan produk
    public function mitra()
    {
        return $this->belongsTo(Mitra::class, 'mitra_id');
    }

    // Detail produk yang dititipkan
    public function items()
    {
        return $this->hasMany(PlacementItem::class, 'placement_id');
    }

    // Sales dari placement ini
    public function sales()
    {
        return $this->hasMany(Sale::class, 'placement_id');
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