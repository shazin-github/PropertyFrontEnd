

define(function(){

    angular
        .module('coreModule')
        .directive('modal',model);

    function model() {
            return {
                restrict: 'EA',
                replace: true,
                scope: true,
                templateUrl: '/Template/directive/modelTemplate.html',
                link: postLink,
                controller:controller

            };
            function controller($scope){ //using shared Scope

                $scope.vm.showNext = showNext;
                $scope.vm.showPrevious = showPrevious;
                $scope.vm.closeModal = closeModal;

                function closeModal(){

                        $scope.vm.showModal = !$scope.vm.showModal;
                }

                function showNext(index) {

                    var index = index + 1;

                    if (index < $scope.vm.imageArray.length) {
                        $scope.vm.currentImage = $scope.vm.imageArray[index];
                    }
                    else {
                        index = 0;
                        $scope.vm.currentImage = $scope.vm.imageArray[index];
                    }

                }

                function showPrevious(index) {

                    var index = index - 1;

                    if (index >= 0) {
                        $scope.vm.currentImage = $scope.vm.imageArray[index];
                    } else {
                        index = $scope.vm.imageArray.length - 1;
                        $scope.vm.currentImage = $scope.vm.imageArray[index];
                    }

                }
            }

            function postLink(scope, element, attrs) {


                scope.$watch(attrs.visible, function(value){
                    if(value == true) {

                        $(element).modal('show');
                        $("#sliding").css("display","none");
                    }
                    else
                        $(element).modal('hide');
                    console.log('inner directive hide');
                });

                $(element).on('shown.bs.modal', function(){

                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    //console.log('inner directive hidden');
                    scope.$apply(function(){
                        scope.vm.showModal = false;
                        $("#sliding").css("display","");
                    });
                });



            }
        }


});