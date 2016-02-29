define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('locationService', function() {
        this.getLocation = function(country, state, city, address, zip, lat, lng) {
            return {
                country: country,
                state: state,
                city: city,
                address: address,
                zip: zip,
                latitude: lat,
                longitude: lng,
                status: 1
            };
        };
    });
});