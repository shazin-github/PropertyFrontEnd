define([
    'services/locationService',
    'services/propertyService',
    'services/featureService',
    'services/addPropertyService',
    'services/cityService',
    'services/stateService',
    ],
    function() {
    var coreModule = angular.module('coreModule' );





    coreModule.directive('cityList' , function($compile){
        return {
            restrict : 'EA',
            scope   :{
                cities: '=city',
                onClick:'&',
                start: '@',
                current: '@'

            },
            templateUrl: 'property/citytemplate',
            link: function(scope, element, attrs) {
                $compile(element.contents())(scope.$new());
            }
            //controller:function($scope){
            //
            // console.log($scope.cities);
            // }
        }
    } );

    coreModule.directive('stateList' , function($compile){
        return {
            restrict : 'EA',
            scope : {
                statelist : '=state',
                onClick : '&'
            },
            templateUrl: 'property/statetemplate',
            link: function(scope, element, attrs) {
                $compile(element.contents())(scope.$new());
            }
        }
    });
    coreModule.directive('ngAutocomplete', function() {
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                options: '=?',
                details: '=?'
            },

            link: function(scope, element, attrs, controller) {



                var opts;
                var watchEnter = false;
                //convert options provided to opts
                var initOpts = function() {

                    opts = {}
                    if (scope.options) {

                        if (scope.options.watchEnter !== true) {
                            watchEnter = false
                        } else {
                            watchEnter = true
                        }

                        if (scope.options.types) {
                            opts.types = []
                            opts.types.push(scope.options.types)
                            scope.gPlace.setTypes(opts.types)
                        } else {
                            scope.gPlace.setTypes([])
                        }

                        if (scope.options.bounds) {
                            opts.bounds = scope.options.bounds
                            scope.gPlace.setBounds(opts.bounds)
                        } else {
                            scope.gPlace.setBounds(null)
                        }

                        if (scope.options.country) {
                            opts.componentRestrictions = {
                                country: 'pk'
                            }
                            scope.gPlace.setComponentRestrictions(opts.componentRestrictions)
                        } else {
                            scope.gPlace.setComponentRestrictions(null)
                        }
                    }

                }
                if (scope.gPlace == undefined) {

                    var latlng = new google.maps.LatLng(-34.397, 150.644);
                    var mapOptions = {
                        zoom: 10,
                        center: latlng,
                        styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-40},{"lightness":10}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]}]
                    }
                    scope.map = new google.maps.Map(document.getElementById('location-map'), mapOptions);

                    scope.property_marker = new google.maps.Marker({
                        position: latlng,
                        map: scope.map,
                        icon: 'img/marker_icon.png'
                    });
                    var adr_options = {
                        types: ['geocode'],
                        componentRestrictions: {country: 'pk'}
                    };



                    scope.gPlace = new google.maps.places.Autocomplete(element[0], adr_options);

                    console.log(scope.gPlace);


                }
                scope.gPlace.addListener( 'place_changed', function() {
                    console.log('listner');
                    var result = scope.gPlace.getPlace();

                    if (result !== undefined) {

                        if (result.address_components !== undefined) {

                            scope.$apply(function() {

                                scope.details = result;

                                var latlng = new google.maps.LatLng(31.55460609999999, 74.35715810000001);
                                var mapOptions = {
                                    zoom: 10,
                                    center: latlng,
                                    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-40},{"lightness":10}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]}]
                                }
                                scope.map = new google.maps.Map(document.getElementById('location-map'), mapOptions);

                                scope.property_marker = new google.maps.Marker({
                                    position: latlng,
                                    map: scope.map,
                                    titile:element.val(),
                                    icon: 'img/marker_icon.png'
                                });

                                scope.property_marker.setPosition(result.geometry.location);
                                scope.property_marker.title = element.val();
                                scope.map.setCenter(result.geometry.location);
                                scope.map.setZoom(15);
                                $("#latitude").val(result.geometry.location.lat());
                                $("#longitude").val(result.geometry.location.lng());



                                console.log(element.val());

                                controller.$setViewValue(element.val());
                            });
                        }
                        else {
                            if (watchEnter) {
                                getPlace(result)
                            }
                        }
                    }
                })

                //function to get retrieve the autocompletes first result using the AutocompleteService
                var getPlace = function(result) {
                    var autocompleteService = new google.maps.places.AutocompleteService();
                    if (result.name.length > 0){
                        autocompleteService.getPlacePredictions(
                            {
                                input: result.name,
                                offset: result.name.length
                            },
                            function listentoresult(list, status) {
                                if(list == null || list.length == 0) {

                                    scope.$apply(function() {
                                        scope.details = null;
                                    });

                                } else {
                                    var placesService = new google.maps.places.PlacesService(element[0]);
                                    placesService.getDetails(
                                        {'reference': list[0].reference},
                                        function detailsresult(detailsResult, placesServiceStatus) {

                                            if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                                                scope.$apply(function() {

                                                    controller.$setViewValue(detailsResult.formatted_address);
                                                    element.val(detailsResult.formatted_address);

                                                    scope.details = detailsResult;

                                                    //on focusout the value reverts, need to set it again.
                                                    var watchFocusOut = element.on('focusout', function(event) {
                                                        element.val(detailsResult.formatted_address);
                                                        element.unbind('focusout')
                                                    })

                                                });
                                            }
                                        }
                                    );
                                }
                            });
                    }
                }

                controller.$render = function () {
                    var location = controller.$viewValue;
                    element.val(location);
                };

                //watch options provided to directive
                scope.watchOptions = function () {

                    return scope.options
                };
                scope.$watch(scope.watchOptions, function () {
                    initOpts()
                }, true);

            }
        };
    });
    coreModule.controller('addPropertyController', ['$scope', 'locationService' ,'featureService', 'propertyService',  'addPropertyService','cityService','stateService', function($scope, locationService, featureService, propertyService, addPropertyService ,cityService ,stateService) {
        $scope.country = "Pakistan";
        $scope.citylist = {};
        $scope.statelist = {};
        $scope.start = 0;
        $scope.current = 0;
        $scope.result1 = '';

        $scope.property_data = {};


        cityService.getcity().then(function(res){

            $scope.citylist = res.data.data;
            //console.log($scope.citylist);
        })

        stateService.getstate().then(function(res){
            $scope.statelist = res.data.data;
            //console.log($scope.statelist);
        })

        $("#propImages").change(function() {
            fsize = this.files[0].size; //get file size
            ftype = $('#propImages')[0].files[0].type; // get file type
            file_size_limit = 60 * 1024 * 1024;
            console.log("123");
            if (fsize > file_size_limit) {
                alert('Maximum allowed size is 60 MB');
            } else if(! (ftype == 'image/jpeg' || ftype == 'image/jpg' || ftype == 'image/gif') ) {
                alert('Allowed file types are jpeg, jpg and gif');
            } else {
                readURL(this, 'propertyImage');
            }
        });

        $scope.addProperty = function() {

            console.log($scope.property_data);
            $('#overlay').show();
            form_data= new FormData();
            file_data = $("#propImages").prop("files")[0];
            form_data.append("propImages", file_data);

            propertyService.addImage(form_data).then(function(image_resp){
                if(image_resp.data.success){
                    $scope.image_url = image_resp.data.image_url;
                }

            $scope.address = $("#address").val();
            $scope.latitude = $("#latitude").val();
            $scope.longitude = $("#longitude").val();
            $scope.city = $("#city").val();
            $scope.state = $("#state").val();
            $scope.location = locationService.getLocation($scope.country, $scope.state, $scope.city, $scope.address,
                $scope.zip, $scope.latitude, $scope.longitude);

            $scope.property = propertyService.getProperty($scope.title, $scope.price, $scope.area, $scope.description, $scope.purpose,
                $scope.type, $scope.category, $scope.image_url);

            $scope.bed = $("#bed").val();
            $scope.bath = $("#bath").val();
            $scope.feature = featureService.getFeature($scope.bed, $scope.bath, $scope.park, $scope.ac,
                $scope.swim, $scope.balcony);

            $scope.seller = 0;
            addPropertyService.addProperty($scope.location, $scope.property, $scope.feature,
                $scope.seller).then(function(response) {
                $scope.status = response.data.success;
                $scope.msg = response.data.msg;
                console.log($scope.status);
                $('#overlay').hide();
                $('html, body').animate({'scrollTop': $("#resultDiv").offset().top-100}, 500);
            }, function(response) {
                $scope.status = response.data.success;
                $scope.msg = response.data.msg;
                console.log($scope.status);
                $('#overlay').hide();
                $('html, body').animate({'scrollTop': $("#resultDiv").offset().top-100}, 500);
            });
            });
        };


        $scope.initiate = function() {

            console.log('select-box test');

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


                jQuery(document).on('click', function () {
                    selectBox.removeClass('open');
                    selectBox.find('ul').slideUp(150);
                });

                selectBox.on('click', function (e) {
                    e.stopPropagation();
                });
            });

        }


        $scope.map_init = function(){

            var latlng = new google.maps.LatLng(31.55460609999999, 74.35715810000001);
            var mapOptions = {
                zoom: 10,
                center: latlng,
                styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-40},{"lightness":10}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]}]
            }
            map = new google.maps.Map(document.getElementById('location-map'), mapOptions);

            property_marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: 'Pakistan',
                icon: 'img/marker_icon.png'
            });

            $scope.initiate();

        }





        $scope.setstate = function(stateid) {

            var selectBox = jQuery('#stateSelectBox');

            selectBox.find('input').attr('value', stateid);
            selectBox.find('ul').slideToggle(150);
            selectBox.toggleClass('open');
            selectBox.find('input').addClass('has-value');

        }
        $scope.setCity = function(cityID) {
            var selectBox = jQuery('#citySelectBox');

            selectBox.find('input').attr('value', cityID);
            selectBox.find('city-list ul').slideToggle(150);
            selectBox.toggleClass('open');
            selectBox.find('input').addClass('has-value');


        }

    }]);
});