define(['services/userService'], function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('userController', ['$scope', 'userService', function($scope, userService) {
        $scope.user = {};
        $scope.user.showLoginError = false;
        
        $scope.login = function(){
	        userService.login($scope.user).then(function(resp){
	        	if(resp.data.success){
	        		$scope.user.showLoginError = false;
	        		location.reload();
	        	}
	        	else{
	        		console.log('Response from service=', resp);
	        		$scope.user.loginErrors = resp.data.error;
	        		$scope.user.showLoginError = true;
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