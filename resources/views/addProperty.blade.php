<div class="user-account-tabs">
	<!-- Menu Controlls -->
	<ul class="heading">
		{{--<li><a class="profile" href="#profile"><span>My Profile</span></a></li>--}}
		<li><a class="submit"  ><span>Submit new property</span></a></li>
		{{--<li><a class="properties" href="#properties"><span>My Properties</span></a></li>--}}

	</ul>
</div>

	<div id="submit" ng-controller="addPropertyController as vm " >

	<form class="submit-form" method="POST" name="propertyForm" ng-submit="vm.addProperty()">
		<input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
		<div class="row">
			<div class="col-md-11">
				<div ng-class="vm.status ? 'alert-success' : 'alert-danger'" id="resultDiv"><% vm.msg %></div>
				<input type="text" class="js-input" placeholder="Title"  required name="title" ng-model="vm.title"/>
				<textarea class="js-input" placeholder="Description" required ng-model="vm.description"></textarea>

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
				<input type="text" class="js-input" placeholder="Country" id="country" disabled="true" ng-model="vm.country"/>

				<div cd-dropdown option ="vm.stateList" title="State" ng-model="vm.state"></div>

				<div cd-dropdown option ="vm.cityList" title="City" ng-model="vm.city"></div>


				{{--<input type="text" class="js-input" required placeholder="Address (street/ house/ ap.)" ng-init="addNewLocation()" id="address" ng-model="address"/>--}}

				<input type="text" class="js-input" id="addresss" placeholder="Address (street/ house/ ap.)"  ng-autocomplete  ng-model="vm.address" latitude="vm.latitude" longitude="vm.longitude"  />

				<div class="row row-fit-10">
					<div class="col-sm-12">
						<input type="text" class="js-input nr-only" required placeholder="Price $" ng-model="vm.price"/>
					</div>
					<div class="col-sm-12">
						<div class="col-sm-12">
							<input type="text" class="js-input nr-only" required placeholder="Area" ng-model="vm.area"/>
						</div>
						<div class="col-sm-12">
							<div class="select-box-margin" cd-dropdown option ="vm.areaList" title="Area Type" ng-model="vm.areaType"></div>

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
						   image="vm.propertyImages"
						   resize-max-height="100"
						   resize-max-width="100"
						   style="display: none"
						   resize-quality="0.9"
						   ng-model="vm.inputFiles"
					/>
					</br>

				</div><br>

				<img ng-repeat="img in vm.propertyImages"  ng-attr-src="<% img.resized.dataURL %>" type="<% img.file.type %>"/>
				<div class="location-on-map">
					<div class="map-canvas" id="location_map"></div>
					<input type="hidden" ng-value="<% vm.latitude %>" ng-model="vm.latitude" />
					<input type="hidden" ng-value="<%vm.longitude%>" ng-model="vm.longitude" />
				</div>
			</div>
		</div>

		<div class="row comodities">
			<div class="col-md-12">
				<div class="row">
					<div class="filters">

						<cd-radio-button option="vm.purposeList" title="purpose" ng-model="vm.purpose" ></cd-radio-button>
						<cd-radio-button option="vm.typeList" title="type" ng-model="vm.type"></cd-radio-button>
						<cd-radio-button option="vm.categoryList" title="category" ng-model="vm.category"></cd-radio-button>

						<div class="col-sm-6">
							<div class="nr-filter " cd-add-subtract title="Baths" option="vm.numberOfBaths"></div>

							<div class="nr-filter " cd-add-subtract  option="vm.numberOfBeds" title="Beds" ></div>

						</div>
					</div>
				</div>
			</div>

			<div class="col-md-12">
				<div class="check-option">
					<label>
						<input type="checkbox" value="false" name="parking" ng-model="vm.park" />
						<span>Parking</span>
					</label>
				</div>

				<div class="check-option">
					<label>
						<input type="checkbox" value="false" name="air-conditioning" ng-model="vm.ac"/>
						<span>Air conditioning</span>
					</label>
				</div>

				<div class="check-option">
					<label>
						<input type="checkbox" value="false" name="swimming-pool" ng-model="vm.swim"/>
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
						<input type="checkbox" value="false" name="balcony" ng-model="vm.balcony"/>
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