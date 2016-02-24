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
        	return $http.post("login");
        }

        this.register = function(data){
        	console.log('Scope from service=', data);
        }
    });
});