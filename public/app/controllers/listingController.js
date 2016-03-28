define(['services/searchService', 'services/geolocatorService', 'services/searchAutoService'], function() {
    var coreModule = angular.module('coreModule');
    coreModule.controller('listingController', ['$scope', 'searchService', 'geolocatorService', 'searchAutoService', function($scope, searchService, geolocatorService, searchAutoService) {
       var map = "";
        geolocatorService.geoLocate(map);
        searchAutoService.getAuto();

        $scope.searchProperty = function() {
            searchService.getSearch()
        }



    }]);
});