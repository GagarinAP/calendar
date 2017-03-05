var app = angular.module("app", [
  "ngRoute",
  "ui.bootstrap",
  "ngResource"
]);
//=========const=============
app.constant("productListActiveClass", "btn-primary");
app.constant("productListPageCount", 3);
app.constant("dataUrl", "./json/todo.json");
//=========ctrl============
app.controller("sportsStoreCtrl", function ($scope,$http,dataUrl) { 
  $scope.data = {};  
  $http.get(dataUrl).then(good,bad);
  function good(response) {
    console.log(response.data);
    $scope.data.products = response.data;
  };
  function bad(error) {
    $scope.data.error = error;
  };
});
app.controller("productListCtrl", function ($scope, $filter, productListActiveClass, productListPageCount) { 
  var selectedCategory = null;
  $scope.selectedPage = 1;
  $scope.pageSize = productListPageCount;   
  $scope.selectCategory = function (newCategory) {
    selectedCategory = newCategory;
    $scope.selectedPage = 1;
  }
  $scope.selectPage = function (newPage) {
    $scope.selectedPage = newPage;
  }   
  $scope.categoryFilterFn = function (product) {
    return selectedCategory == null || product.category == selectedCategory;
  }
  $scope.getCategoryClass = function (category) {
    return selectedCategory == category ? productListActiveClass : "";
  }
  $scope.getPageClass = function (page) {
    return $scope.selectedPage == page ? productListActiveClass : "";
  }
});
//============filters=============
app.filter("unique", function () {
  return function (data, propertyName) {
    if (angular.isArray(data) && angular.isString(propertyName)) {
      var results = [];
      var keys = {};

      for (var i = 0; i < data.length; i++) {
        var val = data[i][propertyName];
        if (angular.isUndefined(keys[val])) {
          keys[val] = true;
          results.push(val);
        }
      }
        return results;
    } else {
      return data;
    }
  }
});
app.filter("range", function ($filter) {
  return function (data, page, size) {
    if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
      var start_index = (page - 1) * size;
      if (data.length < start_index) {
        return [];
      } else {
        return $filter("limitTo")(data.splice(start_index), size);
      }
    } else {
      return data;
    }
  }
});
app.filter("pageCount", function () {
  return function (data, size) {
    if (angular.isArray(data)) {
      var result = [];
      for (var i = 0; i < Math.ceil(data.length / size) ; i++) {
        result.push(i);
      }
      return result;
    } else {
      return data;
    }
  }
});