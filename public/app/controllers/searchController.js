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
            map = new google.maps.Map(document.getElementById('home_map'), mapOptions);
            $scope.listings = "";
            $scope.recent = "";
            $scope.mostview = "";

            $scope.search = false;
            $scope.isListingsLoaded = false;
            $scope.isRecentLoaded = false;


            $scope.initiate = function() {

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
                        //console.log(jQuery(this).text());

                        var val = jQuery(this).text();
                        selectBox.find('input').attr('value' ,jQuery(this).text());


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

            //$scope.initiate();
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
                    $scope.data2 = [];

                    angular.forEach(prop_data, function (value, key) {

                        var obj = value;
                        var update_p = obj.image_url.split("|");;
                        obj.image_url = update_p[0];
                        $scope.data2.push(obj);
                    });
                    $scope.listings = $scope.data2;
                        //$scope.listings = prop_data;
                    $scope.search = true;

                    $scope.isListingsLoaded = true;

                    markerService.getMarker(prop_data, map);



                } else {
                    $('#overlay').hide();
                    markerService.clearOverlays(map);
                    $scope.listings = "";
                }
            }, function(response) {
            });
        }

            $scope.changemarkertest = function(data){

                var d_m = {
                    'id':data.id,
                    'latitude':data.latitude,
                    'longitude':data.longitude
                };

                var prop_data = $scope.listings;

                var u_map = map;
                //console.log(prop_data);
                markerService.updateMarker(prop_data, map , d_m);
            }

            $scope.resetmarkertest = function(){

                //var prop_data = $scope.listings;
                //markerService.getMarker(prop_data, map);

            }

            $scope.searchPropertyMini = function() {
                $('#overlay').show();
                searchService.getSearchMini().then(function(response) {
                    if(response.data.success) {
                        var prop_data = response.data.data;

                        $scope.data2 = [];

                        angular.forEach(prop_data, function (value, key) {

                            var obj = value;
                            var update_p = obj.image_url.split("|");;
                            obj.image_url = update_p[0];
                            $scope.data2.push(obj);
                        });
                        $scope.listings = $scope.data2;
                        //searchService.setMini();
                        markerService.getMarker(prop_data, map);

                    } else {
                        $('#overlay').hide();
                        markerService.clearOverlays(map);
                        $scope.listings = "";
                    }
                }, function(response) {
                });
            }

            $scope.clearPropertyMini = function() {
                $('#overlay').show();
                searchService.ClearMini();
                $scope.search = false;
                        $('#overlay').hide();
                        markerService.clearOverlays(map);
                        $scope.listings = "";


            };

            searchService.getRecent().then(function(response) {
                $scope.isRecentLoaded = true;
                if(response.data.success) {
                    var prop_data = response.data.data;
                    $scope.data2 = [];
                    //console.log(prop_data);
                    angular.forEach(prop_data, function (value, key) {
                        var obj = value;
                        var update_p = obj.image_url.split("|");
                        obj.image_url = update_p[0];
                        $scope.data2.push(obj);
                    });
                   // var pho_json = angular.fromJson(prop_data.image_url);

                    $scope.recent = $scope.data2;


                } else {
                }
            }, function(response) {
            });

            searchService.mostView().then(function(response) {
                if(response.data.success) {
                    var prop_data = response.data.data;
                    $scope.data2 = [];

                    angular.forEach(prop_data, function (value, key) {

                        var obj = value;
                        var update_p = obj.image_url.split("|");;
                        obj.image_url = update_p[0];
                        $scope.data2.push(obj);
                    });

                    $scope.mostview =  $scope.data2;

                } else {
                }
            }, function(response) {
            });


    }]);
});