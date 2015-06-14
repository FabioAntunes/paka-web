'use strict';

angular.module('pakaWeb')
.controller('ExpenseCtrl', function (Expenses, $scope, Categories, $stateParams, $state) {
  $scope.categories = Categories.query();

  if($stateParams.id){
    $scope.expense = Expenses.get($stateParams);
    $scope.view =  {
      title: 'Edit Expense',
      btnText: 'Save',
      shareExpense: $scope.expense.friends.length > 1
    };
  }else{
    $scope.expense = new Expenses({
      description: null,
      value: null,
      category_id: null
    });
    $scope.view =  {
      title: 'Add an Expense',
      btnText: 'Create',
      shareExpense: false
    };
  }

  $scope.submit = function(){
    if($stateParams.id){
      $scope.expense.$update(
        function(resp, headers){
          $state.go('app.expenses.list');
        },
        function(err){
          // error callback
          console.log(err);
          alert('erro');
        }
      );

    }else{
      $scope.expense.$save(
        function(resp, headers){
          $state.go('app.expenses.list');
        },
        function(err){
          // error callback
          console.log(err);
          alert('erro');
        }
      );
    }
  }
});