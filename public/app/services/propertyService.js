define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('propertyService', ['$http', function($http) {
        this.getProperty = function(title, price, area, description, purpose, type, category, image_url) {
            return {
                title: title,
                price: price,
                area: area,
                description: description,
                purpose: purpose,
                type: type,
                category: category,
                image_url : image_url,
                status: 1
            };
        };

        this.addImage = function(form_data){
            return $http.post('property/image', form_data, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        }
    }]);
});