define(function() {
    var coreModule = angular.module('coreModule', ['ngRoute']);

    require(['controllers/controllerReference'], function(controllerReference) {
        require(controllerReference, function() {
            angular.bootstrap(document, ['coreModule']);
        });
    });

});