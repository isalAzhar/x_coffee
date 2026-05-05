<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. VALIDASI INPUT
        $validator = Validator::make($request->all(), [
            'phone' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. CARI USER BERDASARKAN PHONE
        $user = User::where('phone', $request->phone)->first();

        // 3. CEK USER ADA ATAU TIDAK
        if (!$user) {
            return response()->json([
                'message' => 'User tidak ditemukan'
            ], 404);
        }

        // 4. CEK AKTIF ATAU TIDAK
        if (!$user->is_active) {
            return response()->json([
                'message' => 'Akun tidak aktif'
            ], 403);
        }

        // 5. CEK PASSWORD
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Password salah'
            ], 401);
        }

        // 6. BUAT TOKEN LOGIN
        $token = $user->createToken('auth_token')->plainTextToken;

        // 7. RESPONSE LOGIN
        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'phone' => $user->phone,
                'role' => $user->role
            ]
        ]);
    }
}