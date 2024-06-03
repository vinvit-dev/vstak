<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagsController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard')->middleware('auth');

Route::post('/posts/search', [PostController::class, 'search'])->name('posts.search');
Route::post('/posts/{post}/solve', [PostController::class, 'solve'])->name('posts.solve');
Route::resource('posts', PostController::class);

Route::resource('comments', CommentController::class);

Route::post('/tags/search', [TagsController::class, 'search'])->name('tags.search');
Route::post('/tags', [TagsController::class, 'store'])->name('tags.store');
Route::get('/tags/{tag}', [TagsController::class, 'show'])->name('tags.show');

Route::post('/file/upload', [FileController::class, 'upload'])->name('file.upload');

Route::get('/profile/{user}', [ProfileController::class, 'show'])->name('profile.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
