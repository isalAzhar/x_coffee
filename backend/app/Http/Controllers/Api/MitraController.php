<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mitra;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;


class MitraController extends Controller
{
    public function index(Request $request)
    {
        $mitras = Mitra::with(['user', 'canvasser'])
            ->where('canvasser_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Data mitra berhasil diambil',
            'data' => $mitras
        ]);
    }

    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'phone' => 'required|string|unique:users,phone',
        'password' => 'required|string|min:6',

        'address' => 'nullable|string',
        'lat' => 'nullable|numeric',
        'lng' => 'nullable|numeric',
    ]);

    $result = DB::transaction(function () use ($request) {
        $userMitra = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => 'mitra',
            'is_active' => true,
            'created_by' => $request->user()->id,
        ]);

        $mitra = Mitra::create([
            'user_id' => $userMitra->id,
            'canvasser_id' => $request->user()->id,
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'lat' => $request->lat,
            'lng' => $request->lng,
            'is_active' => true,
            'created_by' => $request->user()->id,
        ]);

        return [
            'user' => $userMitra,
            'mitra' => $mitra,
        ];
    });

    return response()->json([
        'message' => 'Mitra berhasil dibuat',
        'data' => $result
    ], 201);
}

    public function update(Request $request, $id)
    {
        $mitra = Mitra::where('id', $id)
            ->where('canvasser_id', $request->user()->id)
            ->first();

        if (!$mitra) {
            return response()->json([
                'message' => 'Mitra tidak ditemukan atau bukan mitra yang Anda tangani'
            ], 404);
        }

        $userMitra = User::where('id', $mitra->user_id)
            ->where('role', 'mitra')
            ->first();

        if (!$userMitra) {
            return response()->json([
                'message' => 'Akun user mitra tidak ditemukan'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string',
            'phone' => [
                'required',
                'string',
                Rule::unique('users', 'phone')->ignore($userMitra->id),
            ],
            'password' => 'nullable|string|min:6',

            'address' => 'nullable|string',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
            'is_active' => 'nullable|boolean',
        ]);

        $result = DB::transaction(function () use ($request, $mitra, $userMitra) {
            $userData = [
                'name' => $request->name,
                'phone' => $request->phone,
                'updated_by' => $request->user()->id,
            ];

            if ($request->filled('password')) {
                $userData['password'] = Hash::make($request->password);
            }

            if ($request->has('is_active')) {
                $userData['is_active'] = $request->is_active;
            }

            $userMitra->update($userData);

            $mitra->update([
                'name' => $request->name,
                'phone' => $request->phone,
                'address' => $request->address,
                'lat' => $request->lat,
                'lng' => $request->lng,
                'is_active' => $request->has('is_active') ? $request->is_active : $mitra->is_active,
                'updated_by' => $request->user()->id,
            ]);

            return [
                'user' => $userMitra,
                'mitra' => $mitra,
            ];
        });

        return response()->json([
            'message' => 'Mitra berhasil diperbarui',
            'data' => $result
        ]);
    }
    public function adminUpdateMitra(Request $request, $id)
{
    $mitra = Mitra::find($id);

    if (!$mitra) {
        return response()->json([
            'message' => 'Mitra tidak ditemukan'
        ], 404);
    }

    $userMitra = User::where('id', $mitra->user_id)
        ->where('role', 'mitra')
        ->first();

    if (!$userMitra) {
        return response()->json([
            'message' => 'Akun user mitra tidak ditemukan'
        ], 404);
    }

    $request->validate([
        'name' => 'required|string',
        'phone' => [
            'required',
            'string',
            \Illuminate\Validation\Rule::unique('users', 'phone')->ignore($userMitra->id),
        ],
        'password' => 'nullable|string|min:6',
        'address' => 'nullable|string',
        'lat' => 'nullable|numeric',
        'lng' => 'nullable|numeric',
        'is_active' => 'nullable|boolean',
        'canvasser_id' => 'nullable|exists:users,id',
    ]);

    $result = \Illuminate\Support\Facades\DB::transaction(function () use ($request, $mitra, $userMitra) {
        $userData = [
            'name' => $request->name,
            'phone' => $request->phone,
            'updated_by' => $request->user()->id,
        ];

        if ($request->filled('password')) {
            $userData['password'] = \Illuminate\Support\Facades\Hash::make($request->password);
        }

        if ($request->has('is_active')) {
            $userData['is_active'] = $request->is_active;
        }

        $userMitra->update($userData);

        $mitraData = [
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'lat' => $request->lat,
            'lng' => $request->lng,
            'updated_by' => $request->user()->id,
        ];

        if ($request->has('is_active')) {
            $mitraData['is_active'] = $request->is_active;
        }

        if ($request->filled('canvasser_id')) {
            $mitraData['canvasser_id'] = $request->canvasser_id;
        }

        $mitra->update($mitraData);

        return [
            'user' => $userMitra,
            'mitra' => $mitra,
        ];
    });

    return response()->json([
        'message' => 'Mitra berhasil diperbarui oleh admin',
        'data' => $result
    ]);
}
public function adminIndex(Request $request)
{
    $mitras = Mitra::with(['user', 'canvasser'])
        ->latest()
        ->get();

    return response()->json([
        'message' => 'Semua data mitra berhasil diambil',
        'data' => $mitras
    ]);
}
}