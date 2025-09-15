<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContestantController;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\ResultController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Categories
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/school_uniform', [ContestantController::class, 'schoolUniform'])->name('school_uniform');
    Route::get('/sports', [ContestantController::class, 'sports'])->name('sports');
    Route::get('/sptve', [ContestantController::class, 'sptve'])->name('sptve');
    Route::get('/filipiniana_barong', [ContestantController::class, 'filipiniana_barong'])->name('filipiniana_barong');
    Route::get('/q_and_a', [ContestantController::class, 'q_and_a'])->name('q_and_a');
    Route::get('/stage_presence', [ContestantController::class, 'stage_presence'])->name('stage_presence');
});

//Store Scores
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/school_uniform_scores', [ScoreController::class, 'store_School_Uniform'])->name('school_uniform_scores');
    Route::post('/sports_scores', [ScoreController::class, 'store_Sports'])->name('sports_scores');
    Route::post('/sptve_scores', [ScoreController::class, 'store_Sptve'])->name('sptve_scores');
    Route::post('/filipiniana_barong_scores', [ScoreController::class, 'store_Filipiniana_Barong'])->name('filipiniana_barong_scores');
    Route::post('/q_and_a_scores', [ScoreController::class, 'store_Q_and_A'])->name('q_and_a_scores');
    Route::post('/stage_presence_scores', [ScoreController::class, 'store_Stage_Presence'])->name('stage_presence_scores');
});

//Result
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/result', [ResultController::class, 'index'])->name('result');
    Route::get('/result_by_judges', [ResultController::class, 'byJudges'])->name('result_by_judges');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
