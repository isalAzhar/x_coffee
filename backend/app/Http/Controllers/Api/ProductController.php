<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // 📥 1. GET: List produk aktif
    public function index()
    {
        // Hanya kembalikan produk yang masih aktif
        $products = Product::where('is_active', true)->orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }

    // 🔍 2. GET: Detail 1 produk
    public function show($id)
    {
        $product = Product::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    // ➕ 3. POST: Tambah produk baru (+ upload gambar opsional)
    public function store(Request $request)
    {
        // 🔒 Validasi input
        $validated = $request->validate([
            'name'  => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // max 2MB
        ]);

        // 🖼️ Upload gambar jika ada
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        // 💾 Simpan ke database
        $product = Product::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil ditambahkan',
            'data' => $product
        ], 201);
    }

    // ✏️ 4. PUT/PATCH: Update produk
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name'  => 'sometimes|string|max:100',
            'price' => 'sometimes|numeric|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'is_active' => 'sometimes|boolean'
        ]);

        // 🖼️ Jika ada gambar baru, hapus yang lama & upload baru
        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil diperbarui',
            'data' => $product
        ]);
    }

    // 🗑️ 5. DELETE: Nonaktifkan produk (Soft Disable)
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        
        // ⚠️ Jangan hapus permanen, cukup nonaktifkan
        // Agar histori placements & sales tidak rusak
        $product->update(['is_active' => false]);

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil dinonaktifkan'
        ]);
    }
}