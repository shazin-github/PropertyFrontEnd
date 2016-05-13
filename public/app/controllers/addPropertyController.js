define([
    'services/locationService',
    'services/propertyService',
    'services/featureService',
    'services/addPropertyService',
    'services/cityService',
    'services/stateService',
    ],
    function() {
    var coreModule = angular.module('coreModule');





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

                    //console.log(scope.gPlace);


                }
                scope.gPlace.addListener( 'place_changed', function() {

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

    coreModule.directive('image', function($q) {
    'use strict'

    var URL = window.URL || window.webkitURL;

    var getResizeArea = function () {
        var resizeAreaId = 'fileupload-resize-area';

        var resizeArea = document.getElementById(resizeAreaId);

        if (!resizeArea) {
            resizeArea = document.createElement('canvas');
            resizeArea.id = resizeAreaId;
            resizeArea.style.visibility = 'hidden';
            document.body.appendChild(resizeArea);
        }

        return resizeArea;
    }

    var resizeImage = function (origImage, options) {
        var maxHeight = options.resizeMaxHeight || 300;
        var maxWidth = options.resizeMaxWidth || 250;
        var quality = options.resizeQuality || 0.7;
        var type = options.resizeType || 'image/jpg';

        var canvas = getResizeArea();

        var height = origImage.height;
        var width = origImage.width;

        // calculate the width and height, constraining the proportions
        if (width > height) {
            if (width > maxWidth) {
                height = Math.round(height *= maxWidth / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.round(width *= maxHeight / height);
                height = maxHeight;
            }
        }

        canvas.width = width;
        canvas.height = height;

        //draw image on canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(origImage, 0, 0, width, height);

        // get the data from canvas as 70% jpg (or specified type).
        return canvas.toDataURL(type, quality);
    };

    var createImage = function(url, callback) {
        var image = new Image();
        image.onload = function() {
            callback(image);
        };
        image.src = url;
    };

    var fileToDataURL = function (file) {
        var deferred = $q.defer();
        var reader = new FileReader();
        reader.onload = function (e) {
            deferred.resolve(e.target.result);
        };
        reader.readAsDataURL(file);
        return deferred.promise;
    };


    return {
        restrict: 'A',
        scope: {
            image: '=',
            resizeMaxHeight: '@?',
            resizeMaxWidth: '@?',
            resizeQuality: '@?',
            resizeType: '@?',
        },
        link: function postLink(scope, element, attrs, ctrl) {

            var doResizing = function(imageResult, callback) {
                createImage(imageResult.url, function(image) {
                    var dataURL = resizeImage(image, scope);
                    imageResult.resized = {
                        dataURL: dataURL,
                        type: dataURL.match(/:(.+\/.+);/)[1],
                    };
                    callback(imageResult);
                });
            };

            var applyScope = function(imageResult) {
                scope.$apply(function() {
                    //console.log(imageResult);
                    if(attrs.multiple)
                        scope.image.push(imageResult);
                    else
                        scope.image = imageResult;
                });
            };


            element.bind('change', function (evt) {
                //when multiple always return an array of images
                if (attrs.multiple)
                    scope.image = [];

                var files = evt.target.files;
                for (var i = 0; i < files.length; i++) {
                    //create a result object for each file in files
                    var fsize = files[i].size; //get file size
                    var ftype = files[i].type; // get file type
                    var file_size_limit = 60 * 1024 * 1024;
                    if (fsize > file_size_limit) {
                        alert('Maximum allowed size is 60 MB');
                    } else if (!(ftype == 'image/jpeg' || ftype == 'image/jpg' ||  ftype == 'image/gif')) {
                        alert('Allowed file types are jpeg, jpg and gif');
                    } else {
                    var imageResult = {
                        file: files[i],
                        url: URL.createObjectURL(files[i])
                    };

                    fileToDataURL(files[i]).then(function (dataURL) {
                        imageResult.dataURL = dataURL;
                    });

                    if (scope.resizeMaxHeight || scope.resizeMaxWidth) { //resize image
                        doResizing(imageResult, function (imageResult) {
                            applyScope(imageResult);
                        });
                    }
                    else { //no resizing
                        applyScope(imageResult);
                    }
                }
            }
            });
        }
    };
});


    coreModule.controller('addPropertyController', ['$rootScope','$scope', 'locationService' ,'featureService', 'propertyService',  'addPropertyService','cityService','stateService', '$q' , function($rootScope,$scope, locationService, featureService, propertyService, addPropertyService ,cityService ,stateService,$q) {

        $scope.country = "Pakistan";
        $scope.citylist = {};
        $scope.statelist = {};
        $scope.start = 0;
        $scope.current = 0;
        $scope.result1 = '';
        $scope.imgURL = [];
        $scope.property_data = {};

        init_map = function(){

            console.log("Test");
            var latlng = new google.maps.LatLng(31.55460609999999, 74.35715810000001);

            console.log(latlng);
            var mapOptions = {
                zoom: 10,
                center: latlng,
                styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-40},{"lightness":10}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]}]
            };

            console.log(mapOptions);
            map = new google.maps.Map(document.getElementById('#location-map'), mapOptions);

            property_marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: 'Pakistan',
                icon: 'img/marker_icon.png'
            });

        };


        $scope.readURL = function(input, imageField) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#' + imageField).attr('src', e.target.result);
                    $('#' + imageField).show();
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        $scope.fileToDataURL = function (file) {

            var deferred = $q.defer();
            var reader = new FileReader();
            reader.onload = function (e) {
                deferred.resolve(e.target.result);
            };
            reader.readAsDataURL(file);
            return deferred.promise;
        };

        cityService.getcity().then(function(res){

            $scope.citylist = res.data.data;
            //console.log($scope.citylist);
        })

        stateService.getstate().then(function(res){
            $scope.statelist = res.data.data;
            //console.log($scope.statelist);
        })


        $scope.addProperty = function() {


            $('#overlay').show();
            form_data= new FormData();
            file_data = $("#propImages").prop("files");

            console.log(file_data);
            angular.forEach(file_data, function (value, key) {
                form_data.append(key, value);
            });

            console.log(form_data);

            //return;


            propertyService.addMImage(form_data).then(function(image_resp){
                if(image_resp.data.success) {
                    $scope.image_url = image_resp.data.image_url;
                }

            $scope.address = $scope.result1;
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

            google.maps.event.addDomListener(window, "load", init_map);

        };

        //$scope.initiate();







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