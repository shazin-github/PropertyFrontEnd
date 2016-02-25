	<?php
		if(Session::has('username')){
	?>
	
	<header>
			<!-- Navigation -->
			<nav>
				<ul>
					<li class="home current-menu-item"><a href="my-profile.html">My Profile</a></li>
					<li class="listing menu-item-has-children">
						<a href="my-profile.html#">Listing</a>
						<ul class="sub-menu">
							<li><a href="properties-grid.html">Grid</a></li>
							<li><a href="properties-list.html">List</a></li>
						</ul>
					</li>
					<li class="property"><a href="single-full-width.html">Property</a></li>
					<li class="agents"><a href="agents.html">Agents</a></li>
					<li class="blog"><a href="blog.html">Blog</a></li>
					<li class="error"><a href="404.html">404 Page</a></li>
				</ul>
			</nav>

			<!-- Social Block & Login -->
			<div class="right-block">
				<div class="account-options">
					<div class="main-info">
						<img src="img/profile-avatar.jpg" alt="profile avatar" />

						<span class="username">John Doe</span>
					</div>

					<ul class="list">
						<li><a class="profile" href="my-profile#profile">My profile</a></li>
						<li><a class="submit-new" href="my-profile#submit">Submit new property</a></li>
						<li><a class="properties" href="my-profile#properties">My properties</a></li>
						<li ng-app="app" ng-controller="userController"><a class="exit" href="#" ng-click="logout()">Logout</a></li>
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
			<a href="index.html" class="brand">
				<img src="img/logo.png" alt="logo" />
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
				<li class="home current-menu-item"><a href="my-profile">My Profile</a></li>
				<li class="listing"><a href="listing">Listing</a></li>
				<li class="property"><a href="single-full-width">Property</a></li>
				<li class="error"><a href="404">404 Page</a></li>
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
		<a href="index" class="brand">
			<img src="img/logo.png" alt="logo" />
		</a>
	</header>
	<?php
	}
	?>