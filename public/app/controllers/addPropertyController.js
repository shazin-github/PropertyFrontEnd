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


        angular.element(document).ready(function () {


        });
        //
        //function load(){
        //
        //    console.log("TEst");
        //    var selectbox = angular.element('.select-box city');
        //    selectbox.find('input').on('click',function(){
        //        console.log("Test");
        //    });
        //
        //}
        //function load(){
        //
        //    //var selectbox = angular.element( document.querySelector( '.city' ) );
        //    //console.log(selectbox);
        //    //selectbox.on()
        //    //selectbox.find('ul').slideToggle(150);
        //    ////    selectBox.toggleClass('open');
        //    //selectbox.toggleClass('open');
        //    angular.element('.select-box').each(function(index){
        //
        //            var selectbox =  angular.element('.select-box');
        //            current = index;
        //
        //            selectbox.find('input').on('click' , function(){
        //            console.log("Testing");
        //            selectbox.find('ul').slideToggle(150);
        //            selectbox.toggleClass('open');
        //            angular.element('.select-box').each(function(index){
        //
        //                if(current != index){
        //                    angular.element('.select-box').find('ul').slideUp(150);
        //                    angular.element('.select-box').removeClass('open');
        //                }
        //            });
        //        })
        //    });
        //
        //
        //}
        /*
         *
         * */
        $scope.country = "Pakistan";
        $scope.citylist = {};
        $scope.statelist = {};
        $scope.start = 0;
        $scope.current = 0;
        $scope.result1 = '';
        $scope.imgURL = [];
        $scope.property_data = {};
        $scope.num_beds = 0;
        $scope.num_of_baths = 0;
        $scope.area_type = 'Marla'
        $scope.alpha = false;
        $scope.city = '';
        $scope.arealist = [
            'Marla',
            'Kenal',
            'Sq ft'
        ];

        /*
         *
         * */
        $scope.readURL = function(input, imageField) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#' + imageField).attr('src', e.target.result);
                    $('#' + imageField).show();
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        /*
         *
         * */
        $scope.fileToDataURL = function (file) {

            var deferred = $q.defer();
            var reader = new FileReader();
            reader.onload = function (e) {
                deferred.resolve(e.target.result);
            };
            reader.readAsDataURL(file);
            return deferred.promise;
        };
        /*
         *
         * */
        cityService.getcity().then(function(res){

            $scope.citylist = res.data.data;
            //console.log($scope.citylist);
        })
        /*
         *
         * */
        stateService.getstate().then(function(res){
            $scope.statelist = res.data.data;
            //console.log($scope.statelist);
        })
        /*
         *
         * */
        $scope.addProperty = function() {


            $('#overlay').show();
            form_data= new FormData();
            file_data = $("#propImages").prop("files");

            console.log(file_data);
            angular.forEach(file_data, function (value, key) {
                form_data.append(key, value);
            });

            console.log(form_data);

            //return;


            propertyService.addMImage(form_data).then(function(image_resp){
                if(image_resp.data.success) {
                    $scope.image_url = image_resp.data.image_url;
                }

            $scope.address = $scope.result1;
            $scope.latitude = $("#latitude").val();
            $scope.longitude = $("#longitude").val();
            $scope.city = $("#city").val();
            $scope.state = $("#state").val();
            $scope.location = locationService.getLocation($scope.country, $scope.state, $scope.city, $scope.address,
                $scope.zip, $scope.latitude, $scope.longitude);

            $scope.property = propertyService.getProperty($scope.title, $scope.price, $scope.area,$scope.area_type, $scope.description, $scope.purpose,
                $scope.type, $scope.category, $scope.image_url);

            $scope.bed = $("#bed").val();
            $scope.bath = $("#bath").val();
            $scope.feature = featureService.getFeature($scope.bed, $scope.bath, $scope.park, $scope.ac,
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
        /*
         *
         * */
        $scope.initiate = function() {

           // console.log('select-box test');

            //jQuery('.select-box').each(function (index) {
                //var selectBox = jQuery(this),
                //    current = index;
                //console.log(selectBox);
                //
                //selectBox.find('input').on('click', function () {
                //    selectBox.find('ul').slideToggle(150);
                //    selectBox.toggleClass('open');
                //
                //    jQuery('.select-box').each(function (index) {
                //        if (index != current) {
                //            jQuery(this).find('ul').slideUp(150);
                //            jQuery(this).removeClass('open');
                //        }
                //    });
                //});


                //jQuery(document).on('click', function () {
                //    selectBox.removeClass('open');
                //    selectBox.find('ul').slideUp(150);
                //});
                //
                //selectBox.on('click', function (e) {
                //    e.stopPropagation();
                //});
            //});
            angular.element('.select-box').each(function(index){

                var selectbox =  angular.element(this),
                                current = index;

                //console.log(current);

                selectbox.find('input').on('click' , function(){
                    selectbox.find('ul').slideToggle(150);
                    selectbox.toggleClass('open');

                    angular.element('.select-box').each(function(index){

                        if(current !== index){
                            angular.element(this).find('ul').slideUp(150);
                            angular.element(this).removeClass('open');
                        }
                    });
                });

                selectbox.on('click', function (e) {
                    e.stopPropagation();
                });

            });

        };
        /*
         *
         * */
        $scope.setstate = function(stateid) {


            var selectBox = jQuery('#stateSelectBox');

            selectBox.find('input').attr('value', stateid);
            selectBox.find('ul').slideToggle(150);
            selectBox.toggleClass('open');
            selectBox.find('input').addClass('has-value');

        }
        /*
         *
         * */
        $scope.setareatype = function(type) {

            var selectBox = jQuery('#selectAreatype');
            $scope.area_type = type
            selectBox.find('ul').slideToggle(150);
            selectBox.toggleClass('open');
            selectBox.find('input').addClass('has-value');



        }
        /*
         *
         * */
        $scope.doStuff = function (item) {
            console.log(item.currentTarget);

        };
        /*
        *
        * */
        $scope.setCity = function(cityID) {
            var selectBox = jQuery('#citySelectBox');

            selectBox.find('input').attr('value', cityID);
            selectBox.find('city-list ul').slideToggle(150);
            selectBox.toggleClass('open');
            selectBox.find('input').addClass('has-value');


        }
        /*
        *
        * */
        $scope.subClick = function(){
           $scope.num_beds--;
            if($scope.num_beds < 0)
                $scope.num_beds = 0;
        }
        /*
         *
         * */
        $scope.addClick = function(){
            $scope.num_beds++;
        }
        /*
         *
         * */
        $scope.subbathsClick = function(){
            $scope.num_of_baths--;
            if($scope.num_of_baths < 0)
                $scope.num_of_baths = 0;
        }
        /*
         *
         * */
        $scope.addbathsClick = function(){
            $scope.num_of_baths++;
        }


    }]);
});