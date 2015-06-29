'use strict';

angular.module('pakaWeb')
.controller('CategoryCtrl', function (Categories, $scope, $stateParams, $state) {

  if($stateParams.id){
    $scope.category = Categories.get($stateParams);
    $scope.view =  {
      title: 'Edit Category',
      btnText: 'Save'
    };
  }else{
    $scope.category = new Categories({
      name: null,
      color: randomColor()
    });
    $scope.view =  {
      title: 'Add a Category',
      btnText: 'Create'
    };
  }
  
  $scope.randomColor = function(){
    $scope.category.color = randomColor();
  }
  
  $scope.submit = function(){
    if($stateParams.id){
      $scope.category.$update(
        function(resp, headers){
          $state.go('app.categories.list');
        },
        function(err){
          // error callback
          console.log(err);
          alert('erro');
        }
      );

    }else{
      $scope.category.$save(
        function(resp, headers){
          $state.go('app.categories.list');
        },
        function(err){
          // error callback
          console.log(err);
          alert('erro');
        }
      );
    }
  }
  
  function randomColor(){
    var hex = Math.floor(Math.random()*16777215).toString(16);
    while(6 - hex.length){
      hex = '0'+hex;
    }
    return '#'+hex;
  }

});
