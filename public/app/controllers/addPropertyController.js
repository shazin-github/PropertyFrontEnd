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



    coreModule.directive('cityList' , function($compile){
        return {
            restrict : 'EA',
            scope   :{
                cities: '=city',
                onClick:'&',
                start: '@',
                current: '@'

            },
            templateUrl: 'property/citytemplate',
            link: function(scope, element, attrs) {
                $compile(element.contents())(scope.$new());
            }
            //controller:function($scope){
            //
            // console.log($scope.cities);
            // }
        }
    } );

    coreModule.directive('stateList' , function($compile){
        return {
            restrict : 'EA',
            scope : {
                statelist : '=state',
                onClick : '&'
            },
            templateUrl: 'property/statetemplate',
            link: function(scope, element, attrs) {
                $compile(element.contents())(scope.$new());
            }
        }
    });
    coreModule.controller('addPropertyController', ['$scope', 'locationService' ,'featureService', 'propertyService',  'addPropertyService','cityService','stateService', function($scope, locationService, featureService, propertyService, addPropertyService ,cityService ,stateService) {
        $scope.country = "Pakistan";
        $scope.citylist = {};
        $scope.statelist = {};
        $scope.start = 0;
        $scope.current = 0;


        cityService.getcity().then(function(res){

            $scope.citylist = res.data.data;
            //console.log($scope.citylist);
        })

        stateService.getstate().then(function(res){
            $scope.statelist = res.data.data;
            //console.log($scope.statelist);
        })

        $("#propImages").change(function() {
            fsize = this.files[0].size; //get file size
            ftype = $('#propImages')[0].files[0].type; // get file type
            file_size_limit = 60 * 1024 * 1024;
            console.log("123");
            if (fsize > file_size_limit) {
                alert('Maximum allowed size is 60 MB');
            } else if(! (ftype == 'image/jpeg' || ftype == 'image/jpg' || ftype == 'image/gif') ) {
                alert('Allowed file types are jpeg, jpg and gif');
            } else {
                readURL(this, 'propertyImage');
            }
        });

        $scope.addProperty = function() {
            $('#overlay').show();
            form_data= new FormData();
            file_data = $("#propImages").prop("files")[0];
            form_data.append("propImages", file_data);

            propertyService.addImage(form_data).then(function(image_resp){
                if(image_resp.data.success){
                    $scope.image_url = image_resp.data.image_url;
                }

            $scope.address = $("#address").val();
            $scope.latitude = $("#latitude").val();
            $scope.longitude = $("#longitude").val();
            $scope.city = $("#city").val();
            $scope.state = $("#state").val();
            $scope.location = locationService.getLocation($scope.country, $scope.state, $scope.city, $scope.address,
                $scope.zip, $scope.latitude, $scope.longitude);

            $scope.property = propertyService.getProperty($scope.title, $scope.price, $scope.area, $scope.description, $scope.purpose,
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



        $scope.setCity = function(cityID) {
            var selectBox = jQuery('#citySelectBox');

            selectBox.find('input').attr('value', cityID);
            selectBox.find('city-list ul').slideToggle(150);
            selectBox.toggleClass('open');
            selectBox.find('input').addClass('has-value');


        }

        $scope.initiate = function() {

                jQuery('.select-box').each(function (index) {
                    var selectBox = jQuery(this),
                        current = index;


                    selectBox.find('input').on('click', function () {
                        selectBox.find('ul').slideToggle(150);
                        selectBox.toggleClass('open');

                        jQuery('.select-box').each(function (index) {
                            if (index != current) {
                                jQuery(this).find('ul').slideUp(150);
                                jQuery(this).removeClass('open');
                            }
                        });
                    });


                    jQuery(document).on('click', function () {
                        selectBox.removeClass('open');
                        selectBox.find('ul').slideUp(150);
                    });

                    selectBox.on('click', function (e) {
                        e.stopPropagation();
                    });
                });

        }

        $scope.setstate = function(stateid) {

            var selectBox = jQuery('#stateSelectBox');

            selectBox.find('input').attr('value', stateid);
            selectBox.find('ul').slideToggle(150);
            selectBox.toggleClass('open');
            selectBox.find('input').addClass('has-value');

        }


        $scope.initiate();
    }]);
});