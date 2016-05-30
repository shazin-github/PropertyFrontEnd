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
	Route::get('confirm' , function(){
		return view('confirm');
	});
	Route::get('confirm/{confirmCode}/{user_id}' , 'userController@confirmUser');
	Route::get('verification' , function(){

		if(session('user_id')){
			return redirect('/');
		}

		return view('verification');
	});
	Route::get('/search', function () {
		return view('search');
	});

	Route::get('/listing', function () {
		return view('search-listing');
	});

	Route::post('property/add', 'propertyController@postProperty');

	Route::post('property/image', 'propertyController@postPropertyPic');

	Route::post('property/M_image', 'propertyController@postM_PropertyPic');

	Route::post('property/search', 'propertyController@searchProperty');

	Route::get('property/all', 'propertyController@allProperty');

	Route::get('property/recent', 'propertyController@recentProperty');

	Route::get('property/mostview', 'propertyController@mostviewProperty');

	Route::get('property/userProperty', 'propertyController@userProperty');

	Route::get('property/detail/{id}', 'propertyController@getPropertyDetail');

	Route::get('property/view/{id}', 'propertyController@addPropertyView');

	Route::get('property/getCity' , 'propertyController@getCity');

	Route::get('property/citytemplate','propertyController@cityTemplate');

	Route::get('property/getstate','propertyController@getstate');

	Route::get('property/statetemplate','propertyController@stateTemplate');

	Route::get('property/addresstemplate' , 'propertyController@addresstemplate');

	Route::get('property/modeltemplate' ,'propertyController@modeltemplate');

	Route::get('property/{id}', function ($id) {
		return view('single-full-width')->with('id', $id);
	});

	Route::controller('user', 'userController');


});


	Route::post('test', function(){
		return 'OK';
	});
