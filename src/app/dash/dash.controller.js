'use strict';

angular.module('pakaWeb')
  .controller('DashCtrl', function (urls, $scope, $resource, $stateParams) {
    var Category = $resource(urls.BASE_API+'/categories');
    var Expense = $resource(urls.BASE_API+'/categories/1/expenses');

    console.log($stateParams);
    
    $scope.total = 0;

    $scope.countTotal = function(value){
      $scope.total += Number(value);
    }
    
    $scope.categories = Category.query();
    $scope.expenses = Expense.query();

  });
