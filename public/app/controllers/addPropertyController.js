define([
    'services/locationService',
    'services/propertyService',
    'services/featureService',
    'services/addPropertyService',
    'services/cityService',
    'services/stateService',
    ],
    function() {
        angular
            .module('coreModule')
            .controller('addPropertyController' , addPropertyController);


        addPropertyController.$inject = ['$rootScope','$scope', 'locationService' ,'featureService', 'propertyService',  'addPropertyService','cityService','stateService', '$q'];


        function addPropertyController($rootScope,$scope, locationService, featureService, propertyService, addPropertyService ,cityService ,stateService,$q){

            var vm = this;

            vm.country = "Pakistan";
            vm.citylist = {};
            vm.statelist = {};
            vm.address = '';
            vm.imgURL = [];
            vm.inputFiles = [];
            vm.property_data = {};
            vm.num_beds = 0;
            vm.num_of_baths = 0;
            vm.area_type = ''
            vm.alpha = false;
            vm.city = '';
            vm.latitude = '';
            vm.longitude = '';
            vm.arealist = ['Marla', 'Kenal', 'Sq ft'];
            vm.indexSearchPage = false;
            vm.property_purpose_list = property_purpose_list;
            vm.prop_Gettypes = prop_Gettypes;
            vm.prop_Getcatetory = prop_Getcatetory;
            vm.GetCity = GetCity;
            vm.GetState = GetState;
            vm.addProperty = addProperty;


            var activate = function(){

                vm.property_purpose_list();
                vm.prop_Gettypes();
                vm.prop_Getcatetory();
                vm.GetCity();
                vm.GetState();
            }

            activate();

            function property_purpose_list() {

                $('#overlay').show();
                addPropertyService.TestService().then(function (response) {
                    //$('#overlay').hide();
                    vm.purpose_list = response.data.data;
                    //console.log("Purpose =>"+vm.purpose_list);

                }, function (response) {
                    $('#overlay').hide();
                });

            }

            function prop_Gettypes(){

                //$('#overlay').show();
                addPropertyService.gettypesService().then(function (response) {
                    //$('#overlay').hide();
                    vm.types_list = response.data.data;
                    //console.log("Type =>"+vm.types_list);
                },function (response){
                    $('#overlay').hide();
                });
            };

            function prop_Getcatetory(){

                //$('#overlay').show();
                addPropertyService.getcategoryService().then(function (response) {
                    $('#overlay').hide();
                    vm.category_list = response.data.data;
                    //console.log("Category =>"+vm.category_list);
                },function (response){
                    $('#overlay').hide();
                });
            };

            function GetCity(){

                cityService.getcity().then(function(res){
                    vm.citylist = res.data.data;
                },function (response){
                    //$('#overlay').hide();
                });
            }

            function GetState(){

                stateService.getstate().then(function(res){
                    vm.statelist = res.data.data;
                    //console.log(vm.statelist);
                },function (response){
                    //$('#overlay').hide();
                });
            }

            function addProperty() {

                $('#overlay').show();
                form_data= new FormData();
                angular.forEach(vm.prop_images, function (value, key) {
                    form_data.append(key, value.file);
                });
                console.log("Form Data "+form_data);
                propertyService.addMImage(form_data).then(function(image_resp){
                    if(image_resp.data.success) {
                        vm.image_url = image_resp.data.image_url;
                        console.log(vm.image_url);
                    }


                    vm.location = locationService.getLocation(vm.country, vm.state, vm.city, vm.address,
                        vm.zip, vm.latitude, vm.longitude);

                    vm.property = propertyService.getProperty(vm.title, vm.price, vm.area,vm.area_type, vm.description, vm.purpose,
                        vm.type, vm.category, vm.image_url);

                    console.log(vm.property);

                    vm.feature = featureService.getFeature(vm.num_beds, vm.num_of_baths, vm.park, vm.ac,
                        vm.swim, vm.balcony);

                    vm.seller = 0;
                    addPropertyService.addProperty(vm.location, vm.property, vm.feature, vm.seller).then(function(response) {
                        vm.status = response.data.success;
                        vm.msg = response.data.msg;
                        console.log(vm.status);
                        $('#overlay').hide();
                        $('html, body').animate({'scrollTop': $("#resultDiv").offset().top-100}, 500);
                    }, function(response) {
                        vm.status = response.data.success;
                        vm.msg = response.data.msg;
                        console.log(vm.status);
                        $('#overlay').hide();
                        $('html, body').animate({'scrollTop': $("#resultDiv").offset().top-100}, 500);
                    });
                });
            };
        }

});