<div id="submit" ng-controller="addPropertyController">
	<form class="submit-form" method="POST" name="propertyForm" ng-submit="addProperty()">
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
					<input class="js-input no-select" type="text" required placeholder="State" id="state" ng-model="state" ng-readonly="true" />
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
					<input class="js-input no-select" type="text" required readonly value="" id="city" placeholder="City" />
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
					<label class="control-label">Add Photos</label>
					<input class="upload-link" name="filesToUpload[]" id="filesToUpload" type="file" multiple="" accept="image/*"/>
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
		<input type="hidden" id="user_id" value="1" />
		<input class="button theme-button-2" type="submit" value="Submit your property" />
		<div ng-class="$status ? 'success' : 'danger'"><% msg %></div>
	</form>
</div>