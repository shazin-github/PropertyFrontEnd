<?php

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

	Route::get('single-full-width', function () {
	    return view('single-full-width');
	});