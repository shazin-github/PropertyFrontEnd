define(function() {
    angular
        .module('coreModule')
        .service('cityService',cityService);

    cityService.$inject =  ['$http', '$q'];

    function cityService($http, $q){

        return {
            getAllCities:getAllCities
        };

        function getAllCities(){
            var deferred = $q.defer();
            return $http.get("property/getCity")
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deferred.resolve(response);
                return deferred.promise;
            }

            function errorCallback(response){
                deferred.reject(response);
                return deferred.promise;
            }
        }

    }
});