'use strict';

angular.module('pakaWeb')
  .controller('FriendCtrl', function (urls, $scope, $resource, $stateParams, $state) {
    var Category = $resource(urls.BASE_API+'/categories');

    var Expense = $resource(urls.BASE_API+'/expenses');

    console.log($stateParams);
    
    $scope.expense = {
      description: null,
      value: null,
      category: null,
    };

    $scope.create = function(){
      var expense = new Expense({
          description: $scope.expense.description,
          value: $scope.expense.value,
          category_id: $scope.expense.category.id
        });
      expense.$save(
        function(resp, headers){
          $state.go('app.expenses.list');
        },
        function(err){
          // error callback
          console.log(err);
          alert('erro');
      });
    }
    
    $scope.categories = Category.query();



  });
