<?php
Route::group(['middleware'=>['web']], function(){
	Route::get('/', function () {
		return view('index');
	});

	Route::get('404', function () {
		return view('404');
	});

	Route::get('my-profile', function () {
		return view('my-profile');
	});

	Route::post('my-profile', function () {
		return view('my-profile');
	});


	Route::get('listing', function () {
		return view('listing');
	});

	Route::get('agents', function () {
		return view('agents');
	});

	Route::get('profile', function () {
		return view('profile');
	});

	Route::get('addProperty', function () {
		return view('addProperty');
	});

	Route::get('myProperty', function () {
		return view('myProperty');
	});

	Route::post('property/add', 'propertyController@postProperty');

	Route::post('property/image', 'propertyController@postPropertyPic');

	Route::get('property/search', 'propertyController@searchProperty');

	Route::get('property/all', 'propertyController@allProperty');

	Route::get('property/detail/{id}', 'propertyController@getPropertyDetail');

	Route::get('property/{id}', function ($id) {
		return view('single-full-width')->with('id', $id);
	});

	Route::controller('user', 'userController');

	Route::get('images/propertyImages/{id}', 'propertyController@getPropertyPic');


});

	Route::get('images/profileImages/{image}', function($image = null) {
		$dr = DIRECTORY_SEPARATOR;
	    $path = storage_path().$dr.'images'.$dr.'profileImages'.$dr.$image;
	    if (file_exists($path)) { 
	        return Response::download($path);
	    }
	});

	Route::post('test', function(){
		return 'OK';
	});
