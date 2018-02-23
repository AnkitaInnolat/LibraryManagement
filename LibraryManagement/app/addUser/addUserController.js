app.controller('addUserController', function ($scope, $rootScope, $location, homeService, localStorageService) {


    $scope.userDetails = {};

    $scope.addUserDetails = function (AddUser) {
        localStorageService.set('UserDetails', AddUser);
        if (null != AddUser.TypeOfUser && AddUser.TypeOfUser == 10) {
            AddUser.BooksLeft = AddUser.TypeOfUser;
            AddUser.TypeOfUser = "Platinum";
        } else if (null != AddUser.TypeOfUser && AddUser.TypeOfUser == 7) {
            AddUser.BooksLeft = AddUser.TypeOfUser;
            AddUser.TypeOfUser = "Gold";
        } else {
            AddUser.BooksLeft = AddUser.TypeOfUser;
            AddUser.TypeOfUser = "Silver";
        }

        $scope.userDetails = {
            "UserName": AddUser.Name,
            "Address": AddUser.address,
            "TypeOfUser":AddUser.TypeOfUser,
            "ActiveBooksIssued":0,
            "BooksLeft":AddUser.BooksLeft,
            "IsActive":AddUser.IsActive,
            "Phone_Number":AddUser.PhoneNumber.toString()
        };

       
        homeService.addUser($scope.userDetails).then(function (results) {
            $location.path("/thanku");
        })

    }


});