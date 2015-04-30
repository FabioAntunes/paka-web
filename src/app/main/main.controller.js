'use strict';

angular.module('pakaWeb')
  .controller('MainCtrl', function ($scope, AuthSrvc) {
    $scope.login = false;
    $scope.user = {name: '', email: '', password: ''};

    $scope.submit = function(){
      if($scope.login){
        AuthSrvc.login({
          email: $scope.user.email,
          password: $scope.user.password
        });
      }else{
        AuthSrvc.register($scope.user);
      }
    }

    $scope.categories = function(){
      AuthSrvc.categories().success(function(response){
        console.log(response);
      }).error(function(){
        console.log('yolo');
      });
    }
  });
