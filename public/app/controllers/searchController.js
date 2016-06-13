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

    function searchController($scope, searchService, geolocatorService, searchAutoService, markerService) {

        var vm = this;
        vm.propertyPurposeArray = [];
        vm.isListingsLoaded = false;
        vm.isRecentLoaded = false;
        vm.search = false;
        vm.selectBaths = ['1', '2', '3'];
        vm.selectBeds = ['1', '2', '3'];
        vm.responseMsg = '';
        vm.lat = '';
        vm.lng = '';

        vm.searchValue = '';
        vm.listings= '';
        vm.getMostViewProperties = getMostViewProperties;
        vm.getRecentAddedProperties = getRecentAddedProperties;
        vm.getPropertyPurposeList = getPropertyPurposeList;
        vm.resetSearchForm = resetSearchForm;
        vm.parseImagesUrl = parseImagesUrl;
        vm.changeMakerAnimation = changeMakerAnimation;
        vm.clearSearchListing = clearSearchListing;
        vm.searchProperty = searchProperty;
        vm.initMap = initMap;
        vm.activate = activate;

        function changeMakerAnimation(data) {
            var onMousedata = {
                'id': data.property_id,
                'latitude': data.latitude,
                'longitude': data.longitude
            };
            var propertyData = vm.listings;
            markerService.updateMarker(propertyData, map, onMousedata);
        }

        function parseImagesUrl(propertyData) {
            vm.propertyDataArray = [];
            angular.forEach(propertyData, function (value, key) {

                var obj = value;
                var imgUrl = obj.image_url.split("|");
                obj.image_url = imgUrl[0];
                vm.propertyDataArray.push(obj);
            });



            console.log("listing:" + vm.listings);
        }

        function resetSearchForm() {
            vm.purposeSelected = '';
            vm.numberOfBathSelected = '';
            vm.numberOfBedSelected = '';
            vm.lat = '';
            vm.lng = '';
            vm.search = false;
            vm.searchValue = '';
            vm.listings= '';
        }

        function clearSearchListing() {
            vm.initMap();
            markerService.clearOverlays(map);
            vm.resetSearchForm();

        }

        function getMostViewProperties() {
            searchService.mostView().then(function (response) {

                if (response.data.success) {
                    var propertyData = response.data.data;

                    var collectData = [];

                    angular.forEach(propertyData, function (value, key) {

                        var obj = value;
                        var propertyImages = obj.image_url.split("|");
                        obj.image_url = propertyImages[0];
                        collectData.push(obj);
                    });

                    vm.mostView = collectData;

                } else {
                }
            }, function (response) {
            });
        }

        function getRecentAddedProperties() {
            $('#overlay').show();
            searchService.getRecent().then(function (response) {
                $('#overlay').hide();
                vm.isRecentLoaded = true;
                if (response.data.success) {
                    var propertyData = response.data.data;
                    var collectData = [];
                    angular.forEach(propertyData, function (value, key) {
                        var obj = value;
                        var propertyImges = obj.image_url.split("|");
                        obj.image_url = propertyImges[0];
                        collectData.push(obj);
                    });
                    // var pho_json = angular.fromJson(prop_data.image_url);

                    vm.recent = collectData;


                } else {
                }
            }, function (response) {

            });

        }

        function getPropertyPurposeList() {
            searchService.getPurposeList().then(function (response) {
                var data = response.data.data;
                angular.forEach(data, function (value, key) {
                    vm.propertyPurposeArray.push(value.name);
                });
            }, function (response) {
            });
        }

        function initMap() {
            var map_center = new google.maps.LatLng(31.55460609999999, 74.35715810000001);
            var mapOptions = {
                zoom: 10,
                disableDefaultUI: false,
                scaleControl: false,
                scrollwheel: false,
                center: map_center,
                styles: [{
                    "featureType": "administrative",
                    "elementType": "all",
                    "stylers": [{"visibility": "on"}, {"saturation": -150}, {"lightness": 10}]
                }, {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [{"visibility": "on"}, {"saturation": -150}, {"lightness": 10}]
                }, {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{"visibility": "on"}, {"saturation": -40}, {"lightness": 10}]
                }, {
                    "featureType": "landscape.man_made",
                    "elementType": "all",
                    "stylers": [{"visibility": "simplified"}, {"saturation": -100}, {"lightness": 10}]
                }, {
                    "featureType": "landscape.natural",
                    "elementType": "all",
                    "stylers": [{"visibility": "simplified"}, {"saturation": -100}, {"lightness": 20}]
                }, {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [{"visibility": "off"}, {"saturation": -150}, {"lightness": 20}]
                }, {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [{"visibility": "off"}, {"saturation": -150}, {"lightness": 20}]
                }]
            }
            map = new google.maps.Map(document.getElementById('home-map'), mapOptions); // need some changings
        }

        function activate() {
            vm.getMostViewProperties();
            vm.getRecentAddedProperties();
            vm.getPropertyPurposeList();
            vm.initMap();
        }

        function searchProperty() {

            vm.listings= '';

            $('#overlay').show();
            vm.fmdata = {
                purpose: vm.purposeSelected,
                bedroom: vm.numberOfBathSelected,
                bathroom: vm.numberOfBedSelected,
                lat: vm.lat,
                lng: vm.lng
            };

            console.log(vm.fmdata);
            if(vm.searchValue){
                searchService.getSearch(vm.fmdata).then(function (response) {
                    console.log(response);
                    $('#overlay').hide();
                    if (response.data.success) {

                        var propertyArray = response.data.data;
                        vm.parseImagesUrl(propertyArray);
                        vm.search = true;
                        vm.isListingsLoaded = true;
                        markerService.getMarker(propertyArray, map);
                        vm.responseMsg = '';
                        vm.listings = vm.propertyDataArray;
                    }
                    else {
                        $('#overlay').hide();
                        vm.search = true;
                        markerService.clearOverlays(map);
                        vm.listings = '';
                        vm.responseMsg = "No such Property Found";
                        vm.initMap();
                    }
                }, function (response) {
                    $('#overlay').hide();
                });
            }else{

                markerService.clearOverlays(map);
                $('#overlay').hide();
            }


        }

        vm.activate();

    }
});