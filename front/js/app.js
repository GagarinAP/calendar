var app = angular.module("app", [
  "ngRoute",
  "ui.bootstrap",
  "ngResource"
]);

app.controller("appCtrl", function($scope){
  var model = {    
    items: [{ name: "Julia", done: false, period: 4, begindate: "2017-03-09T22:00:00.000Z", periodic: 27 }]
  };
  $scope.todo = model;

  $scope.incompleteCount = function () {
    var count = 0;
    angular.forEach($scope.todo.items, function (item) {
      if (!item.done) { 
        count++; 
      }
    });
    return count;
  }
   
  $scope.warningLevel = function () {
  return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
  }
   
  $scope.addNewItem = function (Name,Period,DateBegin,Periodic) {
    $scope.todo.items.push({ name: Name, done: false, period: Period, begindate: DateBegin, periodic: Periodic});
  }



  

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
    value: 4,
    date: new Date()
  }

  var Arr = [];
  for(var i = 0; i < $scope.period.value; ++i){
    $scope.period.date.setDate($scope.period.date.getDate() + 1);
    Arr.push({date: $scope.period.date + 1, status: 'partially',class: 'bbbbbbbbbbbbbbb'});
  }

  $scope.events = Arr;

  function getDayClass(data) {

    var date = data.date, mode = data.mode;

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