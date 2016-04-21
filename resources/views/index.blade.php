@extends('layouts.default')

	@section('content-wrapper')
		{{--@if(session()->has('message'))--}}
			{{--<section class="alert-info" >--}}
				{{--<div class="alert alert-info">{{session('message')}}</div>--}}
			{{--</section>--}}


		{{--@endif--}}
		<div  ng-controller="searchController" >
		<!-- Properties Map Section -->
		<section class="properties-map" ng-cloak="">
			<div class="row row-fit">
				<div class="search-class" ng-class="{ 'hide' : !search }" ng-if="isListingsLoaded" >
					<form class="submit-form" name="searchMiniForm" >
						<div class="select-box wd-80 pull-left" >
							<input class="filter-box-input js-input no-select drop-wd" type="text" id="purpose-mini" readonly value="" placeholder="Buy" />
							<ul>
								<li >Rent</li>
								<li >Sale</li>
							</ul>
						</div>
						<input class="filter-box-input js-input no-select search-wd" id="search-mini" type="text" value="" placeholder="Search..." />
						<div class="select-box wd-110 pull-left">
							<input class="filter-box-input js-input no-select drop-wd" type="text" id="bedroom-mini" readonly value="" placeholder="Bedrooms" />
							<ul>
								<li >1</li>
								<li >2</li>
								<li >3</li>
							</ul>
						</div>
						<div class="select-box wd-80 pull-left" >
							<input class="filter-box-input js-input no-select drop-wd" type="text" id="bathroom-mini" readonly value="" placeholder="Baths" ng-cloak/>
							<ul>
								<li >1</li>
								<li >2</li>
								<li >3</li>
							</ul>
						</div>
						<input type="hidden" id="search_lat-mini" /> <input type="hidden" id="search_lng-mini" />
						<input type="button" class="button theme-button-1 update-properties" value="Search" ng-click="searchPropertyMini()" />
					</form>
				</div>
				</div>
			<div class="row row-fit" >
			<div class="col-md-15 col-lg-14" >

				<div id="home_map" class="mapClass"></div>
				</div>
				<div class="col-md-9 col-lg-10">
					<div class="map-filter-box" ng-class="{ 'hide' : search }">
					<div class="search-gap">
						<div class="box-caption">
							<h4>Search</h4>
							<p>Where are you looking?</p>
						</div>
						</div>
						<div class="search-class" ng-class="{ 'hide' : search }">
							<form class="submit-form" name="searchForm">
								<div class=" select-box  wd-80 pull-left">
									<input class="filter-box-input js-input no-select drop-wd" type="text" id="purpose" readonly value="" placeholder="Buy" />
									<ul>
										<li>Rent</li>
										<li>Sale</li>
									</ul>
								</div>
								<input class="filter-box-input js-input no-select search-wd" id="search" type="text" value="" placeholder="Search..." />
								<div class="select-box wd-110 pull-left">
									<input class="filter-box-input js-input no-select drop-wd" type="text" id="bedroom" readonly value="" placeholder="Bedrooms" />
									<ul>
										<li>1</li>
										<li>2</li>
										<li>3</li>
									</ul>
								</div>
								<div class="select-box wd-80 pull-left">
									<input class="filter-box-input js-input no-select drop-wd" type="text" id="bathroom" readonly value="" placeholder="Baths" />
									<ul>
										<li>1</li>
										<li>2</li>
										<li>3</li>
									</ul>
								</div>
								<input type="hidden" id="search_lat" /> <input type="hidden" id="search_lng" />
								<input type="button" class="button theme-button-1 update-properties" value="Search" ng-click="searchProperty()" />
							</form>
						</div>
					</div>

					<div class="home-list-ht" ng-if="listings.length != 0" ng-class="{ 'hide' : !search }" >
						<div class="listing-style" ng-repeat="list in listings">
							<div class="list-property" >
								<div class="cover list-img">
									<a href="property/<% list.property_id %>">
										<img alt="list property cover" src="<% list.image_url %>" >
									</a>
								</div>
								<div class="list-content" ng-mouseover="changemarkertest(list)" ng-mouseleave="resetmarkertest()" >
									<div class="property-header">
										<p class="price">$250 <span class="type"><% list.purpose %></span></p>
										<h2><a href="property/<% list.property_id %>"><% list.title %></a></h2>
										<p class="address"><% list.address  %></p>
									</div>

									<div class="property-body">
										<p><% list.description %></p>

										<ul class="post-meta">
											<li class="area">
												<span class="tool-tip"></span>
												<span class="nr"><% list.area  %></span>
											</li>
											<li class="bedrooms">
												<span class="tool-tip"></span>
												<span class="nr"><% list.bedrooms  %></span>
											</li>
											<li class="bathrooms">
												<span class="tool-tip"></span>
												<span class="nr"><% list.bathrooms  %></span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
				<input type="hidden" id="search_lat" /> <input type="hidden" id="search_lng" />
			</div>
		</section>

		<!-- Hot Offer Section -->
		<section class="hot-offer" >
			<div class="container">
				<div class="row">
					<div class="col-sm-6">
						<div class="caption">
							<h2><i class="icon icon-home4"></i> <span>Hot Offer</span></h2>
						</div>
					</div>

					<div class="col-sm-18">
						<div class="hot-offer-slider">
							<p>
								<a href="single-full-width.html">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra venenatis nisl, et venenatis nulla tincidunt non. Nulla sed dui est. Viverra venenatis nisl, et venenatis nulla tincidunt non.</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Listing Section -->
		<section class="listing-section" ng-if="recent.length != 0" ng-cloak="">
			<div class="container "  >
				<div class="section-header" >
					<h1 >Recent Listed</h1>
				</div>
			</div>

			<div  class="listing-items ">
				<div class="row" >
					<div class="col-xs-12 col-md-8 col-lg-6" ng-repeat="property in recent" >
						<div class="listing-item" >
							<div class="item-cover type-1" >
								<div class="cover" >
									<p ><% property.description %></p>

									<a href="property/<% property.id %>" >
										<i class="icon" ></i>
									</a>
								</div>
								<img src="<% property.image_url %>" alt="item cover" />
							</div>

							<div class="item-body">
								<div class="block services">
									<p class="caption">Services</p>
									<ul>
										<li class="bathrooms" >Bathrooms: <span><% property.bathrooms %></span></li>
										<li class="bedrooms" >Bedrooms: <span><% property.bedrooms %></span></li>
										<li class="area" >Area: <span><% property.area %></span></li>
									</ul>
								</div>

								<div class="block location-info" >
									<div class="location" >
										<h3 >
											<a href="single-full-width.html" ><% property.title %></a>
										</h3>
										<p ><% property.address %></p>
									</div>

									<div class="price" >
										<p ><% property.price %> <span>For <% property.purpose %></span></p>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</section>

		<!-- Most viewed Section -->
		<section class="most-viewed-section" ng-if="mostview.length != 0" ng-cloak="" >
			<div class="container " >
				<div class="section-header" >
					<h1>Most viewed</h1>
				</div>
			</div>

				<div class="listing-items "  >
					<div class="row" >
						<div class="col-xs-12 col-md-8 col-lg-6" ng-repeat="property in mostview" >
							<div class="listing-item" >
								<div class="item-cover type-1" >
									<div class="cover">
										<p ><% property.description %></p>

										<a href="property/<% property.id %>" >
											<i class="icon"></i>
										</a>
									</div>
									<img src="<% property.image_url %>" alt="item cover" />
								</div>

								<div class="item-body" >
									<div class="block services" >
										<p class="caption">Services</p>
										<ul>
											<li class="bathrooms" >Bathrooms: <span><% property.bathrooms %></span></li>
											<li class="bedrooms" >Bedrooms: <span><% property.bedrooms %></span></li>
											<li class="area" >Area: <span><% property.area %></span></li>
										</ul>
									</div>

									<div class="block location-info" >
										<div class="location" >
											<h3>
												<a href="single-full-width.html" ><% property.title %></a>
											</h3>
											<p ><% property.address %></p>
										</div>

										<div class="price" >
											<p ><% property.price %> <span>For <% property.purpose %></span></p>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
		</section>

		<!-- Agents Section -->
		<section class="agents-section hide">
			<div class="container">
				<div class="section-header">
					<h1>Our agents</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec viverra erat. Aenean elit tellus mattis quis maximus et malesuada congue velit</p>
				</div>

				<div class="row">
					<div class="col-md-10">
						<div class="agents-container">
							<ul class="agents-carousel">
								<li class="item">
									<div class="agent">
										<div class="image">
											<a href="agent.html">
												<img src="img/agent-1.jpg" alt="agent photo" />
											</a>
										</div>

										<h3><a href="agent.html">John Doe</a></h3>
										<p class="position">agent</p>

										<ul class="social-block">
											<li><a href="index.html#"><i class="fa fa-facebook"></i></a></li>
											<li><a href="index.html#"><i class="fa fa-twitter"></i></a></li>
											<li><a href="index.html#"><i class="fa fa-linkedin-square"></i></a></li>
										</ul>

										<p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam leo vel arcu. Sed ultricies, odio vel aliquet ultricies.</p>
									</div>

									<div class="agent">
										<div class="image">
											<a href="agent.html">
												<img src="img/agent-2.jpg" alt="agent photo" />
											</a>
										</div>

										<h3><a href="agent.html">Elias Doe</a></h3>
										<p class="position">agent</p>

										<ul class="social-block">
											<li><a href="index.html#"><i class="fa fa-facebook"></i></a></li>
											<li><a href="index.html#"><i class="fa fa-twitter"></i></a></li>
											<li><a href="index.html#"><i class="fa fa-linkedin-square"></i></a></li>
										</ul>

										<p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam leo vel arcu. Sed ultricies, odio vel aliquet ultricies.</p>
									</div>
								</li>

								<li class="item">
									<div class="agent">
										<div class="image">
											<a href="agent.html">
												<img src="img/agent-1.jpg" alt="agent photo" />
											</a>
										</div>

										<h3><a href="agent.html">John Doe</a></h3>
										<p class="position">agent</p>

										<ul class="social-block">
											<li><a href="index.html#"><i class="fa fa-facebook"></i></a></li>
											<li><a href="index.html#"><i class="fa fa-twitter"></i></a></li>
											<li><a href="index.html#"><i class="fa fa-linkedin-square"></i></a></li>
										</ul>

										<p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam leo vel arcu. Sed ultricies, odio vel aliquet ultricies.</p>
									</div>

									<div class="agent">
										<div class="image">
											<a href="agent.html">
												<img src="img/agent-2.jpg" alt="agent photo" />
											</a>
										</div>

										<h3><a href="agent.html">Elias Doe</a></h3>
										<p class="position">agent</p>

										<ul class="social-block">
											<li><a href="index.html#"><i class="fa fa-facebook"></i></a></li>
											<li><a href="index.html#"><i class="fa fa-twitter"></i></a></li>
											<li><a href="index.html#"><i class="fa fa-linkedin-square"></i></a></li>
										</ul>

										<p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam leo vel arcu. Sed ultricies, odio vel aliquet ultricies.</p>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div class="col-md-14">
						<div class="agent featured-agent">
							<div class="row">
								<div class="col-sm-10">
									<div class="image">
										<a href="agent.html">
											<img src="img/featured-agent.jpg" alt="featured agent photo" />
										</a>
									</div>
									<h3><a href="agent.html">Ryan Elias</a></h3>
									<p class="position">agent</p>

									<ul class="social-block">
										<li><a href="index.html#"><i class="fa fa-facebook"></i></a></li>
										<li><a href="index.html#"><i class="fa fa-twitter"></i></a></li>
										<li><a href="index.html#"><i class="fa fa-linkedin-square"></i></a></li>
									</ul>
								</div>

								<div class="col-sm-14">
									<div class="featured-agent-info">
										<p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam leo vel arcu. Sed ultricies, odio vel aliquet ultricies, turpis ipsum ultrices massa, vitae pulvinar nibh erat</p>

										<p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam leo vel arcu. Sed ultricies, odio vel aliquet ultricies, turpis ipsum ultrices massa, vitae pulvinar nibh erat</p>

										<ul>
											<li>
												<p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam leo vel arcu. Sed ultricies, odio vel aliquet ultricies.</p>
											</li>
											<li>
												<p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam leo vel arcu. Sed ultricies, odio vel aliquet ultricies.</p>
											</li>
											<li>
												<p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristique quam leo vel arcu. Sed ultricies, odio vel aliquet ultricies.</p>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Featured Blogposts -->
		<section class="featured-bloposts-section hide">
			<div class="bg-wrapper">
				<div class="container">
					<div class="section-header">
						<h1>From Blog</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec viverra erat. Aenean elit tellus mattis quis maximus et malesuada congue velit</p>
					</div>

					<div class="row row-fit-10">
						<div class="col-md-12">
							<div class="blog-post sticky">
								<div class="post-body">
									<div class="blog-post-meta">
										<div class="post-cover">
											<a href="blogpost.html">
												<img src="img/featured-post-1.jpg" alt="featured blogpost cover" />
											</a>
										</div>

										<div class="post-author">
											<div class="image">
												<img src="img/blog-author-1.jpg" alt="blog author" />
											</div>

											<p>Robert Doe</p>
										</div>
									</div>
									<h2 class="post-title"><a href="blogpost.html">Blogpost 1</a></h2>

									<p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristicu.</p>

									<div class="post-meta">
										<ul class="meta">
											<li class="date">11.3</li>
											<li class="comments">&#40;2&#41;</li>
										</ul>

										<a class="post-link" href="blogpost.html">Read More</a>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-12">
							<div class="blog-post">
								<div class="post-body">
									<div class="blog-post-meta">
										<div class="post-cover">
											<a href="blogpost.html">
												<img src="img/featured-post-2.jpg" alt="featured blogpost cover" />
											</a>
										</div>

										<div class="post-author">
											<div class="image">
												<img src="img/blog-author-2.jpg" alt="blog author" />
											</div>

											<p>Andrew Doe</p>
										</div>
									</div>

									<h2 class="post-title"><a href="blogpost.html">Blogpost 2</a></h2>

									<p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristicu.</p>

									<div class="post-meta">
										<ul class="meta">
											<li class="date">11.3</li>
											<li class="comments">&#40;2&#41;</li>
										</ul>

										<a class="post-link" href="blogpost.html">Read More</a>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-12">
							<div class="blog-post">
								<div class="post-body">
									<div class="blog-post-meta">
										<div class="post-cover">
											<a href="blogpost.html">
												<img src="img/featured-post-3.jpg" alt="featured blogpost cover" />
											</a>
										</div>

										<div class="post-author">
											<div class="image">
												<img src="img/blog-author-3.jpg" alt="blog author" />
											</div>

											<p>Roberta Doe</p>
										</div>
									</div>

									<h2 class="post-title"><a href="blogpost.html">Blogpost 3</a></h2>

									<p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristicu.</p>

									<div class="post-meta">
										<ul class="meta">
											<li class="date">11.3</li>
											<li class="comments">&#40;2&#41;</li>
										</ul>

										<a class="post-link" href="blogpost.html">Read More</a>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-12">
							<div class="blog-post">
								<div class="post-body">
									<div class="blog-post-meta">
										<div class="post-cover">
											<a href="blogpost.html">
												<img src="img/featured-post-4.jpg" alt="featured blogpost cover" />
											</a>
										</div>

										<div class="post-author">
											<div class="image">
												<img src="img/blog-author-4.jpg" alt="blog author" />
											</div>

											<p>Anastasia Doe</p>
										</div>
									</div>

									<h2 class="post-title"><a href="blogpost.html">Blogpost 4</a></h2>

									<p>Duis vel eros mi. Nunc eu sem dolor. Nulla venenatis, augue at rhoncus tincidunt, nisi dolor fringilla nibh, sed tristicu.</p>

									<div class="post-meta">
										<ul class="meta">
											<li class="date">11.3</li>
											<li class="comments">&#40;2&#41;</li>
										</ul>

										<a class="post-link" href="blogpost.html">Read More</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<a class="button theme-button-2" href="blog.html">Go to blog</a>
				</div>
			</div>
		</section>
		</div>
	@endsection