<div id="submit" ng-controller="addPropertyController">
	<form class="submit-form" method="POST" name="propertyForm" ng-submit="addProperty()">
		<input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
		<div class="row">
			<div class="col-md-11">
				<div ng-class="status ? 'alert-success' : 'alert-danger'" id="resultDiv"><% msg %></div>
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

				<div class="select-box type-2" id="stateSelectBox">
					<input class="js-input no-select" type="text" required placeholder="State" id="state" ng-model="state" ng-readonly="true" />
					<state-list state="statelist" on-click="setstate(statename)" ></state-list>


				</div>

				<div class="select-box type-2" id="citySelectBox">
					<input type="hidden" ng-value="city" />
					<input class="js-input no-select" type="text" required id="city" value="" placeholder="City" ng-model="city" ng-readonly="true"/>
					<city-list  city="citylist" on-click="setCity(cityName)" start="start" current="current"></city-list>



				</div>

				{{--<input type="text" class="js-input" required placeholder="Address (street/ house/ ap.)" ng-init="addNewLocation()" id="address" ng-model="address"/>--}}

				<input type="text" class="js-input" id="addresss" placeholder="Address (street/ house/ ap.)"  ng-autocomplete ng-model="result1" />

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
					{{--<a href="#" class="upload-btn" onclick="$('#propImages').trigger('click');">--}}
						{{--<i class="icon icon-folder4"></i>--}}
					{{--</a>--}}

					{{--<img ng-attr-src="<%user.image_url%>" ng-show="showProfileImage" alt="user photo" id="propertyImage" onclick="$('#propImages').trigger('click');"/><br />--}}

					<a class="upload-link" href="#" onclick="$('#propImages').trigger('click');">
						Add Photos
					</a>
					<input id="propImages"
						   type="file"
						   accept="image/*"
						   multiple
						   image="images4"
						   resize-max-height="100"
						   resize-max-width="100"
						   style="display: none"
						   resize-quality="0.9"
						   ng-model="prop_images"
					/>
					</br>

				</div><br>

				<img ng-repeat="img in images4"  ng-attr-src="<% img.resized.dataURL %>" type="<% img.file.type %>"/>
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
									<input type="radio" name="purpose-select" value="rent" required id="purpose-select" ng-model="purpose" />
									<span>For rent</span>
								</label>
							</div>

							<div class="select-filter">
								<label>
									<input type="radio" name="purpose-select" value="sale" required id="purpose-select" ng-model="purpose" />
									<span>For Sale</span>
								</label>
							</div>
						</div>

						<div class="col-sm-6">
							<div class="select-filter">
								<label>
									<input type="radio" name="type-select" value="home" required id="type-select" ng-model="type" />
									<span>Home</span>
								</label>
							</div>

							<div class="select-filter">
								<label>
									<input type="radio" name="type-select" value="plot" required id="type-select" ng-model="type" />
									<span>Plot</span>
								</label>
							</div>

							<div class="select-filter">
								<label>
									<input type="radio" name="type-select" value="commercial" required id="type-select" ng-model="type" />
									<span>Commercial</span>
								</label>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="select-filter">
								<label>
									<input type="radio" name="category-select" value="single" required id="category-select" ng-model="category" />
									<span>Single Person</span>
								</label>
							</div>

							<div class="select-filter">
								<label>
									<input type="radio" name="category-select" value="family" required id="category-select" ng-model="category"/>
									<span>Family</span>
								</label>
							</div>

							<div class="select-filter">
								<label>
									<input type="radio" name="category-select" value="event" required id="category-select" ng-model="category"/>
									<span>Events</span>
								</label>
							</div>
						</div>

						<div class="col-sm-6">
							<div class="nr-filter">
								<p class="caption">Baths</p>
								<div class="block">
									<span class="action substract">-</span>
									<input type="text" class="nr-only" required value="0" id="bath"/>
									<span class="action add">+</span>
								</div>
							</div>

							<div class="nr-filter">
								<p class="caption">Beds</p>
								<div class="block">
									<span class="action substract">-</span>
									<input type="text" class="nr-only" required value="0" id="bed"/>
									<span class="action add">+</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-md-12">
				<div class="check-option">
					<label>
						<input type="checkbox" value="false" name="parking" ng-model="park"/>
						<span>Parking</span>
					</label>
				</div>

				<div class="check-option">
					<label>
						<input type="checkbox" value="false" name="air-conditioning" ng-model="ac"/>
						<span>Air conditioning</span>
					</label>
				</div>

				<div class="check-option">
					<label>
						<input type="checkbox" value="false" name="swimming-pool" ng-model="swim"/>
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
						<input type="checkbox" value="false" name="balcony" ng-model="balcony"/>
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

@section('custom-scripts')



@stop