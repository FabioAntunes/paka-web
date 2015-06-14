'use strict';
angular.module('pakaWeb')
.directive('repeatLast', ['$timeout', function($timeout) {
  return function(scope) {
    if (scope.$last){
      // iteration is complete, do whatever post-processing
      // is necessary
      $timeout(function(){
      	scope.dash.hasFinished = true;
      }, 1000);
    }else{
      scope.dash.hasFinished = false;
    }
  };
}]);