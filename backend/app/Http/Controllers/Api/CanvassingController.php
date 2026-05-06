<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CanvassingController extends Controller
{
    //CREATE CANVASSER
    public function store(Request $request)
    {
        // validasi input
        $request->validate([
            'name' => 'required',
            'phone' => 'required|unique:users,phone',
            'password' => 'required|min:6'
        ]);

        // buat user canvasser
        $canvasser = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => 'canvassing', // 🔥 INI YANG PENTING
            'is_active' => true
        ]);

        return response()->json([
            'message' => 'Canvasser berhasil dibuat',
            'data' => $canvasser
        ]);
    }

    
    public function index()
    {
        return User::where('role', 'canvassing')->get();
    }
}