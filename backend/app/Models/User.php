<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'phone',
        'password',
        'role',
        'is_active',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected $hidden = [
        'password',
    ];

    // Mitra yang ditangani / didaftarkan oleh canvasser
    public function mitras()
    {
        return $this->hasMany(Mitra::class, 'user_id');
    }

    // Placement yang dibuat / ditangani oleh canvasser
    public function placements()
    {
        return $this->hasMany(Placement::class, 'canvasser_id');
    }

    // Sales yang ditangani oleh canvasser
    public function sales()
    {
        return $this->hasMany(Sale::class, 'canvasser_id');
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