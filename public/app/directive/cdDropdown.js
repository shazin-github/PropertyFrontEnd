define(function(){

    angular
        .module('coreModule')
        .directive('cdDropdown',funDropdown);

    function funDropdown(){
        return {
            restrict : 'EA',
            require: 'ngModel',
            replace : false,
            templateUrl: '/Template/directive/dropdownTemplate.html',
            scope : {
                'option':'=option',
                'type':' =ngModel',
                'title' : '@title'

            },
            link:link,
            controller:controller
        };
        function controller($scope){ // following johnpapa
            $scope.isopenclass = false;
            $scope.classopen = classopen;
            $scope.selectedvalue = selectedvalue;

            function selectedvalue(selectedval){
                $scope.type = selectedval;
            }
            function classopen(){
                $scope.isopenclass = !$scope.isopenclass;
            }

        }
        function link(scope, element, attrs ,ctrl){
            var selectbox = element.find('.select-box');

            angular.element(document).on('click',function(){

                selectbox.find('ul').slideUp(150);
                selectbox.removeClass('open');
            });

            selectbox.on('click' , function(){
                selectbox.find('ul').slideToggle(150);
                selectbox.toggleClass('open');
            });

            selectbox.find('ul li').on('click' , function(){
                selectbox.find('ul').slideToggle(150);
                selectbox.toggleClass('open');
                selectbox.find('input').addClass('has-value');
            });

            selectbox.on('click', function (e) {
                e.stopPropagation();
            });


        }
    }
});