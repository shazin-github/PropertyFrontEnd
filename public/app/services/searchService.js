define(function() {
    angular
        .module('coreModule')
        .service('searchService',searchService);

    searchService.$inject = ['$http', '$q'];

    function searchService($http,$q){
        return {
            getSearch:getSearch,
            getSearchAll:getSearchAll,
            getRecent:getRecent,
            mostView:mostView,
            getPurposeList:getPurposeList
        };

        function getSearch(data){
            var deffered = $q.defer();
            var dataArray =  {
                purpose: data.purpose || '',
                bedroom: data.bedroom || '',
                bathroom: data.bathroom || '',
                latitude: data.lat,
                longitude: data.lng
            };
            console.log(dataArray);
            return $http.post('property/search', dataArray)
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

        function getSearchAll(){

            var deffered = $q.defer();
            return $http.get('property/all')
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

        function getRecent(){
            var deffered = $q.defer();
            return $http.get('property/recent')
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

        function mostView(){
            var deffered = $q.defer();
            return $http.get('property/mostview')
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

        function getPurposeList(){

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
    }
});