define(function(){
    angular
        .module('coreModule')
        .directive('cdRadioButton',funRadioButton);

    function funRadioButton(){
        return {
            restrict : 'EA',
            require: 'ngModel',
            templateUrl: '/Template/directive/RadioButtonTemplate.html',
            scope : {
                'option':'=option',
                'modeltype':' =ngModel',
                'title' : '@title'


            },
            controller:controller
        };
        function controller($scope){
            $scope.checkStuff = checkStuff;

            function checkStuff(value) {
                $scope.modeltype = value;
            }
        }
    }

});