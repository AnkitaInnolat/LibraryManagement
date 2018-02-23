app.controller('addBookController', function ($scope, $rootScope, $location, localStorageService, homeService) {

    $scope.bookDetails = {};


    $scope.submitBookDetails = function (AddBook) {
        localStorageService.set("bookDetails", AddBook);
        $scope.bookDetails = {
            "BookName": AddBook.bookName,
            "Author": AddBook.Author,
            "IsActive": AddBook.IsActive,
            "Rent": AddBook.Rent,
            "Price": AddBook.Price,
            "Quantity": AddBook.Quantity
        };

    homeService.addBook($scope.bookDetails).then(function (res) {
        $location.path("/thanku");
    })
    }

});