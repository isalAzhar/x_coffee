<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('placements', function (Blueprint $table) {
    $table->id();
    $table->foreignId('canvassing_id')->nullable()->constrained('users')->nullOnDelete();
    $table->foreignId('mitra_id')->constrained('mitra')->cascadeOnDelete();
    $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
    $table->integer('initial_qty');
    $table->integer('returned_qty')->default(0);
    $table->enum('status', ['active','collected','closed'])->default('active');

    $table->timestamp('placed_at')->nullable();
    $table->timestamp('collected_at')->nullable();
    $table->timestamp('settled_at')->nullable();

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('placements');
    }
};
