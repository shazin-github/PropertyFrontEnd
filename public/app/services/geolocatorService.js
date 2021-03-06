define(['services/searchService', 'services/markerService'], function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('geolocatorService',['searchService', 'markerService', '$timeout', function(searchService, markerService, $timeout) {
        this.geoLocate = function(map, $rootScope) {
            //$('#overlay').show();
            var map_center = "";
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
                $timeout(function() {
                    if(map_center == "") showIpPosition();
                }, 3000)
            } else {
                showIpPosition();
            }
            function showIpPosition() {
                $.get("http://ipinfo.io", function(response) {
                    ip_loc = response.loc;
                    //console.log(ip_loc);
                    var aCenter = ip_loc.split(",");
                    map_center = new google.maps.LatLng(aCenter[0], aCenter[1]);
                    if(map == "") {
                        $("#search_lat").val(aCenter[0]);
                        $("#search_lng").val(aCenter[1]);
                    } else {
                        map.setCenter(map_center);
                        $("#search_lat").val(aCenter[0]);
                        $("#search_lng").val(aCenter[1]);
                    }
                    searchService.getSearch().then(function(response) {
                        if(response.data.success) {
                            var prop_data = response.data.data;
                            $rootScope.listings = prop_data;
                            markerService.getMarker(prop_data, map);
                        }
                    }, function(response) {
                    });
                }, "jsonp");
            }

            function showPosition(position) {
                console.log(position);
                map_center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                if(map == "") {
                    $("#search_lat").val(position.coords.latitude);
                    $("#search_lng").val(position.coords.longitude);
                } else {
                    map.setCenter(map_center);
                    $("#search_lat").val(position.coords.latitude);
                    $("#search_lng").val(position.coords.longitude);
                }
                searchService.getSearch().then(function(response) {
                    if(response.data.success) {
                        var prop_data = response.data.data;
                        $rootScope.listings = prop_data;
                        console.log($rootScope.listings);
                        markerService.getMarker(prop_data, map);
                    }
                }, function(response) {
                });
            }
            return map_center;
        };
    }]);
});