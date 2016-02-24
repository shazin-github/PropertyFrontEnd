define(['services/cityService'], function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('addPropertyController', ['$scope', 'cityService', function($scope, cityService) {
        $scope.title = 'My Property';
    }]);
});