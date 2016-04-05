@extends('layouts.default')

@section('content-wrapper')
@if(session('user_id'))
	<!-- User Account Section -->
	<section class="user-account-section">
		<div class="container">
			<div class="user-account-tabs">
				<!-- Menu Controlls -->
				<ul class="heading">
					<li><a class="profile" href="#profile"><span>My Profile</span></a></li>
					<li><a class="submit" ng-controller="addPropertyController" ng-click="map_init()"  href="#submit" ><span>Submit new property</span></a></li>
					<li><a class="properties" href="#properties"><span>My Properties</span></a></li>
				</ul>

				<!-- Body -->
				<div class="tabs-body">
					<div class="main-loader">
						<div class="spinner">
							<div class="spinner-container container1">
								<div class="circle1"></div>
								<div class="circle2"></div>
								<div class="circle3"></div>
								<div class="circle4"></div>
							</div>
							<div class="spinner-container container2">
								<div class="circle1"></div>
								<div class="circle2"></div>
								<div class="circle3"></div>
								<div class="circle4"></div>
							</div>
							<div class="spinner-container container3">
								<div class="circle1"></div>
								<div class="circle2"></div>
								<div class="circle3"></div>
								<div class="circle4"></div>
							</div>
						</div>
					</div>

					@include('profile')

					@include('addProperty')

					@include('myProperty')

				</div>
			</div>
		</div>
	</section>
@else
	<h3 style="font-family: calibri; font-size: 20px; margin-left: 10px; margin-top: 90px; margin-bottom: 600px;">
		Please Login again
	</h3>
@endif
@endsection