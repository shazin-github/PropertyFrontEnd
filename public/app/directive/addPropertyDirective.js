define(function(){

    var coreModule = angular.module('coreModule');

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

            },
            controller : 'addPropertyController'
        };
    }); //



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

    angular
        .module('coreModule')
        .directive('cdAddSubtract' , AddSubtract);

    function AddSubtract(){
        var directive = {
            controller: controller,
            templateUrl: '/Template/directive/addSubtractTemplate.html',
            restrict: 'A',
            scope:{
                'option':'=',
                'title' : '@title'
            }
        };
        return directive;

        function controller($scope) {

            $scope.addfunction = function(){
                $scope.option++;
            }
            $scope.subtractfunction = function(){

                var newvlaue = $scope.option--;
                if(newvlaue <= 0){
                    $scope.option= 0;
                }
            }
        }
    }


    angular
        .module('coreModule')
        .directive('cdDropdown',funDropdown);

    function funDropdown(){
        return {
            restrict : 'A',
            require: 'ngModel',
            templateUrl: '/Template/directive/dropdownTemplate.html',
            scope : {
                'option':'=option',
                'type':' =ngModel',
                'title' : '@title'

            },
            link:link,
            controller:controller,
        }
        function controller($scope){ // following johnpapa
            $scope.isopenclass = false;
            $scope.classopen = classopen;
            $scope.selectedvalue = selectedvalue;

            function selectedvalue(selectedval){
                $scope.type = selectedval;
            }
            function classopen(){
                $scope.isopenclass = !$scope.isopenclass;
            }

        }
        function link(scope, element, attrs ,ctrl){
            var selectbox = element.find('.select-box');
            angular.element(document).on('click',function(){

                selectbox.find('ul').slideUp(150);
                selectbox.removeClass('open');
            });

            selectbox.on('click' , function(){
                selectbox.find('ul').slideToggle(150);
                selectbox.toggleClass('open');
            });

            selectbox.find('ul li').on('click' , function(){
                selectbox.find('ul').slideToggle(150);
                selectbox.toggleClass('open');
                selectbox.find('input').addClass('has-value');
            });

            selectbox.on('click', function (e) {
                    e.stopPropagation();
            });


        }
    }

});