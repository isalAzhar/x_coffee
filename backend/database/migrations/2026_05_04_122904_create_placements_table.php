<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('placements', function (Blueprint $table) {
            $table->id();

            $table->foreignId('canvasser_id')
                ->constrained('users')
                ->restrictOnDelete();

            $table->foreignId('mitra_id')
                ->constrained('mitras')
                ->restrictOnDelete();

            $table->enum('status', ['active', 'collected', 'closed'])
                ->default('active');

            $table->timestamp('placed_at')->nullable();
            $table->timestamp('collected_at')->nullable();
            $table->timestamp('settled_at')->nullable();

            // Audit columns
            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignId('updated_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignId('deleted_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('placements');
    }
};