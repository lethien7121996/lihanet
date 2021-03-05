<?php



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'ApiController@login');
Route::get('infouser/{id}', 'ApiController@infouser');




Route::get('kybaocao', 'KyBaoCaoController@index');
Route::post('kybaocao', 'KyBaoCaoController@store');
Route::get('kybaocaodelete/{id}', 'KyBaoCaoController@destroy');
Route::post('kybaocaoupdate/{id}', 'KyBaoCaoController@update');
Route::get('kybaocaotheoid/{id}', 'KyBaoCaoController@kybaocaotheoid');


Route::get('bieumau', 'BieuMauController@index');
Route::post('bieumau', 'BieuMauController@store');
Route::get('bieumaudelete/{id}', 'BieuMauController@destroy');
Route::post('bieumauupdate/{id}', 'BieuMauController@update');
Route::get('bieumautheoid/{id}', 'BieuMauController@bieumautheoid');
Route::get('bieumautheoidkybaocao/{id}', 'BieuMauController@bieumautheoidkybaocao');

Route::get('sanluong', 'QuanLySanLuongController@index');
Route::post('sanluong', 'QuanLySanLuongController@store');
Route::get('sanluongdelete/{id}', 'QuanLySanLuongController@destroy');
Route::post('sanluongupdate/{id}', 'QuanLySanLuongController@updatesanluong');
Route::post('dientichupdate/{id}', 'QuanLySanLuongController@updatedientich');
Route::get('thongkesanluong', 'QuanLySanLuongController@thongkesanluong');
Route::get('sanluongtheoid/{id}', 'QuanLySanLuongController@bieumautheoid');
Route::get('sanluongtheoidkybaocao/{id}', 'QuanLySanLuongController@bieumautheoidkybaocao');