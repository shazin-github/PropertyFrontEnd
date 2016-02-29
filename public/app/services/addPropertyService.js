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
            return $http.post('property', data).then(function successCallback(response) {
                console.log(response);
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                console.log(response);
                deffered.reject(response);
                return deffered.promise;
            });

        };
    }]);
});