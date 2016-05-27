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


            },
            link:link,
            controller:controller,
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


    angular
        .module('coreModule')
        .directive('cdAutoSearchComplete' , AutoSearchComplete);


    function AutoSearchComplete(){
        var directve = {
            restrict:'A',
            require: 'ngModel',
            scope: {
                ngModel: '=',
            },
            link:link,
        }
        return directve;

        function link(scope, element, attrs){
            var adr_options = {
                types: ['geocode'],
                componentRestrictions: {country: 'pk'}
            };

            var autocomplete_adr = new google.maps.places.Autocomplete(element[0], adr_options);

            autocomplete_adr.addListener('place_changed', function() {

                var place = autocomplete_adr.getPlace();
                if (!place.geometry) {
                   scope.$parent.search_value = '';
                    return;
                }
                scope.$parent.search_value = element.val();
                scope.$parent.lat = place.geometry.location.lat();
                scope.$parent.lng = place.geometry.location.lng();

            });
        }
    }
});