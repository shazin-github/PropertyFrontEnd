<div class="user-account-tabs">
	<!-- Menu Controlls -->
	<ul class="heading">
		{{--<li><a class="profile" href="#profile"><span>My Profile</span></a></li>--}}
		{{--<li><a class="submit"  ><span>Submit new property</span></a></li>--}}
		<li><a class="properties" href="#properties"><span>My Properties</span></a></li>

	</ul>
</div>

<div id="properties"  ng-controller="myPropertyController" ng-init="initMyProperty()">
	<div class="row row-fit-10">
		<div class="col-lg-6 col-md-8 col-sm-12" ng-repeat="p in propertyList">
			<div class="listing-item">
				<div class="item-cover type-1">
					<div class="cover">
						<p><% p.description %></p>

						<a href="property/<% p.property_id %>">
							<i class="icon"></i>
						</a>
					</div>
					<img src="{{url('<% p.image_url %>')}}" alt="item cover" />
				</div>

				<div class="item-body">
					<div class="block services">
						<p class="caption">Services</p>
						<ul>
							<li class="bathrooms">Bathrooms: <span><% p.bathrooms %></span></li>
							<li class="bedrooms">Bedrooms: <span><% p.bedrooms %></span></li>
							<li class="area">Area: <span><% p.area %> <span style="text-transform: uppercase;"> <% p.area_type %></span> </span></li>
						</ul>
					</div>

					<div class="block location-info">
						<div class="location">
							<h3>
								<a href="property/<% p.property_id %>"><% p.address %></a>
							</h3>
							<p><% p.city %></p>
						</div>

						<div class="price">
							<p>$<% p.price %><span>for <% p.prop_purpose_id %></span></p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="col-lg-6 col-md-8 col-sm-12">
			<div class="listing-item">
				<div class="item-cover type-1">
					<div class="cover">
						<p>Nulla posuere, egestas neque quis, suscipit eros. Vestibulum ut eros neque. Nam viverra maximus neque id convallis.</p>

						<a href="single.html">
							<i class="icon"></i>
						</a>
					</div>
					<img src="img/my-properties-2.jpg" alt="item cover" />
				</div>

				<div class="item-body">
					<div class="block services">
						<p class="caption">Services</p>
						<ul>
							<li class="bathrooms">Bathrooms: <span>1</span></li>
							<li class="bedrooms">Bedrooms: <span>2</span></li>
							<li class="area">Area: <span>100</span></li>
						</ul>
					</div>

					<div class="block location-info">
						<div class="location">
							<h3>
								<a href="single-full-width.html">Grand hotel room</a>
							</h3>
							<p>LA 325</p>
						</div>

						<div class="price">
							<p>$450 000 <span>For sale</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-lg-6 col-md-8 col-sm-12">
			<div class="listing-item">
				<div class="item-cover type-1">
					<div class="cover">
						<p>Nulla posuere, egestas neque quis, suscipit eros. Vestibulum ut eros neque. Nam viverra maximus neque id convallis.</p>

						<a href="single.html">
							<i class="icon"></i>
						</a>
					</div>
					<img src="img/my-properties-3.jpg" alt="item cover" />
				</div>

				<div class="item-body">
					<div class="block services">
						<p class="caption">Services</p>
						<ul>
							<li class="bathrooms">Bathrooms: <span>1</span></li>
							<li class="bedrooms">Bedrooms: <span>2</span></li>
							<li class="area">Area: <span>100</span></li>
						</ul>
					</div>

					<div class="block location-info">
						<div class="location">
							<h3>
								<a href="single-full-width.html">Grand hotel room</a>
							</h3>
							<p>LA 325</p>
						</div>

						<div class="price">
							<p>$450 000 <span>For sale</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-lg-6 col-md-8 col-sm-12">
			<div class="listing-item">
				<div class="item-cover type-1">
					<div class="cover">
						<p>Nulla posuere, egestas neque quis, suscipit eros. Vestibulum ut eros neque. Nam viverra maximus neque id convallis.</p>

						<a href="single.html">
							<i class="icon"></i>
						</a>
					</div>
					<img src="img/my-properties-4.jpg" alt="item cover" />
				</div>

				<div class="item-body">
					<div class="block services">
						<p class="caption">Services</p>
						<ul>
							<li class="bathrooms">Bathrooms: <span>1</span></li>
							<li class="bedrooms">Bedrooms: <span>2</span></li>
							<li class="area">Area: <span>100</span></li>
						</ul>
					</div>

					<div class="block location-info">
						<div class="location">
							<h3>
								<a href="single-full-width.html">Grand hotel room</a>
							</h3>
							<p>LA 325</p>
						</div>

						<div class="price">
							<p>$450 000 <span>For sale</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-lg-6 col-md-8 col-sm-12">
			<div class="listing-item">
				<div class="item-cover type-1">
					<div class="cover">
						<p>Nulla posuere, egestas neque quis, suscipit eros. Vestibulum ut eros neque. Nam viverra maximus neque id convallis.</p>

						<a href="single.html">
							<i class="icon"></i>
						</a>
					</div>
					<img src="img/my-properties-5.jpg" alt="item cover" />
				</div>

				<div class="item-body">
					<div class="block services">
						<p class="caption">Services</p>
						<ul>
							<li class="bathrooms">Bathrooms: <span>1</span></li>
							<li class="bedrooms">Bedrooms: <span>2</span></li>
							<li class="area">Area: <span>100</span></li>
						</ul>
					</div>

					<div class="block location-info">
						<div class="location">
							<h3>
								<a href="single-full-width.html">Grand hotel room</a>
							</h3>
							<p>LA 325</p>
						</div>

						<div class="price">
							<p>$450 000 <span>For sale</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-lg-6 col-md-8 col-sm-12">
			<div class="listing-item">
				<div class="item-cover type-1">
					<div class="cover">
						<p>Nulla posuere, egestas neque quis, suscipit eros. Vestibulum ut eros neque. Nam viverra maximus neque id convallis.</p>

						<a href="single.html">
							<i class="icon"></i>
						</a>
					</div>
					<img src="img/my-properties-6.jpg" alt="item cover" />
				</div>

				<div class="item-body">
					<div class="block services">
						<p class="caption">Services</p>
						<ul>
							<li class="bathrooms">Bathrooms: <span>1</span></li>
							<li class="bedrooms">Bedrooms: <span>2</span></li>
							<li class="area">Area: <span>100</span></li>
						</ul>
					</div>

					<div class="block location-info">
						<div class="location">
							<h3>
								<a href="single-full-width.html">Grand hotel room</a>
							</h3>
							<p>LA 325</p>
						</div>

						<div class="price">
							<p>$450 000 <span>For sale</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-lg-6 col-md-8 col-sm-12">
			<div class="listing-item">
				<div class="item-cover type-1">
					<div class="cover">
						<p>Nulla posuere, egestas neque quis, suscipit eros. Vestibulum ut eros neque. Nam viverra maximus neque id convallis.</p>

						<a href="single.html">
							<i class="icon"></i>
						</a>
					</div>
					<img src="img/my-properties-7.jpg" alt="item cover" />
				</div>

				<div class="item-body">
					<div class="block services">
						<p class="caption">Services</p>
						<ul>
							<li class="bathrooms">Bathrooms: <span>1</span></li>
							<li class="bedrooms">Bedrooms: <span>2</span></li>
							<li class="area">Area: <span>100</span></li>
						</ul>
					</div>

					<div class="block location-info">
						<div class="location">
							<h3>
								<a href="single-full-width.html">Grand hotel room</a>
							</h3>
							<p>LA 325</p>
						</div>

						<div class="price">
							<p>$450 000 <span>For sale</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-lg-6 col-md-8 col-sm-12">
			<div class="listing-item">
				<div class="item-cover type-1">
					<div class="cover">
						<p>Nulla posuere, egestas neque quis, suscipit eros. Vestibulum ut eros neque. Nam viverra maximus neque id convallis.</p>

						<a href="single.html">
							<i class="icon"></i>
						</a>
					</div>
					<img src="img/my-properties-8.jpg" alt="item cover" />
				</div>

				<div class="item-body">
					<div class="block services">
						<p class="caption">Services</p>
						<ul>
							<li class="bathrooms">Bathrooms: <span>1</span></li>
							<li class="bedrooms">Bedrooms: <span>2</span></li>
							<li class="area">Area: <span>100</span></li>
						</ul>
					</div>

					<div class="block location-info">
						<div class="location">
							<h3>
								<a href="single-full-width.html">Grand hotel room</a>
							</h3>
							<p>LA 325</p>
						</div>

						<div class="price">
							<p>$450 000 <span>For sale</span></p>
						</div>
					</div>
				</div>
			</div>
		</div> -->
	</div>
</div>