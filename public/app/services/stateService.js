define(function() {
    angular
        .module('coreModule')
        .service('stateService',stateService);

    stateService.$inject =  ['$http', '$q'];

    function stateService($http, $q){

        return {
            getAllStates:getAllStates
        };

        function getAllStates(){
            var deferred = $q.defer();
            return $http.get("property/getstate")
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