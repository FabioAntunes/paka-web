'use strict';

angular.module('pakaWeb')
.controller('ExpenseCtrl', function (Expenses, User, $scope, $stateParams, $state) {
  $scope.view =  {
    title: 'Add Expense',
    btnText: 'Create',
    shareExpense: false
  };

  if($stateParams.id){
    $scope.view.title = 'Edit Expense';
    $scope.view.btnText = 'Save';
    
    $scope.expense = Expenses.get($stateParams,function(){
      $scope.expense._date = new Date($scope.expense.date[0], $scope.expense.date[1]-1, $scope.expense.date[2]);
      $scope.view.shareExpense = $scope.expense.shared.length > 1;
      if(!$scope.view.shareExpense){
        User.getUserInfo().then(function(result){
          result.friend_id = result.name;
          result.value = 0;
          result.name = 'Me';
          $scope.expense.shared.push(result);
        });
      }
    });

  }else{
    $scope.expense = new Expenses({
      description: null,
      value: null,
      category_id: null,
      shared: [],
      date: [],
      _date: new Date()
    });
    User.getUserInfo().then(function(result){
      result.friend_id = result.name;
      result.value = 0;
      result.name = 'Me';
      $scope.expense.shared.push(result);
    });
  }

  $scope.submit = function(){
    if($stateParams.id){
      $scope.expense.date[0] = $scope.expense._date.getFullYear();
      $scope.expense.date[1] = $scope.expense._date.getMonth()+1;
      $scope.expense.date[2] = $scope.expense._date.getDate();
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
      $scope.expense.date[0] = $scope.expense._date.getFullYear();
      $scope.expense.date[1] = $scope.expense._date.getMonth()+1;
      $scope.expense.date[2] = $scope.expense._date.getDate();
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