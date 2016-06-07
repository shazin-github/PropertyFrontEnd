define(function() {
    angular
        .module('coreModule')
        .service('featureService',featureService);

    function featureService(){

        return {
            getFeature:getFeature
        };

        function getFeature(bedroom, bathroom, park, ac, swim, balcony){
            return {
                bedrooms: bedroom,
                bathrooms: bathroom,
                utilities: {
                    parking: (park == undefined) ? false : park,
                    ac: (ac == undefined) ? false : ac,
                    swim: (swim == undefined) ? false : swim,
                    balcony: (balcony == undefined) ? false : balcony
                }
            };
        }

    }
});