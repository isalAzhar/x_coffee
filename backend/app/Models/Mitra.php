<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mitra extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'canvasser_id',
        'name',
        'phone',
        'address',
        'lat',
        'lng',
        'is_active',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function canvasser()
    {
        return $this->belongsTo(User::class, 'canvasser_id');
    }

    public function placements()
    {
        return $this->hasMany(Placement::class, 'mitra_id');
    }

    public function sales()
    {
        return $this->hasMany(Sale::class, 'mitra_id');
    }

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