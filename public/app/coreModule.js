define(function() {
    var coreModule = angular.module('coreModule', []);
    require(['controllers/controllerReference'], function(controllerReference) {
        require(controllerReference, function() {
            angular.bootstrap(document, ['app']);
        });
    });

});