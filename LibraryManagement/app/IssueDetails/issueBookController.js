app.controller('issueBookController', function ($scope, $filter, $rootScope, $location, homeService, localStorageService) {

    $scope.Users = [];
    $scope.Books = [];
    $scope.rent;
    $scope.bookData = {};
    $scope.bookId;
    $scope.bookName;
    $scope.ActiveBooks;
    $scope.BooksLeft;
    $scope.updateUserDetails = {};
    $scope.updateBookDetais = {};
    $scope.issuedBooks = [];
    $scope.Quantity;
    $scope.Limit;

    $scope.getUserList = function () {
        homeService.getUserList().then(function (results) {
            $scope.Users = results.data.value;
            localStorageService.set("UserDetailsInIssueBook", $scope.Users);
        });
    }

    $scope.checkIssueLimit = function (userId) {
        $.each($scope.Users, function (value, id) {
            if (id.UserId == userId) {
                if (id.TypeOfUser == "Platinum") {
                    $scope.Limit = 10 - id.ActiveBooksIssued;
                    $scope.updateUserDetails = id;
                }
                if (id.TypeOfUser == "Gold") {
                    $scope.Limit = 7 - id.ActiveBooksIssued;
                    $scope.updateUserDetails = id;
                }
                if (id.TypeOfUser == "Silver") {
                    $scope.Limit = 5 - id.ActiveBooksIssued;
                    $scope.updateUserDetails = id;
                }
            }
        });
        if ($scope.Limit <= 0) {
            alert("The book Limit has been Exhausted");
            $location.path("/userDetails");
        }

    }

    $scope.calculateRent = function (issueBook, bookData) {
        var oneDay = 24 * 60 * 60 * 1000;
        var countOfBook = 0;
        var values = bookData.split('|');
        $scope.bookId = values[0];
        $scope.bookName = values[2];
        if (issueBook.ReturnDate.getTime() > issueBook.IssueDate.getTime()) {
            var diffDays = Math.round(Math.abs((issueBook.IssueDate.getTime() - issueBook.ReturnDate.getTime()) / (oneDay)));
            $scope.rent = diffDays * values[1];
        } else {
            alert("Issue date should be before return date");
        }
        homeService.getissuedBookList().then(function (results) {
            $scope.issuedBooks = results.data.value;
            $.each($scope.issuedBooks, function (detail, id) {
                if (id.BookId == $scope.bookId) {
                    countOfBook = countOfBook + 1;
                }
            }
            );
            $scope.ActiveBooks = countOfBook;
            $.each($scope.Books, function (value, key) {
                if (key.BookId == $scope.bookId) {
                    $scope.Quantity = key.Quantity;
                    $scope.updateBookDetails = key;
                }

            });
            if ($scope.Quantity > $scope.ActiveBooks) {
                $scope.BooksLeft = $scope.Quantity - $scope.ActiveBooks;
            } else {
                alert("book is not available")
                $location.path("/userDetails");
            }
        });

    }

    $scope.getBookList = function () {
        homeService.getBookList().then(function (results) {
            $scope.Books = results.data.value;
           
        });
    }

    $scope.IssueBookDetails = function (IssueBook) {
        localStorageService.set("issueBookDetails", IssueBook);
        $scope.bookDetails = {
            "UserId": IssueBook.UserId,
            "BookId": $scope.bookId,
            "DateOfIssue": IssueBook.IssueDate,
            "DateOfReturn": IssueBook.ReturnDate,
            "TotalRent": $scope.rent.toString()
        };
        homeService.addIssuedBook($scope.bookDetails).then(function (res) {
            alert("Book successfully issued.")
            $scope.updateUserDetails.ActiveBooksIssued = $scope.updateUserDetails.ActiveBooksIssued + 1;
            $scope.updateUserDetails.BooksLeft = $scope.updateUserDetails.BooksLeft - 1;
            homeService.updateUser($scope.updateUserDetails).then(function (updateResult) {
                $scope.updateBookDetails.Quantity = $scope.updateBookDetails.Quantity - 1;
                homeService.updateBook($scope.updateBookDetails).then(function (updateBookResult) {
                    $location.path("/thanku");
                });
            });
        })
    }



});