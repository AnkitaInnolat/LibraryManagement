app.controller('headerController', function ($scope, $rootScope,$location) {


    $scope.addUser = function () {
        $location.path("/addUser");
    }

    $scope.addBook = function () {
        $location.path("/addBook");
    }

    $scope.issueBook = function () {
        $location.path("/issueBook");
    }

});