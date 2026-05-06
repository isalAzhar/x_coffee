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
            'name' => 'isal',
            'phone' => '12345',
            'password' => Hash::make('123'),
            'role' => 'admin',
            'is_active' => true
        ]);
    }
}