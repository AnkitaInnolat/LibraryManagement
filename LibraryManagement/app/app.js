/// <reference path="IssuedBookList/issuedBookList.html" />
var app = angular.module('LibraryApp', ['ngRoute','LocalStorageModule']);


app.config(function ($routeProvider) {
    $routeProvider.when('/userDetails', {
        templateUrl: 'app/userDetails/UserList.html',
        controller: 'userController'
    });

    $routeProvider.when('/bookDetails', {
        templateUrl: 'app/BookDetails/bookDetails.html',
        controller: 'bookController'
    });

    $routeProvider.when('/addBook', {
        templateUrl: 'app/addBook/addBook.html',
        controller: 'addBookController'
    });

    $routeProvider.when('/addUser', {
        templateUrl: 'app/addUser/addUser.html',
        controller: 'addUserController'
    });

    $routeProvider.when('/issueBook', {
        templateUrl: 'app/IssueDetails/IssueBook.html',
        controller: 'issueBookController'
    });

    $routeProvider.when('/home', {
        controller: 'homeController',
        templateUrl: 'app/home/home.html'

    });


    $routeProvider.when('/issueBookDetails', {
        controller: 'issuedBookListController',
        templateUrl: 'app/IssuedBookList/issuedBookList.html'

    });
    

    $routeProvider.otherwise({
        redirectTo: "/home",
    });

});
