<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mitra;

class MitraController extends Controller
{
    // 🔥 CANVASSER CREATE MITRA
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'address' => 'nullable'
        ]);

        $mitra = Mitra::create([
            'user_id' => $request->user()->id, 
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'lat' => $request->lat,
            'lng' => $request->lng
        ]);

        return response()->json([
            'message' => 'Mitra berhasil dibuat',
            'data' => $mitra
        ]);
    }

    // lihat mitra milik canvasser
    public function index(Request $request)
    {
        return Mitra::where('user_id', $request->user()->id)->get();
    }
}