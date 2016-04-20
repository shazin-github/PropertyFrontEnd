<div id="profile"  ng-controller="userController" ng-init="initProfile()">
	<form class="update-form" id="profileForm" ng-submit="updateProfile()">
		<input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
		<div class="row">
			<div class="col-md-11">
				<div id="alerts_" class="alert alert-danger" role="alert"><% user.profileErrors %></div>
				<div id="success_alert" class="alert alert-success" role="alert"></div>
				<input type="text" class="js-input" placeholder="Enter your First Name" required ng-model="user.firstname" />
				<input type="text" class="js-input" placeholder="Enter your Last Name" ng-model="user.lastname" />
				<input type="text" class="js-input" placeholder="Enter your Email" ng-model="user.email" />

				<div class="row row-fit-10">
					<div class="col-sm-12">
						<input type="text" class="js-input" placeholder="Password" ng-model="user.password"/>
					</div>
					<div class="col-sm-12">
						<input type="text" class="js-input" placeholder="Repeat the password" ng-model="user.confirmPassword"/>
					</div>
				</div>
			</div>
			
			<div class="col-md-10 col-md-offset-1">
				<div class="photo-upload">
					<a href="#" class="upload-btn" onclick="$('#profilePic').trigger('click');">
						<i class="icon icon-folder4"></i>
					</a>
					<img ng-attr-src="<%user.image_url%>" ng-show="showProfileImage" alt="user photo" id="profilePicImage" onclick="$('#profilePic').trigger('click');"/><br />

					<a class="upload-link" href="#" onclick="$('#profilePic').trigger('click');">
						Add your photo
					</a>


					<input id="profilePic"
						   type="file"
						   accept="image/*"
						   image="image2"
						   resize-max-height="300"
						   resize-max-width="250"
						   resize-quality="0.7"
						   style="display: none"
					/>

				</div>
			</div>
		</div>

		<p>Profile Information</p>
		<div class="row row-fit-10">
			<div class="col-sm-11">
				<div class="row row-fit-10">
					<div class="col-sm-12">
						<div class="social-input phone">
							<input type="text" class="js-input" placeholder="Phone" ng-model="user.phone"/>
						</div>
						<div class="social-input facebook">
							<input type="text" class="js-input social facebook" placeholder="Facebook" ng-model="user.facebook"/>
						</div>
					</div>
					<div class="col-sm-12">
						<div class="social-input skype">
							<input type="text" class="js-input" placeholder="Skype" ng-model="user.skype"/>
						</div>
						<div class="social-input twitter">
							<input type="text" class="js-input" placeholder="Twitter" ng-model="user.twitter"/>
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