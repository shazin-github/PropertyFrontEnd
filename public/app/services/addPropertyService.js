define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('addPropertyService', ['$http', '$q', function($http, $q) {
        this.addProperty = function(location, property, feature, seller) {
            var deffered = $q.defer();
            var data = {
                location: location,
                property: property,
                feature: feature,
                seller: seller
            };
            return $http.post('property/add', data).then(function successCallback(response) {
                //console.log(response);
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                //console.log(response);
                deffered.reject(response);
                return deffered.promise;
            });
        };

        this.TestService = function() {
            var deffered = $q.defer();
            return $http.get('property/purposeList').then(function successCallback(response) {
                //console.log(response);
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                deffered.reject(response);
                return deffered.promise;
            });
        };

        this.gettypesService = function() {
            var deffered = $q.defer();
            return $http.get('property/typeList').then(function successCallback(response) {
                //console.log(response);
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                deffered.reject(response);
                return deffered.promise;
            });
        };

        this.getcategoryService = function() {
            var deffered = $q.defer();
            return $http.get('property/categoryList').then(function successCallback(response) {
                //console.log(response);
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                deffered.reject(response);
                return deffered.promise;
            });
        };
    }]);
});