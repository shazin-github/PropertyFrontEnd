define([
    'services/locationService',
    'services/propertyService',
    'services/featureService',
    'services/addPropertyService',
    'services/cityService',
    'services/stateService',
    ],
    function() {
    var coreModule = angular.module('coreModule');

    coreModule.controller('addPropertyController', ['$rootScope','$scope', 'locationService' ,'featureService', 'propertyService',  'addPropertyService','cityService','stateService', '$q' , function($rootScope,$scope, locationService, featureService, propertyService, addPropertyService ,cityService ,stateService,$q) {

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
        $scope.purpose = '';



        cityService.getcity().then(function(res){
            $scope.citylist = res.data.data;
        });
        /*
         *
         * */
        stateService.getstate().then(function(res){
            $scope.statelist = res.data.data;
            //console.log($scope.statelist);
        });
        /*
         *
         * */
        $scope.addProperty = function() {


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
            addPropertyService.addProperty($scope.location, $scope.property, $scope.feature,
                $scope.seller).then(function(response) {
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

        $scope.fun_purpose = function() {

            $('#overlay').show();
            addPropertyService.TestService().then(function (response) {
                $('#overlay').hide();
                $scope.purpose_list = response.data.data;
                console.log($scope.purpose_list);
            }, function (response) {
                $('#overlay').hide();
            });
        }

        $scope.fun_purpose();

        $scope.checkStuff = function(value) {
            $scope.purpose = value;
        };


    }]);
});