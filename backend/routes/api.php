<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserManagementController;
use App\Http\Controllers\Api\CanvassingController;
use App\Http\Controllers\Api\MitraController;
use App\Http\Controllers\Api\ProductController;

Route::get('/ping', function () {
    return 'API OK';
});
/*
|-------------------------
| AUTH
|-------------------------
*/
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
/*
|-------------------------
| ADMIN AREA
|-------------------------
*/
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return response()->json([
            'message' => 'Admin area'
        ]);
    });

    // Admin melihat daftar canvasser
    Route::get('/admin/canvassers', [UserManagementController::class, 'listCanvassers']);

    // Admin membuat akun canvasser
    Route::post('/admin/canvassers', [UserManagementController::class, 'createCanvasser']);

    // Admin edit akun canvasser
    Route::put('/admin/canvassers/{id}', [UserManagementController::class, 'updateCanvasser']);

    // admin edit mitra, termasuk akun user mitra
    Route::put('/admin/mitras/{id}', [MitraController::class, 'adminUpdateMitra']);

     // Admin melihat semua mitra
     Route::get('/admin/mitras', [MitraController::class, 'adminIndex']);

    
});

/*
|-------------------------
| CANVASSING AREA
|-------------------------
*/
Route::middleware(['auth:sanctum', 'role:canvasser'])->group(function () {
    Route::get('/canvasser/dashboard', function () {
        return response()->json([
            'message' => 'Canvasser area'
        ]);
    });

    // Canvasser melihat mitra yang dia tangani
    Route::get('/canvasser/mitras', [MitraController::class, 'index']);

    // Canvasser mendaftarkan mitra baru
    Route::post('/canvasser/mitras', [MitraController::class, 'store']);

    // Canvasser edit mitra, termasuk akun user mitra
    Route::put('/canvasser/mitras/{id}', [MitraController::class, 'update']);
});

/*
|-------------------------
| MITRA AREA
|-------------------------
*/
Route::middleware(['auth:sanctum', 'role:mitra'])->group(function () {

    Route::get('/mitra/dashboard', function () {
        return response()->json([
            'message' => 'Mitra area'
        ]);
    });
});