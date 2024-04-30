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
        Schema::create('solutions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('cid')->constrained('comments')->cascadeOnDelete();
            $table->foreignId('uid')->constrained('users');
            $table->foreignId('pid')->constrained('posts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solutions');
    }
};
