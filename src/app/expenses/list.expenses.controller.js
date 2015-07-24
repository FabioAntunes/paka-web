'use strict';

angular.module('pakaWeb')
  .controller('ListExpensesCtrl', function (urls, $scope, $resource, $stateParams) {
    

    $scope.countTotal = function(value){
      $scope.total += Number(value);
    }

    $scope.getExpenses = function (){
      $scope.total = 0;
      var expensesUrl;
      if($stateParams.id){
          expensesUrl = urls.BASE_API+'/categories/'+$stateParams.id+'/expenses';
      }else{
        expensesUrl = urls.BASE_API+'/expenses';
      }
      
      var Expense = $resource(expensesUrl, {month: $scope.$parent.radio.currentMonth+1});
      
      $scope.expenses = Expense.query();
    };

    $scope.getExpenses();

    

  });
