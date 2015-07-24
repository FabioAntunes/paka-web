'use strict';

angular.module('pakaWeb')
.controller('ExpensesCtrl', function (Categories, $scope, $stateParams) {
  $scope.categories = Categories.query();  
});
