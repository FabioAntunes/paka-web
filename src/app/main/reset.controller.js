'use strict';

angular.module('pakaWeb')
  .controller('ResetCtrl', function ($scope, AuthSrvc, $stateParams) {
    $scope.user = {email: '', password: '', password_confirmation: '', token: $stateParams.token};

    $scope.submit = function(){
      AuthSrvc.reset($scope.user);
    }
  });
