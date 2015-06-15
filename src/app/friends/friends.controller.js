'use strict';

angular.module('pakaWeb')
  .controller('FriendCtrl', function (Friends, $scope, $stateParams, $state) {
    
    $scope.friends = Friends.query();

    console.log($stateParams);
    
    $scope.friend = {
      name: null,
      email: null
    };

    $scope.create = function(){
      var friend = new Friends({
        name: $scope.friend.name,
        email: $scope.friend.email
      });
      friend.$save(
        function(resp, headers){
          $state.go('app.friends.list');
        },
        function(err){
          // error callback
          console.log(err);
          alert('erro');
      });
    }

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
