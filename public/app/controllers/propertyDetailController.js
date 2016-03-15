define(['services/propertyService' ,'services/schoolService'], function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('propertyDetailController', ['$scope', '$http', '$q', 'propertyService', 'schoolService', function($scope, $http, $q, propertyService, schoolService) {
        $("#overlay").show();
        $scope.id = $("#property_id").val();
        var map_center = new google.maps.LatLng(-34.397, 150.644);
        var mapOptions = {
            zoom: 15,
            center: map_center,
            styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-40},{"lightness":10}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]}]
        }
        var map = new google.maps.Map(document.getElementById('property_map'), mapOptions);

        $scope.getProperty = propertyService.getPropertyDetail($scope.id).then(function(response) {
            var prop_data = response.data.data[0];
            $scope.image_url = prop_data.image_url;
            $scope.title = prop_data.title;
            $scope.address = prop_data.address;
            $scope.bedroom = prop_data.bedrooms;
            $scope.bathroom = prop_data.bathrooms;
            $scope.area = prop_data.area;
            $scope.purpose = prop_data.purpose;
            $scope.price = prop_data.price;
            $scope.utilities = JSON.parse(prop_data.utilities);
            $scope.park = $scope.utilities.parking;
            $scope.ac = $scope.utilities.ac;
            $scope.swim = $scope.utilities.swim;
            $scope.balcony = $scope.utilities.balcony;
            $scope.update_date = prop_data.updated_at;
            var new_center = new google.maps.LatLng(prop_data.latitude, prop_data.longitude);
            map.setCenter(new_center);
            var marker = new google.maps.Marker({
                position: new_center,
                map: map,
                title: prop_data.address
            });
            $scope.schools= "";
            schoolService.getSchools(map, new_center, $scope);
            $scope.date = new Date();
            //console.log($scope.date);
        }, function(response) {
            $("#overlay").hide();
        });
        $scope.getProperty;
        propertyService.addView($scope.id);
    }]);
});