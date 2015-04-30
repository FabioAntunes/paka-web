'use strict';

angular.module('pakaWeb')
  .controller('ListgroupCtrl', function ($scope, $location, $stateParams) {

 	$scope.isActive = function (viewLocation) { 

        return !$stateParams.category && !viewLocation || $stateParams.category === viewLocation;
    };
    
  });
