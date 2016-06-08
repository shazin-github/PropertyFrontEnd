

define(function(){

    angular
        .module('coreModule')
        .directive('modal',model);

    function model() {
            return {
                restrict: 'EA',
                transclude: true,
                replace: true,
                scope: true,
                templateUrl: '/Template/directive/modelTemplate.html',
                link: postLink,

            }
            function postLink(scope, element, attrs) {
                scope.$watch(attrs.visible, function(value){
                    if(value == true) {
                        //console.log('inner directive show');
                        $(element).modal('show');
                        $("#sliding").css("display","none");
                    }
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function(){
                    //console.log('inner directive');
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    //console.log('inner directive hidden');
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;
                        $("#sliding").css("display","");
                    });
                });

                //$(element).on('click' ,'a.close' , function(){
                //    console.log('inner directive hidden');
                //    scope.$apply(function(){
                //
                //        scope.$parent.showModal = false;
                //        console.log(scope)
                //        $("#sliding").css("display","");
                //    });
                //});

            }
        }

    angular
        .module('coreModule')
        .directive('cdSchoolList' , SchoolList);


    function SchoolList(){
        return {
            restrict:'EA',
            scope:{
                'schoollist': '=schoollist',
            },
            templateUrl:'/Template/directive/schoolTemplate.html'
        }
    }


});