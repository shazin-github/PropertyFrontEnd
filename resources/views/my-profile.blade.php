@extends('layouts.default')
	@section('content-wrapper')
	<!-- User Account Section -->
	<section class="user-account-section">
		<div class="container">
			<div class="user-account-tabs">
				<!-- Menu Controlls -->
				<ul class="heading">
					<li><a class="profile" href="#profile"><span>My Profile</span></a></li>
					<li><a class="submit" href="#submit"><span>Submit new property</span></a></li>
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

					<div id="profile">
						<form class="update-form">
							<div class="row">
								<div class="col-md-11">
									<input type="text" class="js-input" placeholder="Enter your First Name" />
									<input type="text" class="js-input" placeholder="Enter your Last Name" />
									<input type="text" class="js-input" placeholder="Enter your Username" />
									<input type="text" class="js-input" placeholder="Enter your Email" />

									<div class="row row-fit-10">
										<div class="col-sm-12">
											<input type="text" class="js-input" placeholder="Password" />
										</div>
										<div class="col-sm-12">
											<input type="text" class="js-input" placeholder="Repeat the password" />
										</div>
									</div>
								</div>
								<div class="col-md-10 col-md-offset-1">
									<div class="photo-upload">
										<a href="my-profile.html#" class="upload-btn">
											<i class="icon icon-folder4"></i>
										</a>
										<img src="img/profile-avatar.jpg" alt="user photo" />

										<br />
										<a class="upload-link" href="my-profile.html#">Add your photo</a>
									</div>
								</div>
							</div>

							<p>Profile Information</p>
							<div class="row row-fit-10">
								<div class="col-sm-11">
									<div class="row row-fit-10">
										<div class="col-sm-12">
											<div class="social-input phone">
												<input type="text" class="js-input" placeholder="Phone" />
											</div>
											<div class="social-input facebook">
												<input type="text" class="js-input social facebook" placeholder="Facebook" />
											</div>
										</div>
										<div class="col-sm-12">
											<div class="social-input skype">
												<input type="text" class="js-input" placeholder="Skype" />
											</div>
											<div class="social-input twitter">
												<input type="text" class="js-input" placeholder="Twitter" />
											</div>
										</div>
									</div>
								</div>

								<div class="col-sm-13">
									<textarea class="js-input" placeholder="Other information"></textarea>
								</div>
							</div>

							<input class="update-btn" type="submit" value="Update your profile" />
						</form>
					</div>

					<div id="submit">
						<form class="submit-form">
							<div class="row">
								<div class="col-md-11">
									<input type="text" class="js-input" placeholder="Tittle" />
									<textarea class="js-input" placeholder="Description"></textarea>

									<div class="coutry-select select-box type-2">
										<input class="js-input no-select" type="text" readonly value="" placeholder="All countries" />
										<ul>
											<li>All countries</li>
											<li>Albania</li>
											<li>Andora</li>
											<li>Bulgaria</li>
											<li>Greece</li>
											<li>Russia</li>
											<li>USA</li>
											<li>Moldova</li>
										</ul>
									</div>

									<div class="city-select select-box type-2">
										<input class="js-input no-select" type="text" readonly value="" placeholder="All cities" />
										<ul>
											<li>All cities</li>
											<li>Tirana</li>
											<li>Elbasan</li>
											<li>Prats</li>
											<li>Ransoal</li>
											<li>Sofia</li>
											<li>Varna</li>
											<li>Athens</li>
											<li>Volos</li>
											<li>Moscow</li>
											<li>NY</li>
											<li>LA</li>
											<li>Chisinau</li>
										</ul>
									</div>

									<input type="text" class="js-input" placeholder="Address (street/ house/ ap.)" />

									<div class="row row-fit-10">
										<div class="col-sm-12">
											<input type="text" class="js-input nr-only" placeholder="Price $" />
										</div>
										<div class="col-sm-12">
											<input type="text" class="js-input nr-only" placeholder="Area (sq ft)" />
										</div>
									</div>
								</div>
								
								<div class="col-md-13 col-lg-offset-1 col-lg-12">
									<div class="photo-upload">
										<a href="my-profile.html#" class="upload-btn">
											<i class="icon icon-folder4"></i>
										</a>
										<img src="img/profile-avatar.jpg" alt="user photo" />

										<br />
										<a class="upload-link" href="my-profile.html#">Add your photo</a>
									</div>

									<div class="location-on-map">
										<div class="map-canvas" id="location-map"></div>
									</div>
								</div>
							</div>

							<div class="row comodities">
								<div class="col-md-11">
									<div class="row">
										<div class="filters">
											<div class="col-sm-12">
												<div class="select-filter">
													<label>
														<input type="radio" name="type-select" />
														<span>For rent</span>
													</label>
												</div>

												<div class="select-filter">
													<label>
														<input type="radio" name="type-select" />
														<span>For Sale</span>
													</label>
												</div>	
											</div>

											<div class="col-sm-12">
												<div class="nr-filter">
													<p class="caption">Baths</p>
													<div class="block">
														<span class="action substract">-</span>
														<input type="text" class="nr-only" value="1" />
														<span class="action add">+</span>
													</div>
												</div>

												<div class="nr-filter">
													<p class="caption">Beds</p>
													<div class="block">
														<span class="action substract">-</span>
														<input type="text" class="nr-only" value="1" />
														<span class="action add">+</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="col-md-13">
									<div class="check-option">
										<label>
											<input type="checkbox" name="parking" />
											<span>Parking</span>
										</label>
									</div>

									<div class="check-option">
										<label>
											<input type="checkbox" name="air-conditioning" />
											<span>Air conditioning</span>
										</label>
									</div>

									<div class="check-option">
										<label>
											<input type="checkbox" name="swimming-pool" />
											<span>Swimming pool</span>
										</label>
									</div>

									<div class="check-option">
										<label>
											<input type="checkbox" name="close-to-school" />
											<span>Close to school</span>
										</label>
									</div>

									<div class="check-option">
										<label>
											<input type="checkbox" name="balcony" />
											<span>Balcony</span>
										</label>
									</div>

									<div class="check-option">
										<label>
											<input type="checkbox" name="solar-heat" />
											<span>Solar heat</span>
										</label>
									</div>

									<div class="check-option">
										<label>
											<input type="checkbox" name="wine-cellar" />
											<span>Wine cellar</span>
										</label>
									</div>

									<div class="check-option">
										<label>
											<input type="checkbox" name="night-bar" />
											<span>Night Bar</span>
										</label>
									</div>
								</div>
							</div>

							<input class="button theme-button-2" type="submit" value="Submit your property" />
						</form>
					</div>

					<div id="properties">
						<div class="row row-fit-10">
							<div class="col-lg-6 col-md-8 col-sm-12">
								<div class="listing-item">
									<div class="item-cover type-1">
										<div class="cover">
											<p>Nulla posuere, egestas neque quis, suscipit eros. Vestibulum ut eros neque. Nam viverra maximus neque id convallis.</p>

											<a href="single.html">
												<i class="icon"></i>
											</a>
										</div>
										<img src="img/my-properties-1.jpg" alt="item cover" />
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
@endsection