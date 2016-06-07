define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('cityService', function($http, $q) {
        this.getAllCities = function(){
            var deferred = $q.defer();
            $http.get("property/getCity").then(function(res){
                deferred.resolve(res);
            },function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        }
    });
});