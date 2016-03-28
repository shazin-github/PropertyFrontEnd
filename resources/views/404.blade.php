@extends('layouts.default')
		
	@section('content-wrapper')
		<!-- 404 Section -->
		<section class="error-section">
			<div class="container">
				<div class="heading">
					<span class="heading-404">404</span>
					<img class="image-404" src="{{ url('img/404.png') }}" alt="404 image" />
					<p class="sub-title">Page not found</p>
				</div>

				<div class="body-404">
					<h4>The page you are looking for might have been removed, had its name changed, or it is unavailable</h4>
					<a href="index.html" class="button theme-button-2">Go home</a>
				</div>
			</div>
		</section>
	@endsection
<!-- <body data-smooth-scroll="on"> -->
