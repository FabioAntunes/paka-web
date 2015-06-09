'use strict';

angular.module('pakaWeb')
  .controller('FriendCtrl', function (urls, $scope, $resource, $stateParams, $state) {
    var Friend = $resource(urls.BASE_API+'/friends/:id', {id:'@id'});
    
    $scope.friends = Friend.query();

    console.log($stateParams);
    
    $scope.friend = {
      name: null,
      email: null
    };

    $scope.create = function(){
      var friend = new Friend({
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
      var friend = new Friend({ id: friendId });
      friend.$delete(
        function(resp, headers){
          $scope.friends = Friend.query();
        },
        function(err){
          // error callback
          console.log(err);
          alert('erro');
      });
    }
});
