define(function(){
    angular
        .module('coreModule')
        .directive('cdIndexDropdown',indexDropdown);

    function indexDropdown(){
        return {
            restrict : 'EA',
            require: 'ngModel',
            templateUrl: '/Template/directive/IndexDropdownTemplate.html',
            scope : {
                'option':'=option',
                'type':' =ngModel',
                'title' : '@title',
                'addclass':'@?',
                'inputclass':'@?'


            },
            link:link,
            controller:controller
        }
        function controller($scope){ // following johnpapa

            $scope.Indselectedvalue = Indselectedvalue;

            function Indselectedvalue(selectedval){
                $scope.type = selectedval;
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