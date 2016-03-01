define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('searchAutoService', function() {
        this.getAuto = function() {

            var adr_options = {
                types: ['geocode'],
                componentRestrictions: {country: 'pk'}
            };

            var address = document.getElementById('search');

            var autocomplete_adr = new google.maps.places.Autocomplete(address, adr_options);

            autocomplete_adr.addListener('place_changed', function() {

                var place = autocomplete_adr.getPlace();
                if (!place.geometry) {
                    $("#search").val("");
                    return;
                }
                $("#search_lat").val(place.geometry.location.lat());
                $("#search_lng").val(place.geometry.location.lng());
            });
        };
    });
});