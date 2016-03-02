define(['services/searchService', 'services/geolocatorService', 'services/searchAutoService', 'services/markerService'], function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('searchController', ['$scope', '$rootScope', 'searchService', 'geolocatorService', 'searchAutoService', 'markerService',
        function($scope, $rootScope, searchService, geolocatorService, searchAutoService, markerService) {
            var map_center = new google.maps.LatLng(-34.397, 150.644);
            var mapOptions = {
                zoom: 10,
                //center: map_center,
                styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-40},{"lightness":10}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]}]
            }
            var map = new google.maps.Map(document.getElementById('home_map'), mapOptions);
            $scope.listings = "";
        //map_center = geolocatorService.geoLocate(map, $scope);
            $("#overlay").show();
            searchService.getSearchAll().then(function(response) {
                if(response.data.success) {
                    var prop_data = response.data.data;
                    $scope.listings = prop_data;
                    markerService.getMarker(prop_data, map);
                }
                $("#overlay").hide();
            }, function(response) {
            });
        searchAutoService.getAuto();

        $scope.searchProperty = function() {
            //$('#overlay').show();
            searchService.getSearch().then(function(response) {
                if(response.data.success) {
                    var prop_data = response.data.data;
                    $scope.$apply(function () {
                        $scope.listings = prop_data;
                    });
                    markerService.getMarker(prop_data, map);
                }
            }, function(response) {
            });
        }
    }]);
});