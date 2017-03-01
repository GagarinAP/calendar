var app = angular.module("app", [
  "ngRoute",
  "ui.bootstrap",
  "ngResource"
]);

app.controller("appCtrl", function($scope){
  $scope.name = 'Calendar Period';
});

app.controller('DatepickerDemoCtrl', function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };
  
  $scope.period = {
    value: 5,
    date: new Date()
  }

  var Arr = [];
  for(var i = 0; i < $scope.period.value; ++i){
    $scope.period.date.setDate($scope.period.date.getDate() + 1);
    Arr.push({date: $scope.period.date + 1, status: 'partially'});
  }

  $scope.events = Arr;

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
});