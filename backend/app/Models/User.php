<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Mitra;
use App\Models\Placement;
use Laravel\Sanctum\HasApiTokens;   
class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'phone',
        'password',
        'role',
        'is_active'
    ];

    public function mitras()
    {
        return $this->hasMany(Mitra::class);
    }

    public function placements()
    {
        return $this->hasMany(Placement::class, 'canvassing_id');
    }
}
