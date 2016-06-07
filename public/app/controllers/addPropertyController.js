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
            vm.cityList = {};
            vm.stateList = {};
            vm.address = '';
            vm.imgURL = [];
            vm.inputFiles = [];
            vm.propertyData = {};
            vm.numberOfBeds = 0;
            vm.numberOfBaths = 0;
            vm.areaType = ''
            vm.city = '';
            vm.latitude = '';
            vm.longitude = '';
            vm.areaList = ['Marla', 'Kenal', 'Sq ft'];
            vm.indexSearchPage = false;
            vm.propertyPurposeList = propertyPurposeList;
            vm.propertyTypeList = propertyTypeList;
            vm.propertyCategoryList = propertyCategoryList;
            vm.getCity = getCity;
            vm.getState = getState;
            vm.addProperty = addProperty;


            var activate = function(){

                vm.propertyPurposeList();
                vm.propertyTypeList();
                vm.propertyCategoryList();
                vm.getCity();
                vm.getState();
            }

            activate();

            function propertyPurposeList() {

                $('#overlay').show();
                addPropertyService.getPurposeList().then(function (response) {
                    //$('#overlay').hide();
                    vm.purposeList = response.data.data;

                }, function (response) {
                    $('#overlay').hide();
                });

            }

            function propertyTypeList(){

                //$('#overlay').show();
                addPropertyService.getTypeList().then(function (response) {
                    //$('#overlay').hide();
                    vm.typeList = response.data.data;

                },function (response){
                    $('#overlay').hide();
                });
            }

            function propertyCategoryList(){

                //$('#overlay').show();
                addPropertyService.getCategoryList().then(function (response) {
                    $('#overlay').hide();
                    vm.categoryList = response.data.data;

                },function (response){
                    $('#overlay').hide();
                });
            }

            function getCity(){

                cityService.getAllCities().then(function(res){
                    vm.cityList = res.data.data;
                },function (response){
                    //$('#overlay').hide();
                });
            }

            function getState(){

                stateService.getAllStates().then(function(res){
                    vm.stateList = res.data.data;
                    //console.log(vm.statelist);
                },function (response){
                    //$('#overlay').hide();
                });
            }

            function addProperty() {

                $('#overlay').show();
                formData = new FormData();
                angular.forEach(vm.propertyImages, function (value, key) {
                    formData.append(key, value.file);
                });
                propertyService.addMImage(formData).then(function(imageResponse){
                    if(imageResponse.data.success) {
                        vm.imageUrl = imageResponse.data.image_url;
                    }


                    vm.location = locationService.getLocation(vm.country, vm.state, vm.city, vm.address,
                        vm.zip, vm.latitude, vm.longitude);

                    vm.property = propertyService.getProperty(vm.title, vm.price, vm.area,vm.areaType, vm.description, vm.purpose,
                        vm.type, vm.category, vm.imageUrl);

                    console.log(vm.property);

                    vm.feature = featureService.getFeature(vm.numberOfBeds, vm.numberOfBaths, vm.park, vm.ac,
                        vm.swim, vm.balcony);

                    vm.seller = 0;
                    addPropertyService.addProperty(vm.location, vm.property, vm.feature, vm.seller).then(function(response) {
                        vm.status = response.data.success;
                        vm.msg = response.data.msg;
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
            }
        }

});