<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserManagementController extends Controller
{
    public function createCanvasser(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'phone' => 'required|string|unique:users,phone',
            'password' => 'required|string|min:6',
        ]);

        $canvasser = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => 'canvasser',
            'is_active' => true,
            'created_by' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Akun canvasser berhasil dibuat',
            'data' => $canvasser
        ], 201);
    }

    public function listCanvassers(Request $request)
    {
        $canvassers = User::where('role', 'canvasser')
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Data canvasser berhasil diambil',
            'data' => $canvassers
        ]);
    }

    public function updateCanvasser(Request $request, $id)
    {
        $canvasser = User::where('role', 'canvasser')
            ->find($id);

        if (!$canvasser) {
            return response()->json([
                'message' => 'Canvasser tidak ditemukan'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string',
            'phone' => [
                'required',
                'string',
                Rule::unique('users', 'phone')->ignore($canvasser->id),
            ],
            'password' => 'nullable|string|min:6',
            'is_active' => 'nullable|boolean',
        ]);

        $data = [
            'name' => $request->name,
            'phone' => $request->phone,
            'updated_by' => $request->user()->id,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        if ($request->has('is_active')) {
            $data['is_active'] = $request->is_active;
        }

        $canvasser->update($data);

        return response()->json([
            'message' => 'Canvasser berhasil diperbarui',
            'data' => $canvasser
        ]);
    }
}