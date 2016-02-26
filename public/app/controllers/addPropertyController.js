define([
    'services/locationService'
],
    function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('addPropertyController', ['$scope', 'locationService', function($scope, locationService) {
        $scope.country = "Pakistan";
        $scope.addProperty = function() {
            console.log(locationService.getLocation($scope.country, $scope.state, $scope.city, $scope.address,
                $scope.zip, $scope.latitude, $scope.longitude));
        };
    }]);
});