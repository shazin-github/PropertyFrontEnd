define(['services/userService'], function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('userController', ['$scope', 'userService', function($scope, userService) {
        $scope.user = {};
        
        $scope.login = function(){
	        userService.login($scope.user).then(function(resp){
	        	if(resp.data.success){
	        		$('.alert-danger').hide();
	        		location.reload();
	        	}
	        	else{
	        		console.log('Response from service=', resp);
	        		$scope.user.loginErrors = resp.data.msg;
	        		$('.alert-danger').show();
	        	}
	        });
        }

        $scope.logout = function(){
        	userService.logout().then(function(resp){
	        	if(resp.data.success){
	        		location.href = '/';
	        	}
	        });	
        }

        $scope.userReg = {};
        $scope.register = function(){
        	//alert($scope.user+' has password'+$scope.password);
        	userService.register($scope.userReg).then(function(resp){
	        	if(resp.data.success){
	        		$('.alert-danger').hide();
	        		location.href= 'my-profile';
	        	}
	        	else{
	        		$scope.userReg.registerErrors = resp.data.msg;
	        		echoErrors('register-form', resp.data.msg);
	        		//$('.alert-danger').show();
	        	}
	        });
        }
    }]);
});