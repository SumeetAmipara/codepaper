<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [HomeController::class, 'index']);
Route::get('/home', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth'])->group(function () {
    // Blog routes
    Route::get('/blog/add', [BlogController::class, 'add']);
    Route::get('/blog/{blog_id}', [BlogController::class, 'detail']);
    Route::post('/blog/save', [BlogController::class, 'save']);
    Route::get('/blog/edit/{blog_id}', [BlogController::class, 'edit']);
    Route::post('/blog/update', [BlogController::class, 'update']);
    Route::get('/blog/delete/{blog_id}', [BlogController::class, 'delete']);


    // Comment routes
    Route::post('/comment/save', [CommentController::class, 'save']);


});

Auth::routes();

