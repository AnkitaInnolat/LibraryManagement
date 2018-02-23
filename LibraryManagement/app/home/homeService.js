app.factory('homeService', function ($http) {

    var homefactory = {};

    homefactory.getUserList = function () {
        return $http.get("http://localhost/LibraryManagement.api//odata/Users");
    }


    homefactory.getBookList = function () {
        return $http.get("http://localhost/LibraryManagement.api//odata/Books");
    }

    homefactory.UserName = function (filter) {

        return $http.get("http://localhost/LibraryManagement.api//odata/Users" + filter);


    }

    homefactory.addUser = function (model) {
        return $http.post("http://localhost/LibraryManagement.api//odata/Users", model);
    }

    homefactory.addBook = function (model) {
        return $http.post("http://localhost/LibraryManagement.api//odata/Books", model);
    }

    homefactory.addIssuedBook = function (model) {
        return $http.post("http://localhost/LibraryManagement.api//odata/Issues", model);
    }
    return homefactory;

});