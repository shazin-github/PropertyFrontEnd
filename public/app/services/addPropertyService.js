define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('addPropertyService', ['$http', function($http) {
        this.addProperty = function(location, property, feature, seller) {
            var data = {
                location: location,
                property: property,
                feature: feature,
                seller: seller,
                callback: 'JSON_CALLBACK'
            };
            $http.post('property', data).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log(response);
            });
        };
    }]);
});