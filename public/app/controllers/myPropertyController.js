define([
    'services/propertyService'
    ],
    function() {
        angular
            .module('coreModule')
            .controller('myPropertyController',myPropertyController);

        myPropertyController.$inject = ['$scope', 'propertyService'];

        function myPropertyController($scope, propertyService){

            var vm = this;

            vm.initMyProperty = initMyProperty;
            vm.parseImageUrl = parseImageUrl;
            vm.propertyData = [];

            function initMyProperty(){
                $('#overlay').show();
                propertyService.getUserProperty().then(function(response){
                    $('#overlay').hide();
                    var data = response.data.msg;
                    vm.parseImageUrl(data);
                },function(response){

                });
            }

            function parseImageUrl(data){

                angular.forEach(data, function (value, key) {
                    var obj = value;
                    var imageUrl = obj.image_url.split("|");
                    obj.image_url = 'propertyimage/'+imageUrl[0]; // image_url variable from Database
                    vm.propertyData.push(obj);
                });

                vm.propertyList = vm.propertyData;
            }
        }
});