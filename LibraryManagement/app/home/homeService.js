app.factory('homeService', function ($http) {

    var homefactory = {};

    homefactory.getUserList = function () {
        return $http.get("http://localhost/LibraryManagement.api//odata/Users");
    }


    homefactory.getBookList = function () {
        return $http.get("http://localhost/LibraryManagement.api//odata/Books");
    }


    homefactory.getissuedBookList = function () {
        return $http.get("http://localhost/LibraryManagement.api//odata/Issues");
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

    homefactory.getUserNameForIssue = function (filter) {
        return $http.get("http://localhost/LibraryManagement.api//odata/Issues?$expand=User" + filter);
    }

    homefactory.getBookNameForIssue = function (filter) {
        return $http.get("http://localhost/LibraryManagement.api//odata/Issues?$expand=Book" + filter);
    }

    homefactory.updateUser = function (model) {
        return $http.put("http://localhost/LibraryManagement.api//odata/Users("+model.UserId+")", model);
    }

    homefactory.updateBook = function (model) {
        return $http.put("http://localhost/LibraryManagement.api//odata/Books(" + model.BookId + ")", model);
    }
   
    return homefactory;

});