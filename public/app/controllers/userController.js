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
	        		location.reload();
	        	}
	        });	
        }

        $scope.userReg = {};
        $scope.register = function(){
        	//alert($scope.user+' has password'+$scope.password);
        	userService.register($scope.userReg);
        }
    }]);
});