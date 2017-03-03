var app = angular.module("app", [
  "ngRoute",
  "ui.bootstrap",
  "ngResource"
])
.controller("appCtrl", ["$scope","$http","$location",function($scope,$http,$location){
  $http.get('./phones.json').then(successCallback, errorCallback);
  function successCallback(response){
    $scope.phones = response.data;
  };
  function errorCallback(error){
    console.log(error);
  };  
}])
.controller("aboutCtrl", ["$scope","$http","$location",function($scope,$http,$location){
}])
.controller("phonesCtrl", ["$scope","$http","$location",function($scope,$http,$location){
}])
.controller("servicesCtrl", ["$scope","$http","$location",function($scope,$http,$location){
}])
.controller("contactCtrl", ["$scope","$http","$location",function($scope,$http,$location){
}])
.controller("phoneCtrl", ["$scope","$http","$location", "$routeParams",function($scope,$http,$location,$routeParams){
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
    .when('/phones.html',{
      templateUrl:'phones.html',
      controller: 'phonesCtrl'
    })
    .when('/about.html',{
      templateUrl:'about.html',
      controller: 'aboutCtrl'
    })
    .when('/services.html',{
      templateUrl:'services.html',
      controller: 'servicesCtrl'
    })
    .when('/contact.html',{
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