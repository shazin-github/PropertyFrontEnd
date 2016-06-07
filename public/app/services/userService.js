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
            return $http.post("/user/login", data);
        }
        function logout(){
            return $http.get("/user/logout");
        }
        function register(data){
            return $http.post("/user/register", data);
        }
        function getProfile(){
            return $http.get("user/profile");
        }
        function updateProfilePic(form_data){
            return $http.post('user/profile-pic', form_data, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        }
        function updateProfile(){
            return $http.post("user/profile", data);
        }
    }
});