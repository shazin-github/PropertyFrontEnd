define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('userService', function($http) {
        
      //   this.login = function(data){
      //   	$http.post("login")
		    // .then(function(response) {
		    // 	console.log('Resp:', response);
		    // 	return response;
		    // });
      //   }

      	this.login = function(data){
        	return $http.post("user/login", data);
        }

        this.logout = function(){
        	return $http.get("user/logout");
        }

        this.register = function(data){
        	return $http.post("user/register", data);
        }

        this.getProfile = function(){
        	return $http.get("user/profile");
        }

        this.updateProfile = function(data){
        	return $http.post("user/profile", data);
        }
    });
});