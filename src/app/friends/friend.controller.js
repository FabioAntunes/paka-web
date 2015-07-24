'use strict';

angular.module('pakaWeb')
  .controller('FriendCtrl', function (Friends, $scope, $stateParams, $state) {
    
  $scope.view =  {
    title: 'Add Friend',
    btnText: 'Add'
  };

  if($stateParams.id){
    $scope.friend = Friends.get($stateParams);
    
    $scope.view.title = 'Edit Friend';
    $scope.view.btnText = 'Save';
    

  }else{
    $scope.friend = new Friends({
      name: null,
      email: null
    });
  }
    
  $scope.submit = function(){
    if($stateParams.id){
      $scope.friend.$update(
        function(resp, headers){
          $state.go('app.friends.list');
        },
        function(err){
          // error callback
          console.log(err);
          alert('erro');
        }
      );

    }else{
      $scope.friend.$save(
        function(resp, headers){
          $state.go('app.friends.list');
        },
        function(err){
          // error callback
          console.log(err);
          alert('erro');
        }
      );
    }
  }
  
});
