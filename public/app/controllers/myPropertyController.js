define(['services/propertyService'], function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('myPropertyController', ['$scope', 'propertyService', function($scope, propertyService) {

        $scope.initMyProperty = function(){
        	$('#overlay').show();
        	propertyService.getUserProperty().then(function(resp){
        		$('#overlay').hide();

                var prop_data = resp.data.msg;
                $scope.data2 = [];

                angular.forEach(prop_data, function (value, key) {
                    var obj = value;
                    var update_p = obj.image_url.split("|");
                    obj.image_url = 'propertyimage/'+update_p[0];
                    console.log(obj.image_url);
                    $scope.data2.push(obj);
                });
                console.log($scope.data2);
        		$scope.propertyList = $scope.data2;
                
        	});
        };
    }]);
});