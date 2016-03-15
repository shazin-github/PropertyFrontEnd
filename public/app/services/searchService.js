define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('searchService', ['$http', '$q', function($http, $q) {
        this.getSearch = function() {
            var deffered = $q.defer();
            var data =  {
                purpose: $("#purpose").val() || "",
                bedroom: $("#bedroom").val() || "",
                bathroom: $("#bathroom").val() || "",
                latitude: $("#search_lat").val(),
                longitude: $("#search_lng").val()
            };
            return $http.post('property/search', data).then(function successCallback(response) {
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                deffered.reject(response);
                return deffered.promise;
            });
        };

        this.getSearchMini = function() {
            var deffered = $q.defer();
            var data =  {
                purpose: $("#purpose-mini").val() || "",
                bedroom: $("#bedroom-mini").val() || "",
                bathroom: $("#bathroom-mini").val() || "",
                latitude: $("#search_lat-mini").val(),
                longitude: $("#search_lng-mini").val()
            };
            return $http.post('property/search', data).then(function successCallback(response) {
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                deffered.reject(response);
                return deffered.promise;
            });
        };

        this.setMini = function() {
            $("#purpose-mini").val($("#purpose").val());
            $("#bedroom-mini").val($("#bedroom").val());
            $("#bathroom-mini").val($("#bathroom").val());
            $("#search_lat").val($("#search_lat-mini").val());
            $("#search_lng").val($("#search_lng-mini").val());
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