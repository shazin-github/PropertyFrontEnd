define([
    'services/locationService',
    'services/propertyService',
    'services/featureService',
    'services/addPropertyService'
],
    function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('addPropertyController', ['$scope', 'locationService' ,'featureService', 'propertyService',  'addPropertyService', function($scope, locationService, featureService, propertyService, addPropertyService) {
        $scope.country = "Pakistan";

        $scope.addProperty = function() {
            $('#overlay').show();
            $scope.address = $("#address").val();
            $scope.latitude = $("#latitude").val();
            $scope.longitude = $("#longitude").val();
            $scope.city = $("#city").val();
            $scope.state = $("#state").val();
            $scope.location = locationService.getLocation($scope.country, $scope.state, $scope.city, $scope.address,
                $scope.zip, $scope.latitude, $scope.longitude);

            $scope.property = propertyService.getProperty($scope.price, $scope.area, $scope.description, $scope.purpose,
                $scope.type, $scope.category);

            $scope.bed = $("#bed").val();
            $scope.bath = $("#bath").val();
            $scope.feature = featureService.getFeature($scope.bed, $scope.bath, $scope.park, $scope.ac,
                $scope.swim, $scope.balcony);

            $scope.seller = 0;
            addPropertyService.addProperty($scope.location, $scope.property, $scope.feature,
                $scope.seller).then(function(response) {
                $scope.status = response.data.success;
                $scope.msg = response.data.msg;
                console.log($scope.status);
                $('#overlay').hide();
                $('html, body').animate({'scrollTop': $("#resultDiv").offset().top-100}, 500);
            }, function(response) {
                $scope.status = response.data.success;
                $scope.msg = response.data.msg;
                console.log($scope.status);
                $('#overlay').hide();
                $('html, body').animate({'scrollTop': $("#resultDiv").offset().top-100}, 500);
            });
        };
    }]);
});