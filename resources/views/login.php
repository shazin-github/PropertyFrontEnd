			<!-- Login Form -->
			<div class="login-form-popup">
				<div class="login-form" id="login-popup">
					<div class="brand-wrapper">
						<img src="img/brand.png" alt="login brand" />
					</div>

					<form id="login-form" ng-app="app" ng-controller="userController" ng-submit="login()">
						<div class="alert alert-danger" role="alert"><% user.loginErrors %></div>
						<input class="js-input" type="text" placeholder="Email" ng-model="user.email"/>
						<input class="js-input" type="password" placeholder="Password" ng-model="user.password" />
						<input type="submit" value="Login" class="submit-button"/>

						<div class="options">
							<label>
								<input type="checkbox" />
								<span>Remember me</span>
							</label>
							<a class="remember-password" href="index.html#">Forgotten the password</a>
						</div>
					</form>

					<form id="register-form" ng-controller="userController" ng-submit="register()">
						<div id="alerts_" class="alert alert-danger" role="alert"><% registerErrors %></div>
						<input class="js-input" type="text" placeholder="First Name" ng-model="userReg.firstname" />
						<input class="js-input" type="text" placeholder="Last Name" ng-model="userReg.lastname" />
						<input class="js-input" type="text" placeholder="Email" ng-model="userReg.email" />
						<input class="js-input" type="password" placeholder="Password" ng-model="userReg.password"/>
						<input class="js-input" type="password" placeholder="Confirm password" ng-model="userReg.confirmPassword"/>
						<input type="submit" value="Register" class="submit-button" />
					</form>

					<!-- <div class="sign-in-options">
						<span>Sign in</span>
						<a class="facebook" href="my-profile.html">Facebook</a>
						<a class="google" href="my-profile.html">Google</a>
					</div> -->

					<p class="register-link"><i>Don't have an account?</i> <a href="index.html#" class="register-btn">Register here</a></p>
				</div>
			</div>