var app = angular.module("app", [
  "ngRoute",
  "ui.bootstrap",
  "ngResource"
]);
app.controller("sportsStoreCtrl", function ($scope) {
 
  $scope.data = {
    products: [
      { name: "Product #1", description: "A product", category: "Category #1", price: 100 },
      { name: "Product #2", description: "A product", category: "Category #1", price: 110 },
      { name: "Product #3", description: "A product", category: "Category #2", price: 210 },
      { name: "Product #4", description: "A product", category: "Category #3", price: 202 },
      { name: "Product #5", description: "A product", category: "Category #1", price: 170 },
      { name: "Product #6", description: "A product", category: "Category #1", price: 170 },
      { name: "Product #7", description: "A product", category: "Category #2", price: 270 },
      { name: "Product #8", description: "A product", category: "Category #3", price: 272 },
      { name: "Product #9", description: "A product", category: "Category #1", price: 170 },
      { name: "Product #10", description: "A product", category: "Category #1", price: 170 },
      { name: "Product #11", description: "A product", category: "Category #2", price: 270 },
      { name: "Product #12", description: "A product", category: "Category #3", price: 272 }
    ]
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

app.constant("productListActiveClass", "btn-primary");
app.constant("productListPageCount", 3);

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