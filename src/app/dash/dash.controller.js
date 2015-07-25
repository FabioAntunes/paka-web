'use strict';

angular.module('pakaWeb')
  .controller('DashCtrl', function (urls, $scope, $resource, $stateParams) {

    console.log($stateParams);
    
    $scope.dash = {
      categories: [],
      total: 0,
      hasFinished: false
    };

    $scope.calcTotal = function(categoryTotal){
      $scope.dash.total += parseFloat(categoryTotal);
    };
    
    $scope.getExpenses = function(){
      var Category = $resource(urls.BASE_API+'/categories/dashboard', {month: $scope.$parent.radio.currentMonth+1});
      $scope.dash.categories = Category.query();
    }

    $scope.getExpenses();
  });
