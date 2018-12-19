<?php

use Illuminate\Http\Request;
Use App\User;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/getUsersList','UserController@getUsersList')->name('getUsersList');
Route::post('/getUserDetails','UserController@getUserDetails')->name('getUserDetails');//get user details by id
Route::post('/deleteUser','UserController@deleteUser')->name('deleteUser');//delete user bu id

Route::post('/getRolesList','RoleController@getRolesList')->name('getRolesList');
Route::post('/getRolesDetails','RoleController@getRolesDetails')->name('getRolesDetails');//get user details by id
Route::post('/deleteRoles','RoleController@deleteRoles')->name('deleteRoles');//delete user bu id

//added alpha