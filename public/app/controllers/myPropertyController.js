define(['services/propertyService'], function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('myPropertyController', ['$scope', 'propertyService', function($scope, propertyService) {

        $scope.initMyProperty = function(){
        	$('#overlay').show();
        	propertyService.getUserProperty().then(function(resp){
        		$('#overlay').hide();
        		$scope.propertyList = resp.data.msg;
                
        	});
        };
    }]);
});