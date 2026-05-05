<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'phone' => '088210355259',
            'password' => Hash::make('123456'),
            'role' => 'admin',
            'is_active' => true
        ]);
    }
}