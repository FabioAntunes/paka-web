'use strict';

angular.module('pakaWeb')
.controller('ExpensesCtrl', function (Categories, $scope) {
  $scope.categories = Categories.query();
});
