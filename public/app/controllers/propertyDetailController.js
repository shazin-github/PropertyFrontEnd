define([
    'services/propertyService',
    'services/schoolService',
    'services/userService'],

    function() {
        angular
            .module('coreModule')
            .controller('propertyDetailController' , propertyDetailController);

        propertyDetailController.$inject =  ['$scope', '$http', '$q', 'propertyService', 'schoolService', '$timeout' , 'userService'];

        function propertyDetailController($scope, $http, $q, propertyService, schoolService, $timeout , userService) {

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
            vm.addMarker = addMarker;
            vm.schools = "";
            vm.calculateCreatedDate = calculateCreatedDate;
            //vm.calUpdatedDate = calUpdatedDate;
            vm.closeModal = closeModal;
            vm.contactAgent = contactAgent;
            vm.userDetail = userDetail;
            vm.visitor = {};

            function contactAgent(){
                $('#overlay').show();
                vm.visitor.contactName = vm.agentName;
                vm.visitor.contactMail = vm.agent.email;
                propertyService.contactAgent(vm.visitor).then(function (resp){
                    $('#overlay').hide();
                    if(resp.data.success) {
                        //vm.msg = resp.data.msg
                        echoSuccess('agent-contact-form', resp.data.msg , 'alert-success');
                    }
                });

            }

            function userDetail(){
                    console.log(vm.agent);

                    vm.agentName = vm.agent.firstname+' '+vm.agent.lastname;
                    vm.agentImages = vm.agent.image_url;
            }

            function closeModal(){
                vm.showModal = !vm.showModal;
            }

            function mapInitailize() {

                var mapCenter = new google.maps.LatLng(31.55460609999999, 74.35715810000001);

                var mapOptions = {
                    zoom: 15,
                    disableDefaultUI: false,
                    scaleControl: false,
                    scrollwheel: false,
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

            $timeout(function () {
                console.log(vm.id);
                vm.getProperty = getPropertyDetails(vm.id);
                propertyService.addView(vm.id);
            });

            function getPropertyDetails(id) {
                return propertyService.getPropertyDetail(id).then(function (response) {

                    var propertyData = response.data.data.property[0];
                    vm.agent = response.data.data.sellerDetail[0];
                    console.log(vm.agent);
                    vm.userDetail();
                    var propertyImage = propertyData.image_url.split("|");
                    vm.imageThumbnailUrl(propertyImage);
                    vm.currentImage = _.first(vm.imageArray);
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
                console.log(data);
                var newCenter = new google.maps.LatLng(data.latitude, data.longitude);

                map.setCenter(newCenter);
                var marker = new google.maps.Marker({
                    position: newCenter,
                    map: map,
                    title: data.title,
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

        }
});