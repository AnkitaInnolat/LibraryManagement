app.controller('userController', function ($scope, $rootScope, homeService) {

    $scope.Users = [];

    $scope.getUserList = function () {
        homeService.getUserList().then(function (results) {
            $scope.Users = results.data.value;

        });
    }
});