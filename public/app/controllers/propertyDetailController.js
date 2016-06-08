define([
    'services/propertyService' ,
    'services/schoolService'],

    function() {
        angular
            .module('coreModule')
            .controller('propertyDetailController' , propertyDetailController);

        propertyDetailController.$inject =  ['$scope', '$http', '$q', 'propertyService', 'schoolService', '$timeout'];

        function propertyDetailController($scope, $http, $q, propertyService, schoolService, $timeout) {

            $("#overlay").show();

            var vm = this;

            vm.id = '';
            vm.imageArray = [];
            vm.imageThumbnailUrl = imageThumbnailUrl;
            vm.mapInitailize = mapInitailize;
            vm.initId = initId;
            vm.showModal = false;
            vm.imageClick = "";
            vm.toggleModal = toggleModal;
            vm.showPrevious = showPrevious;
            vm.showNext = showNext;
            vm.addMarker = addMarker;
            vm.schools = "";
            vm.calculateCreatedDate = calculateCreatedDate;
            //vm.calUpdatedDate = calUpdatedDate;
            vm.closeModal = closeModal;

            function closeModal(){
                vm.showModal = !vm.showModal;
            }

            function mapInitailize() {

                var mapCenter = new google.maps.LatLng(31.55460609999999, 74.35715810000001);

                var mapOptions = {
                    zoom: 15,
                    center: mapCenter,
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

                map = new google.maps.Map(document.getElementById('property_map'), mapOptions);

            }

            function initId(val) {
                vm.id = val;
                console.log(vm.id);
            }

            vm.mapInitailize();

            function toggleModal(imageClicked) {
                // console.log(btnClicked.index);
                vm.currentImage = imageClicked;
                vm.imageClick = imageClicked;
                vm.showModal = !vm.showModal;
            }

            function showNext(index) {
                var index = index + 1;

                if (index < vm.imageArray.length) {
                    vm.currentImage = vm.imageArray[index];
                }
                else {
                    index = 0;
                    vm.currentImage = vm.imageArray[index];
                }

            }

            function showPrevious(index) {
                var index = index - 1;

                if (index >= 0) {
                    vm.currentImage = vm.imageArray[index];
                } else {
                    index = vm.imageArray.length - 1;
                    vm.currentImage = vm.imageArray[index];
                }

            }

            $timeout(function () {
                console.log(vm.id);
                vm.getProperty = getPropertyDetails(vm.id);
                propertyService.addView(vm.id);
            });

            function getPropertyDetails(id) {
                return propertyService.getPropertyDetail(id).then(function (response) {

                    var propertyData = response.data.data[0];

                    console.log(propertyData);
                    var propertyImage = propertyData.image_url.split("|");
                    vm.imageThumbnailUrl(propertyImage);
                    vm.currentImage = _.first(vm.imageArray)
                    vm.imagesUrl = propertyImage;
                    vm.title = propertyData.title;
                    vm.address = propertyData.address;
                    vm.bedroom = propertyData.bedrooms;
                    vm.bathroom = propertyData.bathrooms;
                    vm.area = propertyData.area;
                    vm.areaType = propertyData.area_type;
                    vm.purpose = propertyData.prop_purpose_id;
                    vm.price = propertyData.price;
                    vm.utilities = JSON.parse(propertyData.utilities);
                    vm.park = vm.utilities.parking;
                    vm.ac = vm.utilities.ac;
                    vm.swim = vm.utilities.swim;
                    vm.balcony = vm.utilities.balcony;
                    vm.addMarker(propertyData, vm);
                    vm.calculateCreatedDate(propertyData.created_at);
                    var date = new Date(propertyData.updated_at);
                    vm.lastUpdatedDate = date.toDateString();
                    //console.log(n);
                }, function (response) {
                    $("#overlay").hide();
                });
            }

            function imageThumbnailUrl(propertyImage) {
                angular.forEach(propertyImage, function (value, key) {
                    var dr = '/';
                    var img = {

                        thumb: 'thumbnail' + dr + value,
                        img: value,
                        description: '',
                        ind: key
                    }

                    vm.imageArray.push(img);
                });
            }

            function addMarker(data, vm) {

                var newCenter = new google.maps.LatLng(data.latitude, data.longitude);

                map.setCenter(newCenter);
                var marker = new google.maps.Marker({
                    position: newCenter,
                    map: map,
                    title: data.address,
                    animation: google.maps.Animation.BOUNCE

                });
                schoolService.getSchools(map, newCenter, $scope);
            }

            function calculateCreatedDate(date) {
                var oneDay = 24 * 60 * 60 * 1000;

                var date1 = new Date().getTime();

                var date2 = new Date(date).getTime();

                var diffDays = Math.round(Math.abs((date1 - date2) / (oneDay)));

                vm.addedDate = diffDays;
            }

            //function calUpdatedDate(){
            //    var oneDay = 24 * 60 * 60 * 1000;
            //    var date1 = new Date().getTime();
            //    var date2 = new Date(prop_data.updated_at).getTime();
            //    var date = new Date('2016-06-03');
            //    var n = date.toDateString();
            //
            //    console.log(n);
            //
            //    var diffDays = Math.round(Math.abs((date1 - date2) / (oneDay)));
            //    //vm.update_date = diffDays - 1;
            //}


        }
});