define([
    'services/userService'
],function(){
    angular
        .module('coreModule')
        .controller('userController',userController);

    userController.$inject = ['$scope', 'userService'];
    function userController($scope, userService) {
        var vm = this;

        vm.showProfileImage = false;
        vm.user = {};
        vm.login = login;
        vm.logout = logout;
        vm.userReg = {};
        vm.register = register;
        vm.initProfile = initProfile;
        vm.updateProfile = updateProfile;
        vm.updateProfileFields = updateProfileFields;


        function login(){
            $('#overlay').show();
            userService.login(vm.user).then(function(resp){
                $('#overlay').hide();
                console.log('response', resp);
                if(resp.data.success){
                    echoSuccess('login-form', 'Login Successful');
                    location.reload();
                } else{
                    vm.user.loginErrors = resp.data.msg;
                    $('.alert-danger').show();
                }
            });
        }
        function logout(){
            $('#overlay').show();
            userService.logout().then(function(resp){
                $('#overlay').hide();
                if(resp.data.success){
                    location.href = '/';
                }
            });
        }
        function register(){
            $('#overlay').show();
            userService.register(vm.userReg).then(function(resp){
                $('#overlay').hide();
                if(resp.data.success){
                    echoSuccess('register-form', resp.data.msg);
                    location.href= '/verification';
                }
                else{
                    vm.registerErrors = resp.data.msg;
                    echoErrors('register-form', resp.data.msg);
                }
            });
        }
        function initProfile(){
            vm.user.image_url = "img/profile-avatar.jpg";
            $('#overlay').show();
            userService.getProfile().then(function(resp){
                $('#overlay').hide();
                vm.user = resp.data.msg;

                if(vm.user.image_url != ''){
                    vm.showProfileImage = !vm.showProfileImage;
                    $('#profilePicImage').show(); // todo
                }
                vm.user.confirmPassword = resp.data.msg.password;
            });
        }
        function updateProfile(){
            //alert(vm.user+' has password'+vm.password);
            $('#overlay').show();
            formData = new FormData();
            if(vm.image2 !== undefined) {
                fileData = vm.image2.file;
                formData.append("profilePic", fileData);
                userService.updateProfilePic(formData).then(function(imageResponse){
                    if(imageResponse.data.success){
                        vm.user.image_url = imageResponse.data.image_url; //
                    }
                    vm.updateProfileFields();
                });
            }else{
                vm.updateProfileFields();
            }
        }
        function updateProfileFields(){
            userService.updateProfile(vm.user).then(function(response){
                console.log('RESO', response);
                $('#overlay').hide();
                if(response.data.success){
                    echoSuccess('profileForm', response.data.msg);
                }
                else{
                    $('#overlay').hide();
                    console.log('error', response.data.msg);
                    vm.profileErrors = response.data.msg;
                    echoErrors('profileForm', response.data.msg);
                }
            });
        }

    }

});