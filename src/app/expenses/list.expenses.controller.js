'use strict';

angular.module('pakaWeb')
  .controller('ListExpensesCtrl', function (urls, $scope, $resource, $stateParams) {

    var expensesUrl;
    if($stateParams.id){
        expensesUrl = urls.BASE_API+'/categories/'+$stateParams.id+'/expenses';
    }else{
      expensesUrl = urls.BASE_API+'/expenses';
    }
    var Expense = $resource(expensesUrl);
    
    $scope.total = 0;

    $scope.countTotal = function(value){
      $scope.total += Number(value);
    }

    $scope.expenses = Expense.query();

  });
