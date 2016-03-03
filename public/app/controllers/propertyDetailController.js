define(['services/propertyService'], function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('propertyDetailController', ['$scope', '$http', '$q', 'propertyService', function($scope, $http, $q, propertyService) {
        $scope.id = $("#property_id").val();
        var map_center = new google.maps.LatLng(-34.397, 150.644);
        var mapOptions = {
            zoom: 15,
            center: map_center,
            styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-40},{"lightness":10}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]}]
        }
        var map = new google.maps.Map(document.getElementById('property_map'), mapOptions);
        $scope.getPropertyService = function($id) {
            var deffered = $q.defer();
            return $http.get('detail/'+$scope.id).then(function successCallback(response) {
                console.log(response);
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                console.log(response);
                deffered.reject(response);
                return deffered.promise;
            });
        };

        $scope.getProperty = $scope.getPropertyService($scope.id).then(function(response) {
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
            var request = {
                location: new_center,
                radius: 10000,
                types: ['school']
            };

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);

            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for(i in results) {
                        var school_lat = results[i].geometry.location.lat();
                        var school_lng = results[i].geometry.location.lng();
                        results[i].distance = distance(prop_data.latitude, prop_data.longitude, school_lat, school_lng, 'K');
                        if(results[i].rating == undefined) results[i].rating = 5;
                    }
                    $scope.$apply(function () {
                        $scope.schools = results;
                    });
                    console.log($scope.schools);
                } else {
                    console.log("No School Found");
                }
            }

            function distance(lat1, lon1, lat2, lon2, unit) {
                var radlat1 = Math.PI * lat1/180
                var radlat2 = Math.PI * lat2/180
                var theta = lon1-lon2
                var radtheta = Math.PI * theta/180
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                dist = Math.acos(dist)
                dist = dist * 180/Math.PI
                dist = dist * 60 * 1.1515
                if (unit=="K") { dist = dist * 1.609344 }
                if (unit=="N") { dist = dist * 0.8684 }
                return parseFloat(dist).toFixed(2)+" km";
            }
            $scope.date = new Date();
            //console.log($scope.date);
        }, function(response) {

        });
        $scope.getProperty;
    }]);
});