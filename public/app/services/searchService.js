define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('searchService', ['$http', '$q', function($http, $q) {

        this.getSearch = function(data) {
            var deffered = $q.defer();
            var data_value =  {
                purpose: data.purpose || '',
                bedroom: data.bedroom || '',
                bathroom: data.bathroom || '',
                latitude: data.lat,
                longitude: data.lng,
            };

            console.log(data);
            return $http.post('property/search', data_value).then(function successCallback(response) {
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                deffered.reject(response);
                return deffered.promise;
            });
        };

        this.getSearchAll = function() {
            var deffered = $q.defer();
            return $http.get('property/all').then(function successCallback(response) {
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                deffered.reject(response);
                return deffered.promise;
            });
        };

        this.getRecent = function() {
            var deffered = $q.defer();
            return $http.get('property/recent').then(function successCallback(response) {
                console.log(response);
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                deffered.reject(response);
                return deffered.promise;
            });
        };

        this.mostView = function() {
            var deffered = $q.defer();
            return $http.get('property/mostview').then(function successCallback(response) {
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                deffered.reject(response);
                return deffered.promise;
            });
        };
    }]);
});