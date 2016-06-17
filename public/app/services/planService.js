define(function(){
    angular
        .module('coreModule')
        .service('planService' , planService);

    planService.$inject = ['$http', '$q'];

    function planService($http,$q){
        return {
            getPlanList:getPlanList,
            getPlanDetail:getPlanDetail
        };

        function getPlanList(){
            var deferred = $q.defer();
            return $http.get("user/getPlanList")
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

        function getPlanDetail(data){
            var deferred = $q.defer();
            return $http.get("user/getPlanDetail/"+data)
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
