<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// 🔥 TAMBAHAN
use App\Models\User;
use App\Models\Placement;

class Mitra extends Model
{
    use HasFactory;

    protected $table = 'mitra';

    protected $fillable = [
        'user_id',
        'name',
        'phone',
        'address',
        'lat',
        'lng'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function placements()
    {
        return $this->hasMany(Placement::class);
    }
}