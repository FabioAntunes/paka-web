'use strict';

angular.module('pakaWeb')
  .controller('ExpensesCtrl', function (urls, $scope, $resource, $stateParams) {
    var Category = $resource(urls.BASE_API+'/categories');

    var expensesUrl;
    if($stateParams.hasOwnProperty('category')){
        expensesUrl = urls.BASE_API+'/categories/'+$stateParams.category+'/expenses';
    }else{
      expensesUrl = urls.BASE_API+'/expenses';
    }
    var Expense = $resource(expensesUrl);

    console.log($stateParams);
    
    $scope.total = 0;

    $scope.countTotal = function(value){
      $scope.total += Number(value);
    }
    
    $scope.categories = Category.query();
    $scope.expenses = Expense.query();

  });
