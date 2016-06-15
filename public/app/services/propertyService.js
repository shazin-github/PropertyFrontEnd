define(function() {
    angular
        .module('coreModule')
        .service('propertyService',propertyService);

    propertyService.$inject =  ['$http', '$q'];

    function propertyService($http, $q){

        return{
            getProperty:getProperty,
            addImage:addImage,
            addMImage:addMImage,
            getUserProperty:getUserProperty,
            getPropertyDetail:getPropertyDetail,
            addView:addView,
            contactAgent:contactAgent

        };

        function contactAgent(formData){
            var deffered = $q.defer();
            return $http.post('/property/contactAgent', formData)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deffered.resolve(response);
                return deffered.promise;
            }

            function errorCallback(response){
                deffered.reject(response);
                return deffered.promise;
            }
        }

        function getProperty(title, price, area,areaType ,description, purpose, type, category, imageUrl){
            return {
                title: title,
                price: price,
                area: area,
                area_type: areaType, // area_type is for DB
                description: description,
                prop_purpose_id: purpose, // prop_purpose_id is for DB
                prop_type_id: type,      // prop_type_id is for DB
                prop_category_id: category, // prop_category_id is for DB
                image_url : imageUrl,  // image_url is for DB
                status: 1
            };
        }

        function addImage(formData){
            var deffered = $q.defer();
            return $http.post('property/M_image', formData ,{
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deffered.resolve(response);
                return deffered.promise;
            }

            function errorCallback(response){
                deffered.reject(response);
                return deffered.promise;
            }
        }

        function addMImage(formData){
            var deffered = $q.defer();
            return $http.post('property/M_image', formData ,{
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deffered.resolve(response);
                return deffered.promise;
            }

            function errorCallback(response){
                deffered.reject(response);
                return deffered.promise;
            }
        }

        function getUserProperty(){
            var deffered = $q.defer();
            return $http.get("property/userProperty")
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deffered.resolve(response);
                return deffered.promise;
            }

            function errorCallback(response){
                deffered.reject(response);
                return deffered.promise;
            }
        }

        function getPropertyDetail(id){
            var deffered = $q.defer();
            return $http.get('detail/' + id)
                .then(successCallback)
                .catch(errorCallback);
            function successCallback(response){
                deffered.resolve(response);
                return deffered.promise;
            }

            function errorCallback(response){
                deffered.reject(response);
                return deffered.promise;
            }
        }

        function addView(id){
            var deffered = $q.defer();
            return $http.get('view/' + id)
                .then(successCallback)
                .catch(errorCallback);
            function successCallback(response){
                deffered.resolve(response);
                return deffered.promise;
            }

            function errorCallback(response){
                deffered.reject(response);
                return deffered.promise;
            }
        }

    }
});