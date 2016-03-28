define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('stateService', function($http, $q) {
        this.getstate = function(){
            var deferred = $q.defer();
            $http.get("property/getstate").then(function(res){
                deferred.resolve(res);
            },function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        }
    });
});