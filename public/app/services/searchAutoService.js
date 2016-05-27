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
                console.log(place.address_components);
                if (!place.geometry) {
                    $("#search").val("");
                    return;
                }
                else{

                }
                $("#search_lat").val(place.geometry.location.lat());
                $("#search_lng").val(place.geometry.location.lng());
            });
        };

        this.getAutoMini = function() {

            var adr_options = {
                types: ['geocode'],
                componentRestrictions: {country: 'pk'}
            };

            var address = document.getElementById('search-mini');

            var autocomplete_adr = new google.maps.places.Autocomplete(address, adr_options);

            autocomplete_adr.addListener('place_changed', function() {

                var place = autocomplete_adr.getPlace();
                if (!place.geometry) {
                    $("#search-mini").val("");
                    return;
                }
                $("#search_lat-mini").val(place.geometry.location.lat());
                $("#search_lng-mini").val(place.geometry.location.lng());
            });
        };
    });
});