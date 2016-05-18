@extends('layouts.default')

@section('content-wrapper')
@if(session('user_id'))
	<!-- User Account Section -->
	<section class="user-account-section">
		<div class="container">
			<div class="user-account-tabs">
				<!-- Menu Controlls -->
				<ul class="heading">
					{{--<li><a class="profile" href="{{ URL::to('my-profile/') }}"><span>My Profile</span></a></li>--}}
					{{--<li><a class="submit "  href="{{ URL::to('#/submit') }}"  ><span>Submit new property</span></a></li>--}}
					{{--<li><a class="properties" href="{{ URL::to('#/properties')}}"><span>My Properties</span></a></li>--}}

				</ul>

				<!-- Body -->
				<div class="tabs-body" >

					<div ng-view></div>


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

