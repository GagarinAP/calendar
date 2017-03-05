var app = angular.module("app", [
  "ngRoute",
  "ui.bootstrap",
  "ngResource"
]);
//=========config============
app.config(["$routeProvider","$locationProvider", function($routeProvider,$locationProvider){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $routeProvider
  .when("/complete", {
    templateUrl: "/view/thankYou.html"
  })   
  .when("/placeorder", {
    templateUrl: "/view/placeOrder.html"
  })
  .when("/checkout", {
    templateUrl: "/view/checkoutSummary.html"
  })
  .when("/products", {
    templateUrl: "/view/productList.html"
  })
  .otherwise({
    templateUrl: "/view/productList.html"
  });
}]);
//=========const=============
app.constant("productListActiveClass", "btn-primary");
app.constant("productListPageCount", 3);
app.constant("dataUrl", "http://localhost:3000/allproducts");
app.constant("orderUrl", "http://localhost:3000/orders");
//=========ctrl============
app.controller("sportsStoreCtrl", function ($scope,$http,dataUrl,orderUrl,$location,cart) { 
  $scope.data = {};  
  $http({
    method: 'GET',
    url: dataUrl
  }).then(function (success){
    //console.log(success.data);
    $scope.data.products = success.data;
  },function(error){
    $scope.data.error = error;
  });  

  $scope.sendOrder = function (shippingDetails) {
    var order = angular.copy(shippingDetails);
    order.products = cart.getProducts();    

    $http({
      method: 'POST',
      url: orderUrl
    }).then(function (success){
      console.log(order.products);//!!!!!!!!!!!!!!!!!
      $scope.data.orderId = success.data.id;
      cart.getProducts().length = 0;
    },function (error){
      $scope.data.orderError = error;
    }).finally(function () {
      $location.path("/complete");
    });
  }
});
app.controller("productListCtrl", function ($scope, $filter, productListActiveClass, productListPageCount, cart) { 
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
  $scope.addProductToCart = function (product) {
    cart.addProduct(product.id, product.name, product.price);
  }
});
app.controller("cartSummaryController", function($scope, cart) { 
  $scope.cartData = cart.getProducts();   
  $scope.total = function () {
    var total = 0;
    for (var i = 0; i < $scope.cartData.length; i++) {
      total += ($scope.cartData[i].price * $scope.cartData[i].count);
    }
    return total;
  }   
  $scope.remove = function (id) {
    cart.removeProduct(id);
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