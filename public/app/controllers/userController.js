define(['services/userService'], function() {
    var coreModule = angular.module('coreModule');

    coreModule.controller('userController', ['$scope', 'userService', function($scope, userService) {

        $scope.user = {};
        $scope.showProfileImage = false;

        
        $scope.login = function(){
        	$('#overlay').show();
	        userService.login($scope.user).then(function(resp){
	        	$('#overlay').hide();
                console.log('response', resp);
	        	if(resp.data.success){
                    echoSuccess('login-form', 'Login Successful');
	        		location.reload();
	        	} else{
	        		$scope.user.loginErrors = resp.data.msg;
	        		$('.alert-danger').show();
	        	}
	        });
        }

        $scope.logout = function(){
        	$('#overlay').show();
        	userService.logout().then(function(resp){
        		$('#overlay').hide();
	        	if(resp.data.success){
	        		location.href = '/';
	        	} 
	        });	
        }

        $scope.userReg = {};

        $scope.register = function(){
        	//alert($scope.user+' has password'+$scope.password);
        	$('#overlay').show();
        	userService.register($scope.userReg).then(function(resp){
        		$('#overlay').hide();
	        	if(resp.data.success){
	        		echoSuccess('register-form', resp.data.msg);
	        		location.href= '/verification';
	        	}
	        	else{
	        		$scope.registerErrors = resp.data.msg;
	        		echoErrors('register-form', resp.data.msg);
	        	}
	        });
        }

        $scope.initProfile = function(){
            $scope.user.image_url = "img/profile-avatar.jpg";
        	$('#overlay').show();
        	userService.getProfile().then(function(resp){
        		$('#overlay').hide();
        		$scope.user = resp.data.msg;

                if($scope.user.image_url != ''){
                    $scope.showProfileImage = !$scope.showProfileImage;
                    $('#profilePicImage').show(); // todo
                }
        		$scope.user.confirmPassword = resp.data.msg.password;
        	});

        }


        $scope.updateProfile = function() {
        	//alert($scope.user+' has password'+$scope.password);
            $('#overlay').show();

            form_data= new FormData();

            if($scope.image2 !== undefined) {

                file_data = $scope.image2.file;

                form_data.append("profilePic", file_data);

                userService.updateProfilePic(form_data).then(function(image_resp){

                    if(image_resp.data.success){

                        $scope.user.image_url = image_resp.data.image_url;
                    }

                    $scope.updateprofilefields();

                });

            }else{

                $scope.updateprofilefields();

            }

        }//$scope.updateProfile

        $scope.updateprofilefields = function(){
            //console.log($scope.user);
            userService.updateProfile($scope.user).then(function(profile_resp){
                console.log('RESO', profile_resp);
                $('#overlay').hide();
                if(profile_resp.data.success){
                    echoSuccess('profileForm', profile_resp.data.msg);
                }
                else{
                    console.log('error', profile_resp.data.msg);
                    $scope.profileErrors = profile_resp.data.msg;
                    echoErrors('profileForm', profile_resp.data.msg);
                }
            });
        }
    }]);
});