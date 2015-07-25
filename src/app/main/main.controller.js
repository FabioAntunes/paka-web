'use strict';

angular.module('pakaWeb')
  .controller('MainCtrl', function ($scope, AuthSrvc) {
    $scope.login = false;
    $scope.forgotPassword = false;
    $scope.user = {name: '', email: '', password: ''};

    $scope.submit = function(){
      if($scope.forgotPassword){
        AuthSrvc.recover({
          email: $scope.user.email          
        });
      }else{
        if($scope.login){
          AuthSrvc.login({
            email: $scope.user.email,
            password: $scope.user.password
          });
        }else{
          AuthSrvc.register($scope.user);
        }
      }
    }

    $scope.recover = function(state){
      $scope.login = state;
      $scope.forgotPassword = state;
    }
  });
