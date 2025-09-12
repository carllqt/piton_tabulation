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
        Schema::create('scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contestant_id')->constrained('contestants')->onDelete('cascade');
            $table->foreignId('judge_id')->constrained('users')->onDelete('cascade');
            
            $table->double('school_uniform')->nullable();
            $table->double('sports')->nullable();
            $table->double('sptve')->nullable();
            $table->double('filipiniana_barong')->nullable();
            $table->double('q_and_a')->nullable();
            $table->double('stage_presence')->nullable();
            $table->double('total_scores')->nullable();
            $table->timestamps();

            $table->unique(['contestant_id', 'judge_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scores');
    }
};
