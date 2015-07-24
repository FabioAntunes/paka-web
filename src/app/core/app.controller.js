'use strict';

angular.module('pakaWeb')
  .controller('AppCtrl', function ($scope, $stateParams) {
    $scope.months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    $scope.radio = {
      currentMonth: $stateParams.month ? $stateParams.month : (new Date()).getMonth()
    };

  });
