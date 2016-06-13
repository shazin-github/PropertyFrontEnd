define(function(){
    angular
        .module('coreModule')
        .directive('ngAutocomplete' , ngAutocomplete);

    function ngAutocomplete(){
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                options: '=?',
                details: '=?',
                longitude:'=',
                latitude:'='

            },
            link:link
        };

        function link(scope, element, attrs, controller) {
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
                        disableDefaultUI: false,
                        scaleControl: false,
                        scrollwheel: false,
                        styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-40},{"lightness":10}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]}]
                    }
                    scope.map = new google.maps.Map(document.getElementById('location_map'), mapOptions);
                    scope.property_marker = new google.maps.Marker({
                        position: latlng,
                        map: scope.map,
                        icon: 'img/marker_icon.png'
                    });
                    var adrOptions = {
                        types: ['geocode'],
                        componentRestrictions: {country: 'pk'}
                    };

                    scope.gPlace = new google.maps.places.Autocomplete(element[0], adrOptions);

                }
                scope.gPlace.addListener( 'place_changed', function() {

                    var result = scope.gPlace.getPlace();

                    if (result !== undefined) {

                        if (result.address_components !== undefined) {

                            scope.$apply(function() {

                                scope.details = result;

                                scope.property_marker.setMap(null);

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

                                scope.latitude = result.geometry.location.lat();
                                scope.longitude = result.geometry.location.lng();



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

    }
});