'use strict';

angular.module('pakaWeb')
  .controller('NavbarCtrl', function ($scope, AuthSrvc, $location) {
    $scope.logout = function(){
    	AuthSrvc.logout();
    };

 	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
    
  });
