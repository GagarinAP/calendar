var app = angular.module("app", [
  "ngRoute",
  "ui.bootstrap",
  "ngResource"
]);

app.config(["$routeProvider","$locationProvider", function($routeProvider,$locationProvider){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $routeProvider
    .when('/',{
      templateUrl:'main.html',
      controller: 'appCtrl'
    })
    .when('/about',{
      templateUrl:'about.html',
      controller: 'aboutCtrl'
    })
    .when('/services',{
      templateUrl:'services.html',
      controller: 'servicesCtrl'
    })
    .when('/contact',{
      templateUrl:'contact.html',
      controller: 'contactCtrl'
    })
    .when('/phones/:phoneId',{
      templateUrl:'phone-template.html',
      controller: 'phoneCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })
}]);

app.controller("appCtrl", ["$scope","$http","$location",function($scope,$http,$location){
  

  $http.get('./phones.json').then(successCallback, errorCallback);

  function successCallback(response){
    $scope.phones = response.data;
  };

  function errorCallback(error){
    console.log(error);
  };
  
}]);

app.controller("aboutCtrl", ["$scope","$http","$location",function($scope,$http,$location){
}]);
app.controller("servicesCtrl", ["$scope","$http","$location",function($scope,$http,$location){
}]);
app.controller("contactCtrl", ["$scope","$http","$location",function($scope,$http,$location){
}]);
app.controller("phoneCtrl", ["$scope","$http","$location", "$routeParams",function($scope,$http,$location,$routeParams){
    $scope.phoneId = $routeParams.phoneId;

    $http.get('./phones.json').then(successCallback, errorCallback);

    function successCallback(response){
      
      _.map(response.data, function(arr){
        
        if(arr.id === $routeParams.phoneId){
          $scope.phone = arr;
        }

      })

    };

    function errorCallback(error){
      console.log(error);
    };
}]);