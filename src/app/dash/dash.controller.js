'use strict';

angular.module('pakaWeb')
  .controller('DashCtrl', function (urls, $scope, $resource, $stateParams) {
    var Category = $resource(urls.BASE_API+'/categories');
    // var Expense = $resource(urls.BASE_API+'/categories/1/expenses');

    console.log($stateParams);
    
    $scope.dash = {
      categories: [],
      total: 0,
      hasFinished: false
    };

    $scope.calcTotal = function(categoryTotal){
      $scope.dash.total += parseFloat(categoryTotal);
    };
    
    $scope.dash.categories = Category.query();
    // $scope.expenses = Expense.query();

  });
