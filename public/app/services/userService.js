define(function() {
    angular
        .module('coreModule')
        .service('userService', userService);

    userService.$inject = ['$http', '$q'];

    function userService($http, $q) {

        return {
            login:login,
            logout:logout,
            register:register,
            getProfile:getProfile,
            updateProfilePic:updateProfilePic,
            updateProfile:updateProfile
        };

        function login(data){

            var deferred = $q.defer();
            return $http.post("/user/login", data)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deferred.resolve(response);
                return deferred.promise;
            }

            function errorCallback(response){
                deferred.reject(response);
                return deferred.promise;
            }
        }
        function logout(){

            var deferred = $q.defer();
            return $http.get("/user/logout")
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deferred.resolve(response);
                return deferred.promise;
            }

            function errorCallback(response){
                deferred.reject(response);
                return deferred.promise;
            }
        }
        function register(data){

            var deferred = $q.defer();
            return $http.post("/user/register", data)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deferred.resolve(response);
                return deferred.promise;
            }

            function errorCallback(response){
                deferred.reject(response);
                return deferred.promise;
            }
        }
        function getProfile(){

            var deferred = $q.defer();
            return $http.get("user/profile")
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deferred.resolve(response);
                return deferred.promise;
            }

            function errorCallback(response){
                deferred.reject(response);
                return deferred.promise;
            }
        }
        function updateProfilePic(form_data){

            var deferred = $q.defer();
            return $http.post('user/profile-pic', form_data, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deferred.resolve(response);
                return deferred.promise;
            }

            function errorCallback(response){
                deferred.reject(response);
                return deferred.promise;
            }
        }
        function updateProfile(data){

            var deferred = $q.defer();
            return $http.post("user/profile", data)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response){
                deferred.resolve(response);
                return deferred.promise;
            }

            function errorCallback(response){
                deferred.reject(response);
                return deferred.promise;
            }
        }
    }
});