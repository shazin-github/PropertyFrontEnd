define([
    'jquery',
    'jquery-ui',
    'bxslider',
    'marquee',
    'nouislider',
    'modernizr',
    'imagesloaded',
    'smooth-scroll',
    'owl-carousel',
    'isotope',
    'theia',
    'lightbox',
    'options',
    'angular',
],function() {
    var coreModule = angular.module('coreModule', []);
    require(['controllers/controllerReference'], function(controllerReference) {
        require(controllerReference, function() {
            angular.bootstrap(document, ['app']);
        });
    });

});