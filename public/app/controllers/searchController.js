define(['services/searchService', 'services/geolocatorService', 'services/searchAutoService', 'services/markerService'], function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('searchController', ['$scope', 'searchService', 'geolocatorService', 'searchAutoService', 'markerService',
        function($scope, searchService, geolocatorService, searchAutoService, markerService) {
            var map_center = new google.maps.LatLng(31.55460609999999, 74.35715810000001);
            var mapOptions = {
                zoom: 10,
                center: map_center,
                styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-40},{"lightness":10}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]}]
            }
            var map = new google.maps.Map(document.getElementById('home_map'), mapOptions);
            $scope.listings = "";
            $scope.recent = "";
            $scope.mostview = "";

            $scope.search = false;

            $scope.initiate = function() {
                console.log('test');
                jQuery('.select-box').each(function (index) {
                    var selectBox = jQuery(this),
                        current = index;


                    selectBox.find('input').on('click', function () {
                        selectBox.find('ul').slideToggle(150);
                        selectBox.toggleClass('open');

                        jQuery('.select-box').each(function (index) {
                            if (index != current) {
                                jQuery(this).find('ul').slideUp(150);
                                jQuery(this).removeClass('open');
                            }
                        });
                    });

                    selectBox.find('ul li').on('click', function () {
                        selectBox.find('input').attr('value', jQuery(this).text());
                        selectBox.find('ul').slideToggle(150);
                        selectBox.toggleClass('open');
                        selectBox.find('input').addClass('has-value');
                    });

                    jQuery(document).on('click', function () {
                        selectBox.removeClass('open');
                        selectBox.find('ul').slideUp(150);
                    });

                    selectBox.on('click', function (e) {
                        e.stopPropagation();
                    });
                });

            }

            $scope.initiate();
        //map_center = geolocatorService.geoLocate(map, $scope);
            /*$("#overlay").show();
            searchService.getSearchAll().then(function(response) {
                if(response.data.success) {
                    var prop_data = response.data.data;
                    $scope.listings = prop_data;
                    markerService.getMarker(prop_data, map);
                }
                $("#overlay").hide();
            }, function(response) {
            });*/
        searchAutoService.getAuto();
            searchAutoService.getAutoMini();

        $scope.searchProperty = function() {
            $('#overlay').show();
            searchService.getSearch().then(function(response) {
                if(response.data.success) {
                    var prop_data = response.data.data;
                        $scope.listings = prop_data;
                        $scope.search = true;

                    markerService.getMarker(prop_data, map);

                } else {
                    $('#overlay').hide();
                    markerService.clearOverlays(map);
                    $scope.listings = "";
                }
            }, function(response) {
            });
        }

            $scope.searchPropertyMini = function() {
                $('#overlay').show();
                searchService.getSearchMini().then(function(response) {
                    if(response.data.success) {
                        var prop_data = response.data.data;
                        $scope.listings = prop_data;
                        searchService.setMini();
                        markerService.getMarker(prop_data, map);

                    } else {
                        $('#overlay').hide();
                        markerService.clearOverlays(map);
                        $scope.listings = "";
                    }
                }, function(response) {
                });
            }

            searchService.getRecent().then(function(response) {
                if(response.data.success) {
                    var prop_data = response.data.data;
                    $scope.recent = prop_data;

                } else {
                }
            }, function(response) {
            });

            searchService.mostView().then(function(response) {
                if(response.data.success) {
                    var prop_data = response.data.data;
                    $scope.mostview = prop_data;

                } else {
                }
            }, function(response) {
            });


    }]);
});