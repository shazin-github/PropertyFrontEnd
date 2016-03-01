define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('searchService', ['$http', '$q', function($http, $q) {
        this.getSearch = function() {
            var deffered = $q.defer();
            var data =  {
                purpose: $("#purpose").val(),
                bedroom: $("#bedroom").val(),
                bathroom: $("#bathroom").val(),
                latitude: $("#search_lat").val(),
                longitude: $("#search_lng").val()
            };
            return $http.post('search', data).then(function successCallback(response) {
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                deffered.reject(response);
                return deffered.promise;
            });
        };
    }]);
});