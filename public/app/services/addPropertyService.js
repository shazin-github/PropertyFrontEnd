define(function(){
   angular
       .module('coreModule')
       .service('addPropertyService' , addPropertyService);

    addPropertyService.$inject = ['$http', '$q']; // injecting dependencies


    function addPropertyService($http, $q){
        return{
            addProperty:addProperty,
            TestService:TestService,
            gettypesService:gettypesService,
            getcategoryService:getcategoryService,
        };

        function addProperty(location, property, feature, seller){
            var deffered = $q.defer();

            var data = {
                location: location,
                property: property,
                feature: feature,
                seller: seller
            };

            return $http.post('property/add', data)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deffered.resolve(response);
                return deffered.promise;
            }

            function errorCallback(response){
                deffered.reject(response);
                return deffered.promise;
            }

        }

        function TestService(){

            var deffered = $q.defer();

            return $http.get('property/purposeList')
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deffered.resolve(response);
                return deffered.promise;
            }

            function errorCallback(response){
                deffered.reject(response);
                return deffered.promise;
            }
        }

        function gettypesService(){

            var deffered = $q.defer();

            return $http.get('property/typeList')
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deffered.resolve(response);
                return deffered.promise;
            }

            function errorCallback(response){
                deffered.reject(response);
                return deffered.promise;
            }
        }

        function getcategoryService(){

            var deffered = $q.defer();

            return $http.get('property/categoryList')
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deffered.resolve(response);
                return deffered.promise;
            }

            function errorCallback(response){
                deffered.reject(response);
                return deffered.promise;
            }
        }
    }
});
