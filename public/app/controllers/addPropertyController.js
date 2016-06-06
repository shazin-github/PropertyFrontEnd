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



            $scope.country = "Pakistan";
            $scope.citylist = {};
            $scope.statelist = {};
            $scope.address = '';
            $scope.imgURL = [];
            $scope.inputFiles = [];
            $scope.property_data = {};
            $scope.num_beds = 0;
            $scope.num_of_baths = 0;
            $scope.area_type = ''
            $scope.alpha = false;
            $scope.city = '';
            $scope.latitude = '';
            $scope.longitude = '';
            $scope.arealist = ['Marla', 'Kenal', 'Sq ft'];
            $scope.indexSearchPage = false;
            $scope.prop_Getpurpose = prop_Getpurpose;
            $scope.prop_Gettypes = prop_Gettypes;
            $scope.prop_Getcatetory = prop_Getcatetory;
            $scope.GetCity = GetCity;
            $scope.GetState = GetState;
            $scope.addProperty = addProperty;


            var activate = function(){

                console.log("Test");

                $scope.prop_Getpurpose();
                $scope.prop_Gettypes();
                $scope.prop_Getcatetory();
                $scope.GetCity();
                $scope.GetState();
            }

            activate();

            function prop_Getpurpose() {
                console.log("Test p");
                $('#overlay').show();
                addPropertyService.TestService().then(function (response) {
                    //$('#overlay').hide();
                    $scope.purpose_list = response.data.data;
                    //console.log("Purpose =>"+$scope.purpose_list);

                }, function (response) {
                    $('#overlay').hide();
                });

            }

            function prop_Gettypes(){
                console.log("Test t");
                //$('#overlay').show();
                addPropertyService.gettypesService().then(function (response) {
                    //$('#overlay').hide();
                    $scope.types_list = response.data.data;
                    //console.log("Type =>"+$scope.types_list);
                },function (response){
                    $('#overlay').hide();
                });
            };

            function prop_Getcatetory(){
                console.log("Test c ");
                //$('#overlay').show();
                addPropertyService.getcategoryService().then(function (response) {
                    $('#overlay').hide();
                    $scope.category_list = response.data.data;
                    //console.log("Category =>"+$scope.category_list);
                },function (response){
                    $('#overlay').hide();
                });
            };

            function GetCity(){
                console.log("Test ci");
                cityService.getcity().then(function(res){
                    $scope.citylist = res.data.data;
                },function (response){
                    //$('#overlay').hide();
                });
            }

            function GetState(){

                console.log("Test s ");
                stateService.getstate().then(function(res){
                    $scope.statelist = res.data.data;
                    //console.log($scope.statelist);
                },function (response){
                    //$('#overlay').hide();
                });
            }

            function addProperty() {

                $('#overlay').show();
                form_data= new FormData();
                angular.forEach($scope.inputFiles, function (value, key) {
                    form_data.append(key, value);
                });

                propertyService.addMImage(form_data).then(function(image_resp){
                    if(image_resp.data.success) {
                        $scope.image_url = image_resp.data.image_url;
                    }

                    $scope.location = locationService.getLocation($scope.country, $scope.state, $scope.city, $scope.address,
                        $scope.zip, $scope.latitude, $scope.longitude);

                    $scope.property = propertyService.getProperty($scope.title, $scope.price, $scope.area,$scope.area_type, $scope.description, $scope.purpose,
                        $scope.type, $scope.category, $scope.image_url);

                    console.log($scope.property);

                    $scope.feature = featureService.getFeature($scope.num_beds, $scope.num_of_baths, $scope.park, $scope.ac,
                        $scope.swim, $scope.balcony);

                    $scope.seller = 0;
                    addPropertyService.addProperty($scope.location, $scope.property, $scope.feature, $scope.seller).then(function(response) {
                        $scope.status = response.data.success;
                        $scope.msg = response.data.msg;
                        console.log($scope.status);
                        $('#overlay').hide();
                        $('html, body').animate({'scrollTop': $("#resultDiv").offset().top-100}, 500);
                    }, function(response) {
                        $scope.status = response.data.success;
                        $scope.msg = response.data.msg;
                        console.log($scope.status);
                        $('#overlay').hide();
                        $('html, body').animate({'scrollTop': $("#resultDiv").offset().top-100}, 500);
                    });
                });
            };
        }

});