define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('featureService', function() {
        this.getFeature = function(bedroom, bathroom, park, ac, swim, balcony) {
            return {
                bedroom: bedroom,
                bathroom: bathroom,
                utility: {
                    parking: (park == undefined) ? false : park,
                    ac: (ac == undefined) ? false : ac,
                    swim: (swim == undefined) ? false : swim,
                    balcony: (balcony == undefined) ? false : balcony
                }
            };
        };
    });
});