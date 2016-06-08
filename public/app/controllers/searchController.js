define([
    'services/searchService',
    'services/geolocatorService',
    'services/searchAutoService',
    'services/markerService'
],function(){
    angular
        .module('coreModule')
        .controller('searchController',searchController);

    searchController.$inject = ['$scope', 'searchService', 'geolocatorService', 'searchAutoService', 'markerService'];

    function searchController($scope, searchService, geolocatorService, searchAutoService, markerService){

        var vm = this;
        vm.data2 = [];
        vm.getMostViewProperties    = getMostViewProperties;
        vm.getRecentAddedProperties = getRecentAddedProperties;
        vm.getPropertyPurposeList = getPropertyPurposeList;
        vm.initMap = initMap;
        vm.activate = activate;

        function getMostViewProperties(){
            searchService.mostView().then(function(response) {

                if(response.data.success) {
                    var propertyData = response.data.data;
                    vm.data2 = [];

                    angular.forEach(propertyData, function (value, key) {

                        var obj = value;
                        var propertyImages = obj.image_url.split("|");;
                        obj.image_url = propertyImages[0];
                        vm.data2.push(obj);
                    });

                    vm.mostView =  vm.data2;

                } else {
                }
            }, function(response) {
            });
        }

        function getRecentAddedProperties(){

            searchService.getRecent().then(function(response) {
                vm.isRecentLoaded = true;
                if(response.data.success) {
                    var propertyData = response.data.data;
                    $scope.data2 = [];
                    console.log(propertyData);
                    angular.forEach(propertyData, function (value, key) {
                        var obj = value;
                        var propertyImges = obj.image_url.split("|");
                        obj.image_url = propertyImges[0];
                        vm.data2.push(obj);
                    });
                    // var pho_json = angular.fromJson(prop_data.image_url);

                    vm.recent = vm.data2;


                } else {
                }
            }, function(response) {

            });

        }

        function getPropertyPurposeList(){
            searchService.getPurposeList().then(function(response) {
                var data = response.data.data;
                angular.forEach(data , function(value,key){
                    vm.propertyPurposeArray.push(value.name);
                });
                console.log( vm.propertyPurposeArray);
            }, function(response) {
            });
        }

        function initMap(){
            var map_center = new google.maps.LatLng(31.55460609999999, 74.35715810000001);
            var mapOptions = {
                zoom: 10,
                center: map_center,
                styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-40},{"lightness":10}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]}]
            }
            map = new google.maps.Map(document.getElementById('home-map'), mapOptions); // need some changings
        }

        function activate(){
            vm.getMostViewProperties();
            vm.getRecentAddedProperties();
            vm.getPropertyPurposeList();
            vm.initMap();
        }


        $scope.map_init = map_init;
        $scope.reset_searchForm = reset_searchForm;
        $scope.listings = "";
        $scope.recent = "";
        $scope.mostview = "";
        $scope.indexSearchPage = true;
        $scope.search = false;
        $scope.isListingsLoaded = false;
        $scope.isRecentLoaded = false;
        $scope.Response_msg = '';
        $scope.buytype_list = [];
        $scope.num_of_beds_list = ['1', '2', '3'];
        $scope.num_of_baths_list = ['1', '2', '3'];
        $scope.data2 = [];
        $scope.parse_image_URL = parse_image_URL;


        searchService.getPurposeList().then(function(response) {
            var d = response.data.data;
            angular.forEach(d , function(value,key){
                $scope.buytype_list.push(value.name);
            });
            console.log($scope.buytype_list);
        }, function(response) {
        });

        $scope.searchProperty = function() {
            $('#overlay').show();
            $scope.fmdata = {
                purpose:$scope.selected_purpose,
                bedroom:$scope.selected_bedroom,
                bathroom:$scope.selected_bathroom,
                lat:$scope.lat,
                lng:$scope.lng
            };
            console.log($scope.fmdata);
            searchService.getSearch($scope.fmdata).then(function(response) {
                $('#overlay').hide();
                if(response.data.success) {
                    var prop_data = response.data.data;
                    $scope.data2 = [];
                    $scope.parse_image_URL(prop_data);
                    $scope.listings = $scope.data2;
                    $scope.search = true;
                    $scope.isListingsLoaded = true;
                    console.log(prop_data);
                    console.log(markerService);
                    markerService.getMarker(prop_data, map);
                    $scope.Response_msg = '';

                } else {
                    $('#overlay').hide();
                    $scope.search = true;
                    markerService.clearOverlays(map);
                    $scope.listings = "";
                    $scope.Response_msg = "No Result Found";
                }
            }, function(response) {
                $('#overlay').hide();
            });
        };

        $scope.changemarkertest = function(data){

            var d_m = {
                'id':data.property_id,
                'latitude':data.latitude,
                'longitude':data.longitude
            };

            var prop_data = $scope.listings;

            var u_map = map;
            //console.log(prop_data);
            markerService.updateMarker(prop_data, map , d_m);
        };

        $scope.clearPropertyMini = function() {

            $scope.reset_searchForm();
            $scope.map_init();
            markerService.clearOverlays(map);

        };

        searchService.getRecent().then(function(response) {
            $scope.isRecentLoaded = true;
            if(response.data.success) {
                var prop_data = response.data.data;
                $scope.data2 = [];
                console.log(prop_data);
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

        function map_init(){
            var map_center = new google.maps.LatLng(31.55460609999999, 74.35715810000001);
            var mapOptions = {
                zoom: 10,
                center: map_center,
                styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-40},{"lightness":10}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]}]
            }
            map = new google.maps.Map(document.getElementById('home-map'), mapOptions); // need some changings
        }

        $scope.map_init();

        function reset_searchForm(){
            $scope.selected_purpose = '';
            $scope.selected_bedroom = '';
            $scope.selected_bathroom = '';
            $scope.search_value = '';
            $scope.lat = '';
            $scope.lng = '';
            $scope.listings = "";
            $scope.search = false;
        }

        function parse_image_URL(res_data){

            angular.forEach(res_data, function (value, key) {

                var obj = value;
                var update_p = obj.image_url.split("|");
                obj.image_url = update_p[0];
                $scope.data2.push(obj);
            });
        }
    }
});