<div class="user-account-tabs">
	<!-- Menu Controlls -->
	<ul class="heading">
		<li><a class="profile" href="my-profile#/"><span>My Profile</span></a></li>
		{{--<li><a class="submit"  ><span>Submit new property</span></a></li>--}}
		{{--<li><a class="properties" href="#properties"><span>My Properties</span></a></li>--}}

	</ul>
</div>

<div id="profile"  ng-controller="userController as vm" ng-init="vm.initProfile()">
	<form class="update-form" id="profileForm" ng-submit="vm.updateProfile()">
		<input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
		<div class="row">
			<div class="col-md-11">
				<div id="alerts_" class="alert alert-danger" role="alert"><% user.profileErrors %></div>
				<div id="success_alert" class="alert alert-success" role="alert"></div>
				<input type="text" class="js-input" placeholder="Enter your First Name" required ng-model="vm.user.firstname" />
				<input type="text" class="js-input" placeholder="Enter your Last Name" ng-model="vm.user.lastname" />
				<input type="text" class="js-input" placeholder="Enter your Email" ng-model="vm.user.email" />

				<div class="row row-fit-10">
					<div class="col-sm-12">
						<input type="password" class="js-input" placeholder="Password" ng-model="vm.user.password"/>
					</div>
					<div class="col-sm-12">
						<input type="password" class="js-input" placeholder="Repeat the password" ng-model="vm.user.confirmPassword"/>
					</div>
				</div>
			</div>
			
			<div class="col-md-10 col-md-offset-1">
				<div class="photo-upload">
					<a href="" class="upload-btn"  onclick="$('#profilePic').trigger('click');">
						<i class="icon icon-folder4"></i>
					</a>

					<img ng-attr-src="<%vm.user.image_url%>" ng-show="vm.showProfileImage" id="profilePicImage" alt="user photo"  onclick="$('#profilePic').trigger('click');"/><br />
					<a class="upload-link" href="" onclick="$('#profilePic').trigger('click');">
						Add your photo
					</a>


					<input id="profilePic"
						   type="file"
						   accept="image/*"
						   image="vm.image2"
						   resize-max-height="300"
						   resize-max-width="250"
						   resize-quality="0.7"
						   imag="vm.user.image_url"
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
							<input type="text" class="js-input" placeholder="Phone" ng-model="vm.user.phone"/>
						</div>
						<div class="social-input facebook">
							<input type="text" class="js-input social facebook" placeholder="Facebook" ng-model="vm.user.facebook"/>
						</div>
					</div>
					<div class="col-sm-12">
						<div class="social-input skype">
							<input type="text" class="js-input" placeholder="Skype" ng-model="vm.user.skype"/>
						</div>
						<div class="social-input twitter">
							<input type="text" class="js-input" placeholder="Twitter" ng-model="vm.user.twitter"/>
						</div>
					</div>

				</div>
			</div>

			<div class="col-sm-13">
				<textarea class="js-input" placeholder="Other information"></textarea>
			</div>
		</div>

		<input class="button theme-button-2" type="submit" value="Update your profile" />
	</form>
	<div ng-if="vm.userpackage.planWidget">

		<p  class="plan-info" >Your Plan Information</p>
		<div class="row row-fit-10">
			<div class="col-sm-10">
				<div class="row row-fit-10">
					<div class="tabs-body plan-outter-div">

					<div class="plan profile-plan" >
						<h1 class="title"><% vm.userpackage.planDetail.name %></h1>
						<div class="plan-price">
							<p class="no-gap"><%vm.userpackage.planDetail.price %></p></div>

						<div class="row no-gap padded">
							<p class="plan-text"><% vm.userpackage.planDetail.summery %></p>
							<a href="/plan-widget" class="plan-btn">Change Your Plan</a>
						</div>
					</div>
				</div>
				</div>

			</div>
			<div class="col-sm-11" style="margin-top: 130px !important;" >
				<h3>Plan Description</h3>
				<p><% vm.userpackage.planDetail.description %></p>
			</div>
			<div class="col-sm-4" style="margin-top: 130px !important;" >
				<div ng-if="!vm.user.is_agent" class="row no-gap padded">
					<a href="javascript:;" class="plan-btn" ng-click="vm.changeUserType()">Switch To Agent</a>
				</div>
			</div>
		</div>
	</div>
</div>