<div id="profile" ng-app="app" ng-controller="userController" ng-init="initProfile()">
	<form class="update-form" ng-submit="updateUser()">
		<div class="row">
			<div class="col-md-11">
				<input type="text" class="js-input" placeholder="Enter your First Name" ng-mode="user.firstname" />
				<input type="text" class="js-input" placeholder="Enter your Last Name" ng-mode="user.lastname" />
				<input type="text" class="js-input" placeholder="Enter your Email" ng-mode="user.email" />

				<div class="row row-fit-10">
					<div class="col-sm-12">
						<input type="text" class="js-input" placeholder="Password" ng-mode="user.password"/>
					</div>
					<div class="col-sm-12">
						<input type="text" class="js-input" placeholder="Repeat the password" ng-mode="user.password"/>
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
							<input type="text" class="js-input" placeholder="Phone" ng-mode="user.phone"/>
						</div>
						<div class="social-input facebook">
							<input type="text" class="js-input social facebook" placeholder="Facebook" ng-mode="user.facebook"/>
						</div>
					</div>
					<div class="col-sm-12">
						<div class="social-input skype">
							<input type="text" class="js-input" placeholder="Skype" ng-mode="user.skype"/>
						</div>
						<div class="social-input twitter">
							<input type="text" class="js-input" placeholder="Twitter" ng-mode="user.twitter"/>
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