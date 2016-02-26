define([
    'services/locationService',
    'services/propertyService',
    'services/featureService'
],
    function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('addPropertyController', ['$scope', 'locationService' ,'featureService', 'propertyService', function($scope, locationService, featureService, propertyService) {
        $scope.country = "Pakistan";

        $scope.addProperty = function() {
            $scope.address = $("#address").val();
            $scope.latitude = $("#latitude").val();
            $scope.longitude = $("#longitude").val();
            $scope.city = $("#city").val();
            $scope.state = $("#state").val();
            console.log(locationService.getLocation($scope.country, $scope.state, $scope.city, $scope.address,
                $scope.zip, $scope.latitude, $scope.longitude));

            console.log(propertyService.getProperty($scope.price, $scope.area, $scope.description, $scope.purpose,
                $scope.type, $scope.category));

            $scope.bed = $("#bed").val();
            $scope.bath = $("#bath").val();
            console.log(featureService.getFeature($scope.bed, $scope.bath, $scope.park, $scope.ac,
                $scope.swim, $scope.balcony));
        };
    }]);
});