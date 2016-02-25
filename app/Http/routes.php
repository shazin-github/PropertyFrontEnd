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

	Route::get('listing', function () {
	    return view('listing');
	});

	Route::get('agents', function () {
	    return view('agents');
	});

	Route::get('single-full-width', function () {
	    return view('single-full-width');
	});

	Route::controller('user', 'userController');
});

	Route::get('test', function () {
	    return Response::json(['success'=>true, 'msg'=>'Login Failed']);
	});