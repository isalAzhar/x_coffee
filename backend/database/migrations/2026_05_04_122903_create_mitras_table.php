<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('mitras', function (Blueprint $table) {
            $table->id();

            // Akun login mitra
            $table->foreignId('user_id')
                ->constrained('users')
                ->restrictOnDelete();

            // Canvasser yang menangani mitra
            $table->foreignId('canvasser_id')
                ->constrained('users')
                ->restrictOnDelete();

            $table->string('name');
            $table->string('phone');
            $table->text('address')->nullable();

            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();

            $table->boolean('is_active')->default(true);

            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('deleted_by')->nullable()->constrained('users')->nullOnDelete();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mitras');
    }
};