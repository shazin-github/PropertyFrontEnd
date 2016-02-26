define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('propertyService', function() {
        this.getProperty = function(price, area, description, purpose, type, category) {
            return {
                price: price,
                area: area,
                description: description,
                purpose: purpose,
                type: type,
                category: category
            };
        };
    });
});