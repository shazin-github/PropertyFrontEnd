 define( ['angular-route'], function() {
    var coreModule = angular.module('coreModule', ['ngRoute'], function($interpolateProvider) {
            $interpolateProvider.startSymbol('<%');
            $interpolateProvider.endSymbol('%>');
        }
    );
    coreModule.config(['$routeProvider','$locationProvider',
        function ($routeProvider , $locationProvider) {
            $routeProvider.when('/', {
                templateUrl: 'profile',
                controller : 'userController'
            }).when('/submit', {
                templateUrl: 'addProperty',
                controller: 'addPropertyController'
            }).when('/properties', {
                templateUrl: 'myProperty',
                controller: 'myPropertyController'
            });
        }]);
    require(['controllers/controllerReference'], function(controllerReference) {
        require(controllerReference, function() {
            angular.bootstrap(document, ['coreModule']);
        });
    });
});