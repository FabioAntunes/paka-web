'use strict';

angular.module('pakaWeb')
  .controller('ListfriendsCtrl', function (urls, $scope, $resource, $stateParams) {
    var Friend = $resource(urls.BASE_API+'/friends/:id');
    
    $scope.friends = Friend.query();

  });
