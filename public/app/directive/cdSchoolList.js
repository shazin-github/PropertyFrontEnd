define(function(){
    angular
        .module('coreModule')
        .directive('cdSchoolList' , SchoolList);


    function SchoolList(){
        return {
            restrict:'EA',
            scope:{
                'schoollist': '=schoollist'
            },
            templateUrl:'/Template/directive/schoolTemplate.html'
        }
    }


});