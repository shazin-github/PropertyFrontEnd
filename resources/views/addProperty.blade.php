<div class="user-account-tabs">
	<!-- Menu Controlls -->
	<ul class="heading">
		{{--<li><a class="profile" href="#profile"><span>My Profile</span></a></li>--}}
		<li><a class="submit"  ><span>Submit new property</span></a></li>
		{{--<li><a class="properties" href="#properties"><span>My Properties</span></a></li>--}}

	</ul>
</div>

	<div id="submit" ng-controller="addPropertyController" ng-init="initiate()" >

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

				<div cd-dropdown option ="statelist" title="State" ng-model="state"></div>

				<div cd-dropdown option ="citylist" title="City" ng-model="city"></div>


				{{--<input type="text" class="js-input" required placeholder="Address (street/ house/ ap.)" ng-init="addNewLocation()" id="address" ng-model="address"/>--}}

				<input type="text" class="js-input" id="addresss" placeholder="Address (street/ house/ ap.)"  ng-autocomplete ng-model="address" />

				<div class="row row-fit-10">
					<div class="col-sm-12">
						<input type="text" class="js-input nr-only" required placeholder="Price $" ng-model="price"/>
					</div>
					<div class="col-sm-12">
						<div class="col-sm-12">
							<input type="text" class="js-input nr-only" required placeholder="Area" ng-model="area"/>
						</div>
						<div class="col-sm-12">
							<div class="select-box-margin" cd-dropdown option ="arealist" title="Area Type" ng-model="area_type"></div>

						</div>

					</div>
				</div>
			</div>

			<div class="col-md-13 col-lg-offset-1 col-lg-12">
				<div class="photo-upload">

					<input class="button upload-link" type="button" onclick="$('#propImages').trigger('click');"  value="Add Photos" />
					<input id="propImages"
						   type="file"
						   accept="image/*"
						   multiple
						   image="prop_images"
						   resize-max-height="100"
						   resize-max-width="100"
						   style="display: none"
						   resize-quality="0.9"
						   ng-model="inputFiles"
					/>
					</br>

				</div><br>

				<img ng-repeat="img in prop_images"  ng-attr-src="<% img.resized.dataURL %>" type="<% img.file.type %>"/>
				<div class="location-on-map">
					<div class="map-canvas" id="location_map"></div>
					<input type="hidden" ng-value="<% latitude %>" ng-model="latitude" />
					<input type="hidden" ng-value="<%longitude%>" ng-model="longitude" />
				</div>
			</div>
		</div>

		<div class="row comodities">
			<div class="col-md-12">
				<div class="row">
					<div class="filters">

						<cd-radio-button option="purpose_list" title="purpose" ng-model="purpose" ></cd-radio-button>
						<cd-radio-button option="types_list" title="type" ng-model="type"></cd-radio-button>
						<cd-radio-button option="category_list" title="category" ng-model="category"></cd-radio-button>

						<div class="col-sm-6">
							<div class="nr-filter " cd-add-subtract title="Baths" option="num_of_baths"></div>

							<div class="nr-filter " cd-add-subtract  option="num_beds" title="Beds" ></div>

						</div>
					</div>
				</div>
			</div>

			<div class="col-md-12">
				<div class="check-option">
					<label>
						<input type="checkbox" value="false" name="parking" ng-model="park" />
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