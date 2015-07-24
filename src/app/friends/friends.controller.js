'use strict';

angular.module('pakaWeb')
  .controller('FriendsCtrl', function (Friends, $scope, $stateParams, $state) {
    
    $scope.friends = Friends.query();

    $scope.delete = function(friendId){
      var friend = new Friends({ id: friendId });
      friend.$delete(
        function(resp, headers){
          $scope.friends = Friends.query();
        },
        function(err){
          // error callback
          console.log(err);
          alert('erro');
      });
    }
});
