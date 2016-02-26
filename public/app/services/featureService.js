define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('cityService', function() {
        this.city = 'New York';
    });
});