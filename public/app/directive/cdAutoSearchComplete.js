define(function(){
    angular
        .module('coreModule')
        .directive('cdAutoSearchComplete' , AutoSearchComplete);


    function AutoSearchComplete(){
        var directve = {
            restrict:'A',
            require: 'ngModel',
            scope: {
                ngModel: '=',
                searchValue:'=?',
                lat:'=?',
                lng:'=?'
            },
            link:link,
        }
        return directve;

        function link(scope, element, attrs ,controller){
            var adr_options = {
                types: ['geocode'],
                componentRestrictions: {country: 'pk'}
            };

            var autocomplete_adr = new google.maps.places.Autocomplete(element[0], adr_options);

            autocomplete_adr.addListener('place_changed', function() {

                var place = autocomplete_adr.getPlace();
                scope.$apply(function(){
                    if (!place.geometry) {
                        scope.searchValue = '';
                        scope.lat = '';
                        scope.lng = '';
                        return;
                    }
                    console.log(element.val());
                    scope.searchValue = element.val();
                    scope.lat = place.geometry.location.lat();
                    scope.lng = place.geometry.location.lng();
                    controller.$setViewValue(element.val());
                });




            });
        }

    }
});