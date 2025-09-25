<?php

use App\Http\Controllers\Sellers\SellerListController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/sellers')->name('home');
Route::get('/sellers/{state?}/{city?}', SellerListController::class)->name('sellers.index');
