<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Homepage', [
//         'title' => 'aselole',
//         'content' => 'This is the homepage',
//     ]);
// });

// Route::get('/news', [NewsController::class, 'index'])->name('news.index');

// Route::resource('news', NewsController::class);
Route::get('/', [NewsController::class, 'index'])->name('news.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/news', [NewsController::class, 'store'])->name('news.store');
    Route::get('/news', [NewsController::class, 'show'])->name('news.show');
    Route::get('/news/edit/{news}', [NewsController::class, 'edit'])->name('news.edit');
    Route::post('/news/update/{news}', [NewsController::class, 'update'])->name('news.update');
    Route::post('/news/delete/{news}', [NewsController::class, 'destroy'])->name('news.delete');
});

require __DIR__ . '/auth.php';
