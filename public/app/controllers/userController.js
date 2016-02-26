define(['services/userService'], function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('userController', ['$scope', 'userService', function($scope, userService) {
        $scope.user = {};
        
        $scope.login = function(){
        	$('#overlay').show();
	        userService.login($scope.user).then(function(resp){
	        	$('#overlay').hide();
	        	if(resp.data.success){
	        		$('.alert-danger').hide();
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
	        		$('.alert-danger').hide();
	        		location.href= 'my-profile';
	        	}
	        	else{
	        		$scope.registerErrors = resp.data.msg;
	        		echoErrors('register-form', resp.data.msg);
	        	}
	        });
        }
    }]);
});