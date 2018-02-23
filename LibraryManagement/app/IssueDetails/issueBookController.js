app.controller('issueBookController', function ($scope, $filter, $rootScope, $location, homeService, localStorageService) {

    $scope.Users = [];
    $scope.Books = [];
    $scope.rent;
    $scope.bookData = {};
    $scope.bookId;

    $scope.getUserList = function () {
        homeService.getUserList().then(function (results) {
            $scope.Users = results.data.value;
        });
    }

    $scope.calculateRent = function (issueBook, bookData) {
        alert("I am here to calculate rent");
        var oneDay = 24 * 60 * 60 * 1000;
        if( issueBook.ReturnDate.getTime()>issueBook.IssueDate.getTime()){
            var diffDays = Math.round(Math.abs((issueBook.IssueDate.getTime() - issueBook.ReturnDate.getTime()) / (oneDay)));
        } else {
            alert("Issue date should be before return date");
        }
        var values = bookData.split('|');
        $scope.rent = diffDays * values[1];
        $scope.bookId =values[0];
        
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

            })
        }


 });