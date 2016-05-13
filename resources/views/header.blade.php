	<?php
		if(Session::has('username')){
	?>
	
	<header>
			<!-- Navigation -->
			<nav>
				<ul>
					<li class="home current-menu-item"><a href="{{ URL::to('my-profile') }}">My Profile</a></li>
					<!--<li class="listing menu-item-has-children">
						<a href="listing">Listing</a>

					</li> -->

					<li ng-controller="addPropertyController"  class="icon-folder-add "><a  href="{{ URL::to('my-profile#submit') }}" >Submit new property</a></li>

					<li class="icon-folder4 "><a  href="{{ URL::to('my-profile#properties') }}">My properties</a></li>
					<!-- <li class="agents"><a href="agents">Agents</a></li> -->
				</ul>
			</nav>

			<!-- Social Block & Login -->
			<div class="right-block">
				<div class="account-options">
					<div class="main-info">
						<img src="{{ URL::to(session('image')) }}" alt="User Image" />
						<span class="username">{{ session('firstname') }}</span>
					</div>

					<ul class="list">
						<li><a class="icon-profile2" href="{{ URL::to('my-profile') }}">My profile</a></li>

						<li><a class="icon-folder-add" href="{{ URL::to('my-profile#submit') }}">Submit new property</a></li>
						<li><a class="icon-folder4" href="{{ URL::to('my-profile#properties') }}">My properties</a></li>
						<li  ng-controller="userController"><a class="exit" href="#" ng-click="logout()">Logout</a></li>
					</ul>
				</div>
				
				<ul class="social-block">
					<li><a href="my-profile.html#"><i class="fa fa-facebook"></i></a></li>
					<li><a href="my-profile.html#"><i class="fa fa-twitter"></i></a></li>
					<li><a href="my-profile.html#"><i class="fa fa-instagram"></i></a></li>
					<li><a href="my-profile.html#"><i class="fa fa-pinterest"></i></a></li>
				</ul>
			</div>

			<!-- Menu Toggle -->
			<span class="menu-toggle cmn-toggle-switch cmn-toggle-switch__htx">
				<span>toggle menu</span>
			</span>

			<!-- Identity image -->
			<a href="/" class="brand">
				<img src="{{URL::to('img/logo.png')}}" alt="logo" />
			</a>
		</header>
	<?php
	} else {
	?>
	<!-- Header -->
	<header>
		<!-- Navigation -->
		<nav>
			<ul>
				<li class="home"><a href="/">Home</a></li>
				<!--<li class="listing"><a href="listing">Listing</a></li> -->
			</ul>
		</nav>

		<!-- Social Block & Login -->
		<div class="right-block">
			<ul class="social-block">
				<li><a href="index.html#"><i class="fa fa-facebook"></i></a></li>
				<li><a href="index.html#"><i class="fa fa-twitter"></i></a></li>
				<li><a href="index.html#"><i class="fa fa-instagram"></i></a></li>
				<li><a href="index.html#"><i class="fa fa-pinterest"></i></a></li>
			</ul>

			<p><a class="login" href="index.html#">Login</a> / <a href="index.html#" class="register">Register</a></p>
		</div>

		<!-- Menu Toggle -->
		<span class="menu-toggle cmn-toggle-switch cmn-toggle-switch__htx">
			<span>toggle menu</span>
		</span>

		<!-- Identity image -->
		<a href="/" class="brand">
			<img src="{{URL::to('img/logo.png')}}" alt="logo" />
		</a>
	</header>
	<?php
	}
	?>