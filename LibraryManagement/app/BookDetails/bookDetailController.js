app.controller('bookController', function ($scope, $rootScope, homeService) {

    $scope.Books = [];

    $scope.getBookList = function () {
        homeService.getBookList().then(function (results) {
            $scope.Books = results.data.value;

        });
    }
});