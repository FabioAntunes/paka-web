'use strict';
angular.module('pakaWeb')
.filter('shortMonth', function(){
  return function(month){
    return month.substr(0, 3);
  }
});