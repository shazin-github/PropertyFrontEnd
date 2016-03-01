define(['services/userService'], function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('userController', ['$scope', 'userService', function($scope, userService) {
        $scope.user = {};
        
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
	        		location.href= 'my-profile';
	        	}
	        	else{
	        		$scope.registerErrors = resp.data.msg;
	        		echoErrors('register-form', resp.data.msg);
	        	}
	        });
        }

        $scope.initProfile = function(){
        	$('#overlay').show();
        	userService.getProfile().then(function(resp){
        		$('#overlay').hide();
        		$scope.user = resp.data.msg;
        		$scope.user.confirmPassword = resp.data.msg.password;
        	});
        }

        $scope.updateProfile = function(){
        	//alert($scope.user+' has password'+$scope.password);
        	$('#overlay').show();
        	userService.updateProfile($scope.user).then(function(resp){
        		$('#overlay').hide();
	        	if(resp.data.success){
	        		echoSuccess('profileForm', resp.data.msg);
	        	}
	        	else{
	        		$scope.profileErrors = resp.data.msg;
	        		echoErrors('profileForm', resp.data.msg);
	        	}
	        });
        }
    }]);
});