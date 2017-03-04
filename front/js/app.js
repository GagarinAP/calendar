var app = angular.module("app", [
  "ngRoute",
  "ui.bootstrap",
  "ngResource"
]);

var model = {
  user: "Adam"
};

app.run(function ($http) {
  $http.get("./json/todo.json").then(successCallback, errorCallback);
  function successCallback(response){
    model.items = response.data;
  };
  function errorCallback(error){
    console.log(error);
  };
});

app.controller("MainCtrl", function($scope){
  $scope.todo = model;
  $scope.incompleteCount = function () {
    var count = 0;
    angular.forEach($scope.todo.items, function (item) {
      if (!item.done) { count++ }
    });
    return count;
  }
  $scope.warningLevel = function () {
    return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
  }
  $scope.addNewItem = function (actionText) {
    $scope.todo.items.push({ action: actionText, done: false });
  }
});

app.filter("checkedItems", function () {
  return function (items, showComplete) {
    var resultArr = [];
    angular.forEach(items, function (item) {
      if (item.done == false || showComplete == true) {
        resultArr.push(item);
      }
    });
    return resultArr;
  }
});