define([
    'services/userService',
    'services/planService'
],function(){
    angular
        .module('coreModule')
        .controller('userController',userController);

    userController.$inject = ['$scope', 'userService' , 'planService'];
    function userController($scope, userService , planService) {
        var vm = this;

        vm.showProfileImage = false;
        vm.user = {};
        vm.updateUserType = {};
        vm.login = login;
        vm.logout = logout;
        vm.userReg = {};
        vm.planData = {};
        vm.userReg.isAgent = false;
        vm.paymentGateway=false;
        vm.userpackage = {};
        vm.register = register;
        vm.initProfile = initProfile;
        vm.updateProfile = updateProfile;
        vm.updateProfileFields = updateProfileFields;
        vm.getUserPlan  =  getUserPlan;
        vm.userType = 'seller';
        vm.paymentStatus = false;
        vm.userPlan = 0;
        vm.isAgent = false;
        vm.user.planWidget = false;
        vm.changeUserType = changeUserType;
        vm.changePlan = changePlan;
        vm.paymentMethod = paymentMethod;

        function paymentMethod(){
            $('#overlay').show();
            userService.updatePlan(vm.planData).then(function(response){
                $('#overlay').hide();
                 if(response.data.success){
                     vm.paymentStatus = true;
                     vm.msg = "Successfully";
                     echoSuccess('paymentForm', 'Successfully');
                 }
            });
        }

        function changePlan(planId){
            //$('#overlay').show();
            vm.planData = {
                planId : planId
            };
            vm.paymentGateway = !vm.paymentGateway;
           //userService.updatePlan(data).then(function(response){
           //    $('#overlay').hide();
           //     if(response.data.success){
           //         vm.paymentGateway = !vm.paymentGateway;
           //     }
           //});
        }


        function changeUserType(){
            $('#overlay').show();

            vm.updateUserType.id = vm.user.id;
            vm.updateUserType.is_agent = 1;
            userService.switchtoAgent(vm.updateUserType).then(function(response){
                vm.user.is_agent = 1;
                $('#overlay').hide();

                console.log(response);
            });
        }

        $scope.$watch("vm.userType",function(value , oldvalue){
            if(value == 'agent'){
                vm.isAgent = true;
            }else{
                vm.isAgent = false;
            }
        });

        function getUserPlan(){
            $('#overlay').show();
            planService.getPlanList().then(function(response){
                console.log(response);
                $('#overlay').hide();
                if(response.data.success){
                    vm.planList = response.data.msg;
                }
            });
        }

        vm.getUserPlan();

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

            vm.userReg.package_id = vm.userPlan;
            if(vm.userType == 'agent'){
                vm.userReg.is_agent = 1;
                vm.userReg.is_seller = 0;
                vm.userReg.is_buyer = 0;
            }
            if(vm.userType == 'seller'){
                vm.userReg.is_agent = 0;
                vm.userReg.is_seller = 1;
                vm.userReg.is_buyer = 0;
            }
            if(vm.userType == 'buyer'){
                vm.userReg.is_agent = 0;
                vm.userReg.is_seller = 0;
                vm.userReg.is_buyer = 1;
            }
            console.log(vm.userReg);
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

                vm.user = resp.data.msg;

                if(vm.user.image_url != ''){
                    vm.showProfileImage = !vm.showProfileImage;
                    $('#profilePicImage').show(); // todo
                }
                vm.user.confirmPassword = resp.data.msg.password;
                planService.getPlanDetail(vm.user.package_id).then(function(response){
                    $('#overlay').hide();
                    if(response.data.success){
                        vm.userpackage.planWidget = true;
                        vm.userpackage.planDetail = response.data.msg;
                    }
                },function(response){
                    $('#overlay').hide();
                });
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
                //console.log("Images not updated");
                vm.updateProfileFields();
            }
        }
        function updateProfileFields(){

            userService.updateProfile(vm.user).then(function(response){

                //console.log('RESO', response);
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