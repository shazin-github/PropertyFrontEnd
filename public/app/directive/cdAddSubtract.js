define(function(){

    angular
        .module('coreModule')
        .directive('cdAddSubtract' , AddSubtract);

    function AddSubtract(){
        var directive = {
            controller: controller,
            templateUrl: '/Template/directive/addSubtractTemplate.html',
            restrict: 'A',
            scope:{
                'option':'=',
                'title' : '@title'
            }
        };
        return directive;

        function controller($scope) {

            $scope.addfunction = function(){
                $scope.option++;
            }
            $scope.subtractfunction = function(){

                var newvlaue = $scope.option--;
                if(newvlaue <= 0){
                    $scope.option= 0;
                }
            }
        }
    }

});