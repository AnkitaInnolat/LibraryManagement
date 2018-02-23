app.controller('addUserController', function ($scope, $rootScope, $location, homeService, localStorageService) {


    $scope.userDetails = {};

    $scope.addUserDetails = function (AddUser) {
        localStorageService.set('UserDetails', AddUser);
        if (null != AddUser.TypeOfUser && AddUser.TypeOfUser == 10) {
            AddUser.BooksLeft = AddUser.TypeOfUser - AddUser.ActiveBooksIssued;
            AddUser.TypeOfUser = "Platinum";
        } else if (null != AddUser.TypeOfUser && AddUser.TypeOfUser == 7) {
            AddUser.BooksLeft = AddUser.TypeOfUser - AddUser.ActiveBooksIssued;
            AddUser.TypeOfUser = "Gold";
        } else {
            AddUser.BooksLeft = AddUser.TypeOfUser - AddUser.ActiveBooksIssued;
            AddUser.TypeOfUser = "Silver";
        }

        $scope.userDetails = {
            "UserName": AddUser.Name,
            "Address": AddUser.address,
            "TypeOfUser":AddUser.TypeOfUser,
            "ActiveBooksIssued":AddUser.ActiveBooksIssued,
            "BooksLeft":AddUser.BooksLeft,
            "IsActive":AddUser.IsActive,
            "Phone_Number":AddUser.PhoneNumber.toString()
        };

       
        homeService.addUser($scope.userDetails).then(function (results) {
            if (results.status == 200 || results.status == 200) {
                alert("User successfully added.")
            }
            else {
                alert("Error while registering the user");
            }

        })

    }


});