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

					<div id="submit" ng-controller="addPropertyController">
						<form class="submit-form" method="POST" name="propertyForm" ng-submit="addProperty()" novalidate>
							<input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
							<div class="row">
								<div class="col-md-11">
									<input type="text" class="js-input" placeholder="Title"  required name="title" ng-model="title"/>
									<textarea class="js-input" placeholder="Description" required ng-model="description"></textarea>

									<!-- <div class="coutry-select select-box type-2">
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
									</div> -->
									<input type="text" class="js-input" placeholder="Country" id="country" disabled="true" ng-model="country"/>

									<div class="select-box type-2">
										<input class="js-input no-select" type="text" required placeholder="State" ng-model="state" ng-readonly="true" />
										<ul>
											<li>Select State</li>
											<li>Azad Jammu & Kashmir</li>
											<li>Balochistan</li>
											<li>Federally Administered Tribal Areas</li>
											<li>Gilgit-Baltistan</li>
											<li>Islamabad Capital Territory</li>
											<li>Khyber Pakhtunkhwa</li>
											<li>Punjab</li>
											<li>Sindh</li>
										</ul>
									</div>

									<div class="select-box type-2">
										<input type="hidden" ng-value="city" />
										<input class="js-input no-select" type="text" required readonly value="" placeholder="City" />
										<ul>
											<li>Select City</li>
									<li>Abbottabad</li>
									<li>Arifwala</li>
									<li>Astore</li>
									<li>Attock</li>
									<li>Awaran</li>
									<li>Badin</li>
									<li>Bagh</li>
									<li>Bahawalnagar</li>
									<li>Bahawalpur</li>
									<li>Bannu</li>
									<li>Bhakkar</li>
									<li>Bhimber</li>
									<li>Burewala</li>
									<li>Chaghi</li>
									<li>Chakwal</li>
									<li>Chichawatni</li>
									<li>Chiniot</li>
									<li>Chitral</li>
									<li>Chunian</li>
									<li>Dadu</li>
									<li>Daska</li>
									<li>Depalpur</li>
									<li>Dera Ghazi Khan</li>
									<li>Dera Ismail Khan</li>
									<li>Duniya Pur</li>
									<li>FATA</li>
									<li>Faisalabad</li>
									<li>Fateh Jang</li>
									<li>Galyat</li>
									<li>Ghotki</li>
									<li>Gilgit</li>
									<li>Gujar Khan</li>
									<li>Gujranwala</li>
									<li>Gujrat</li>
									<li>Gwadar</li>
									<li>Hafizabad</li>
									<li>Haripur</li>
									<li>Haroonabad</li>
									<li>Hasan Abdal</li>
									<li>Hub (Hub Chowki)</li>
									<li>Hunza</li>
									<li>Hyderabad</li>
									<li>Islamabad</li>
									<li>Jacobabad</li>
									<li>Jauharabad</li>
									<li>Jhang</li>
									<li>Jhelum</li>
									<li>Kaghan</li>
									<li>Kalat</li>
									<li>Karachi</li>
									<li>Karak</li>
									<li>Kasur</li>
									<li>Khairpur</li>
									<li>Khanewal</li>
									<li>Kharian</li>
									<li>Khushab</li>
									<li>Khuzdar</li>
									<li>Kohat</li>
									<li>Kot Addu</li>
									<li>Kotli</li>
									<li>Lahore</li>
									<li>Lalamusa</li>
									<li>Larkana</li>
									<li>Lasbela</li>
									<li>Layyah</li>
									<li>Lodhran</li>
									<li>Loralai</li>
									<li>Mailsi</li>
									<li>Makran</li>
									<li>Malakand</li>
									<li>Mandi Bahauddin</li>
									<li>Mansehra</li>
									<li>Mardan</li>
									<li>Matiari</li>
									<li>Mian Channu</li>
									<li>Mianwali</li>
									<li>Mingora</li>
									<li>Mirpur</li>
									<li>Mirpur Khas</li>
									<li>Multan</li>
									<li>Murree</li>
									<li>Muzaffarabad</li>
									<li>Muzaffargarh</li>
									<li>Nankana Sahib </li>
									<li>Naran</li>
									<li>Narowal</li>
									<li>Nasirabad</li>
									<li>Naushahro Feroze</li>
									<li>Nawabshah</li>
									<li>Neelum</li>
									<li>Nowshera</li>
									<li>Okara</li>
									<li>Pakpattan</li>
									<li>Peshawar</li>
									<li>Pir Mahal</li>
									<li>Quetta</li>
									<li>Rahim Yar Khan</li>
									<li>Rajanpur</li>
									<li>Ratwal</li>
									<li>Rawalakot</li>
									<li>Rawalpindi</li>
									<li>Rohri</li>
									<li>Sadiqabad</li>
									<li>Sahiwal</li>
									<li>Sanghar</li>
									<li>Sargodha</li>
									<li>Sehwan</li>
									<li>Shahdadpur</li>
									<li>Sheikhupura</li>
									<li>Shikarpur</li>
									<li>Sialkot</li>
									<li>Sibi</li>
									<li>Skardu</li>
									<li>Sudhnoti</li>
									<li>Sukkur</li>
									<li>Swabi</li>
									<li>Swat</li>
									<li>Tando Adam</li>
									<li>Taxila</li>
									<li>Thatta</li>
									<li>Toba Tek Singh</li>
									<li>Vehari</li>
									<li>Wah</li>
									<li>Wazirabad</li>
									<li>Waziristan</li>
									<li>Zhob</li>
											</ul>
									</div>

									<input type="text" class="js-input" required placeholder="ZipCode" id="zip" ng-model="zip"/>

									<input type="text" class="js-input" required placeholder="Address (street/ house/ ap.)" id="address" ng-model="address"/>

									<div class="row row-fit-10">
										<div class="col-sm-12">
											<input type="text" class="js-input nr-only" required placeholder="Price $" ng-model="price"/>
										</div>
										<div class="col-sm-12">
											<input type="text" class="js-input nr-only" required placeholder="Area (sq ft)" ng-model="area"/>
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
										<input type="hidden" id="latitude" ng-model="latitude" />
										<input type="hidden" id="longitude" ng-model="longitude" />
									</div>
								</div>
							</div>

							<div class="row comodities">
								<div class="col-md-12">
									<div class="row">
										<div class="filters">
											<div class="col-sm-6">
												<div class="select-filter">
													<label>
														<input type="radio" name="purpose-select" required id="purpose-select" ng-model="purpose" />
														<span>For rent</span>
													</label>
												</div>

												<div class="select-filter">
													<label>
														<input type="radio" name="purpose-select" required id="purpose-select" ng-model="purpose" />
														<span>For Sale</span>
													</label>
												</div>	
											</div>

											<div class="col-sm-6">
												<div class="select-filter">
													<label>
														<input type="radio" name="type-select" required id="type-select" ng-model="type" />
														<span>Home</span>
													</label>
												</div>

												<div class="select-filter">
													<label>
														<input type="radio" name="type-select" required id="type-select" ng-model="type" />
														<span>Plot</span>
													</label>
												</div>

												<div class="select-filter">
													<label>
														<input type="radio" name="type-select" required id="type-select" ng-model="type" />
														<span>Commercial</span>
													</label>
												</div>
											</div>
											<div class="col-sm-6">
												<div class="select-filter">
													<label>
														<input type="radio" name="category-select" required id="category-select" ng-model="category" />
														<span>Single Person</span>
													</label>
												</div>

												<div class="select-filter">
													<label>
														<input type="radio" name="category-select" required id="category-select" ng-model="category"/>
														<span>Family</span>
													</label>
												</div>

												<div class="select-filter">
													<label>
														<input type="radio" name="category-select" required id="category-select" ng-model="category"/>
														<span>Events</span>
													</label>
												</div>
											</div>

											<div class="col-sm-6">
												<div class="nr-filter">
													<p class="caption">Baths</p>
													<div class="block">
														<span class="action substract">-</span>
														<input type="text" class="nr-only" required value="1"/>
														<span class="action add">+</span>
														<input type="hidden" name="bath" id="bathmodel" ng-model="bath" />
													</div>
												</div>

												<div class="nr-filter">
													<p class="caption">Beds</p>
													<div class="block">
														<span class="action substract">-</span>
														<input type="text" class="nr-only" required value="1" id="bed"/>
														<span class="action add">+</span>
														<input type="hidden" name="bed" id="bedmodel" ng-model="bed" />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="col-md-12">
									<div class="check-option">
										<label>
											<input type="checkbox" name="parking" ng-model="park"/>
											<span>Parking</span>
										</label>
									</div>

									<div class="check-option">
										<label>
											<input type="checkbox" name="air-conditioning" ng-model="ac"/>
											<span>Air conditioning</span>
										</label>
									</div>

									<div class="check-option">
										<label>
											<input type="checkbox" name="swimming-pool" ng-model="swim"/>
											<span>Swimming pool</span>
										</label>
									</div>

									<!-- <div class="check-option">
										<label>
											<input type="checkbox" name="close-to-school" />
											<span>Close to school</span>
										</label>
									</div> -->

									<div class="check-option">
										<label>
											<input type="checkbox" name="balcony" ng-model="balcony"/>
											<span>Balcony</span>
										</label>
									</div>

									<!-- <div class="check-option">
										<label>
											<input type="checkbox" name="solar-heat" />
											<span>Solar heat</span>
										</label>
									</div> -->

									<!-- <div class="check-option">
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
									</div> -->
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