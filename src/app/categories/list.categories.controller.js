'use strict';

angular.module('pakaWeb')
  .controller('ListCategoriesCtrl', function (urls, $scope, $resource, $stateParams) {
    var Category = $resource(urls.BASE_API+'/categories');

    var expensesUrl;
    if($stateParams.id){
        expensesUrl = urls.BASE_API+'/categories/'+$stateParams.id+'/expenses';
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
