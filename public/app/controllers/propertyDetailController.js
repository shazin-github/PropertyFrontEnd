define(['services/propertyService' ,'services/schoolService'], function() {


    var coreModule = angular.module('coreModule');

    coreModule.controller('propertyDetailController', ['$scope', '$http', '$q', 'propertyService', 'schoolService', '$timeout', function($scope, $http, $q, propertyService, schoolService, $timeout) {
        $("#overlay").show();

        $scope.id = '';

        $scope.init_id = function(val){

            $scope.id = val;

        };

        var map_center = new google.maps.LatLng(-34.397, 150.644);

        var mapOptions = {
            zoom: 15,
            center: map_center,
            styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-40},{"lightness":10}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]}]
        }
        var map = new google.maps.Map(document.getElementById('property_map'), mapOptions);

        $scope.showModal = false;

        $scope.imageClick  = "";

        $scope.toggleModal = function(imageClicked){
           // console.log(btnClicked.index);
            $scope.currentimage = imageClicked;
            $scope.imageClick = imageClicked;
            $scope.showModal = !$scope.showModal;
        };

        $scope.shownext = function(index) {
            var index = index+1;

            if(index<$scope.images_array.length){
                $scope.currentimage = $scope.images_array[index];
            }
            else{
                index = 0;
                $scope.currentimage = $scope.images_array[index];
            }

        };

        $scope.showpre = function(index) {
            var index = index-1;

            if(index>=0){
                $scope.currentimage = $scope.images_array[index];
            }else{
                index =  $scope.images_array.length - 1;
                $scope.currentimage = $scope.images_array[index];
            }

        };

        $timeout(function() {
            console.log($scope.id);
            $scope.getProperty = getPropertyDetails($scope.id);
            propertyService.addView($scope.id);
        });

        function getPropertyDetails(id) {
             return propertyService.getPropertyDetail(id).then(function (response) {
                var prop_data = response.data.data[0];
                $scope.images_array = [];
                //console.log(prop_data);
                var update_p = prop_data.image_url.split("|");

                angular.forEach(update_p, function (value, key) {
                    var dr = '/';
                    var imge = {

                        thumb: 'thumbnail' + dr + value,
                        img: value,
                        description: '',
                        ind: key
                    }

                    $scope.images_array.push(imge);
                });
                $scope.currentimage = _.first($scope.images_array)
                $scope.image_url = update_p;
                $scope.title = prop_data.title;
                $scope.address = prop_data.address;
                $scope.bedroom = prop_data.bedrooms;
                $scope.bathroom = prop_data.bathrooms;
                $scope.area = prop_data.area;
                $scope.area_type = prop_data.area_type;
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
                    title: prop_data.address,
                    animation: google.maps.Animation.BOUNCE,
                    //icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'

                });
                $scope.schools = "";
                schoolService.getSchools(map, new_center, $scope);
                var oneDay = 24 * 60 * 60 * 1000;
                var date1 = new Date().getTime();
                var date2 = new Date(prop_data.created_at).getTime();

                var diffDays = Math.round(Math.abs((date1 - date2) / (oneDay)));
                $scope.added_at = diffDays - 1;
            }, function (response) {
                $("#overlay").hide();
            });
        }


    }]);
});