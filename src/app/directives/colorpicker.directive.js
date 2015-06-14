'use strict';

angular.module('pakaWeb')
.directive('colorPicker', function() {

  return {
    link: function(scope, elm, attrs) {

      function openColorPicker(){
        document.querySelector('#color-picker').focus();
        document.querySelector('#color-picker').click();
      }
      elm.on('click', function() {
        openColorPicker();
      });

      elm.on('focus', function() {
        openColorPicker();
      });
    }
  };
});