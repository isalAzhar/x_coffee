<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();

            $table->foreignId('placement_id')
                ->constrained('placements')
                ->restrictOnDelete();

            $table->foreignId('mitra_id')
                ->constrained('mitras')
                ->restrictOnDelete();

            $table->foreignId('canvasser_id')
                ->constrained('users')
                ->restrictOnDelete();

            $table->integer('total_amount')->default(0);

            $table->enum('status', ['pending', 'verified', 'collected'])
                ->default('pending');

            $table->timestamp('sold_at')->nullable();

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
        Schema::dropIfExists('sales');
    }
};