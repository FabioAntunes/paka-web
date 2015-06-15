'use strict';

angular.module('pakaWeb')
.controller('ExpenseCtrl', function (Expenses, User, $scope, $stateParams, $state) {
  $scope.view =  {
    title: 'Add an Expense',
    btnText: 'Create',
    shareExpense: false
  };

  if($stateParams.id){
    $scope.view.title = 'Edit Expense';
    $scope.view.btnText = 'Save';
    
    $scope.expense = Expenses.get($stateParams,function(){
      $scope.view.shareExpense = $scope.expense.friends.length > 1
    });

  }else{
    $scope.expense = new Expenses({
      description: null,
      value: null,
      category_id: null,
      friends: []
    });
    User.getUserInfo().then(function(result){
      result.self.value = 0;
      $scope.expense.friends.push(result.self);
    });
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