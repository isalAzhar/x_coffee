<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CanvassingController;
use App\Http\Controllers\Api\MitraController;

/*
|-------------------------
| AUTH
|-------------------------
*/
Route::post('/login', [AuthController::class, 'login']);

/*
|-------------------------
| ADMIN AREA
|-------------------------
*/
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // admin bikin canvasser
    Route::post('/canvassers', [CanvassingController::class, 'store']);
    // admin lihat semua canvasser
    Route::get('/canvassers', [CanvassingController::class, 'index']);

    Route::get('/admin/dashboard', function () {
        return 'Admin area';
    });
});

/*
|-------------------------
| CANVASSING AREA
|-------------------------
*/
Route::middleware(['auth:sanctum', 'role:canvassing'])->group(function () {
    // canvasser bikin mitra
    Route::post('/mitra', [MitraController::class, 'store']);

    // lihat mitra milik canvasser
    Route::get('/mitra', [MitraController::class, 'index']);
    Route::get('/canvassing/dashboard', function () {
        return 'Canvassing area';
    });
});

/*
|-------------------------
| MITRA AREA
|-------------------------
*/
Route::middleware(['auth:sanctum', 'role:mitra'])->group(function () {

    Route::get('/mitra/dashboard', function () {
        return 'Mitra area';
    });
});