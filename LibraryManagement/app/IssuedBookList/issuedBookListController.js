app.controller('issuedBookListController', function ($scope, $rootScope, homeService) {

    $scope.issuedBooks = [];
    $scope.data = [];
    $scope.userQueryResult = [];
    $scope.bookQueryResult = [];
    $scope.UserName;
    $scope.BookName;
    $scope.BookId;


    $scope.getIssuedList = function () {
        homeService.getissuedBookList().then(function (results) {
            $scope.issuedBooks = results.data.value;
            var count = 0;
            $.each($scope.issuedBooks, function (value, key) {
                var filter1 = "&$filter=";
                filter1 = filter1 + "UserId eq " + key.UserId;
                $scope.BookId = key.BookId;
                var filter2 = "&$filter=";
                filter2 = filter2 + "BookId eq " + key.BookId;
                homeService.getUserNameForIssue(filter1).then(function (userResult) {
                    $scope.userQueryResult = userResult.data.value;
                    $scope.UserName = $scope.userQueryResult[0].User.UserName;
                });

                homeService.getBookNameForIssue(filter2).then(function (bookResult) {
                    $scope.bookQueryResult = bookResult.data.value;
                    $scope.BookName = $scope.bookQueryResult[0].Book.BookName;
                    var count1 = count++;
                    $scope.issuedBooks[count1].UserId = $scope.UserName;
                    $scope.issuedBooks[count1].BookId = $scope.BookName;
                    console.log($scope.BookName + "---------------------------" + $scope.UserName);
                });

            })
            //$scope.issuedBooks = results.data.value;


        });
    }
});