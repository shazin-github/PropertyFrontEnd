			<!-- Login Form -->
			<div class="login-form-popup" ng-controller="userController as vm">
				<div id="success_alert" class="alert alert-success" role="alert"></div>
				<div class="login-form" id="login-popup">
					<div class="brand-wrapper">
						<img src="/img/brand.png" alt="login brand" />
					</div>

					<form id="login-form"   ng-submit="vm.login()">
						<div class="alert alert-danger" role="alert"><% vm.user.loginErrors %></div>
						<div id="success_alert" class="alert alert-success" role="alert"></div>
						<input class="js-input" type="text" placeholder="Email" ng-model="vm.user.email"/>
						<input class="js-input" type="password" placeholder="Password" ng-model="vm.user.password" />
						<input type="submit" value="Login" class="submit-button"/>

						<div class="options">
							<label>
								<input type="checkbox" />
								<span>Remember me</span>
							</label>
							<a class="remember-password" href="index.html#">Forgotten the password</a>
						</div>
					</form>

					<form id="register-form" ng-submit="vm.register()">
						<div id="alerts_" class="alert alert-danger" role="alert"><% registerErrors %></div>
						<input class="js-input" type="text" placeholder="First Name" ng-model="vm.userReg.firstname" />
						<input class="js-input" type="text" placeholder="Last Name" ng-model="vm.userReg.lastname" />
						<input class="js-input" type="text" placeholder="Email" ng-model="vm.userReg.email" />
						<input class="js-input" type="password" placeholder="Password" ng-model="vm.userReg.password"/>
						<input class="js-input" type="password" placeholder="Confirm password" ng-model="vm.userReg.confirmPassword"/>
						<div style="margin-top: 15px;">
							<h5>Select User </h5>
							<div class="select-filter" >
								<label style="margin-right: 10px;">
									<input type="radio" name="userType-select" value="agent" required id="userType-select" ng-model="vm.userType" ng-click="selectedUser('agent')" />
									<span> Agent</span>
								</label>
								<label style="margin-right: 10px;">
									<input type="radio" name="userType-select" value="seller" required id="userType-select" ng-model="vm.userType" ng-click="selectedUser('seller')" />
									<span> Seller</span>
								</label>
								<label style="margin-right: 10px;">
									<input type="radio" name="userType-select" value="buyer" required id="userType-select" ng-model="vm.userType" ng-click="selectedUser('buyer')" />
									<span> Buyer</span>
								</label>
							</div>
						</div>
						<div ng-if="!vm.isAgent" style="margin-top: 15px;">
							<h5>User Plan </h5>
							<label style="margin-right: 10px;">
								<input type="radio" name="userPlan-select" value="0" required id="userPlan-select" ng-model="vm.userPlan" ng-click="selectedPlan(0)" />
								<span>Trail:Free </span>
							</label>
						</div>
						<div ng-if="vm.isAgent" style="margin-top: 15px;">
							<h5>User Plan </h5>
							<div class="select-filter" ng-repeat="p in vm.planList" >
								<label >
									<input type="radio" name="userPlan-select" value="<% p.id %>" required id="userPlan-select" ng-model="vm.userPlan" ng-click="selectedPlan(p.id)" />
									<span><% p.name %>: <% p.price %> </span>
								</label>
							</div>
						</div>
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