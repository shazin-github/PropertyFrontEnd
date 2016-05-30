define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('propertyService', ['$http', '$q', function($http, $q) {
        this.getProperty = function(title, price, area,area_type ,description, purpose, type, category, image_url) {
            return {
                title: title,
                price: price,
                area: area,
                area_type: area_type,
                description: description,
                prop_purpose_id: purpose,
                prop_type_id: type,
                prop_category_id: category,
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

        this.addMImage = function(form_data ){
            return $http.post('property/M_image', form_data, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        }

        this.getUserProperty = function(){
            return $http.get("property/userProperty");
        }

        this.getPropertyDetail = function(id) {
            var deffered = $q.defer();
            return $http.get('detail/' + id).then(function successCallback(response) {
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                deffered.reject(response);
                return deffered.promise;
            });
        };

        this.addView = function(id) {
            var deffered = $q.defer();
            return $http.get('view/' + id).then(function successCallback(response) {
                deffered.resolve(response);
                return deffered.promise;

            }, function errorCallback(response) {
                deffered.reject(response);
                return deffered.promise;
            });
        };
    }]);
});