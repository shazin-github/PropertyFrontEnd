define(function(){
    angular
        .module('coreModule')
        .service('locationService',locationService);

    function locationService(){
        return {
            getLocation:getLocation
        };

        function getLocation(country, state, city, address, zip, lat, lng){
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
        }
    }
});