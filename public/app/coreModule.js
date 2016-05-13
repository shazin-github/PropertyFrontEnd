define( ['angular-route'], function() {
    var coreModule = angular.module('coreModule', ['ngRoute'], function($interpolateProvider) {
            $interpolateProvider.startSymbol('<%');
            $interpolateProvider.endSymbol('%>');
        }
    );
    coreModule.config(['$routeProvider','$locationProvider',
        function ($routeProvider , $locationProvider) {
            $routeProvider.when('/my-profile', {
                templateUrl: 'my-profile',
                controller : 'userController'
            }).when('/my-profile#submit', {
                templateUrl: 'addProperty',
                controller: 'addPropertyController'
            }).when('/my-profile#properties', {
                templateUrl: 'properties',
                controller: 'myPropertController'
            });
        }]);
    require(['controllers/controllerReference'], function(controllerReference) {
        require(controllerReference, function() {
            angular.bootstrap(document, ['coreModule']);
        });
    });
});