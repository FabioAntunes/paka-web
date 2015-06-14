'use strict';

angular.module('pakaWeb')
.controller('ListCategoriesCtrl', function (urls, $scope, $resource, $stateParams) {
  var Category = $resource(urls.BASE_API+'/categories/:id', {id:'@id'});
  
  $scope.categories = Category.query();

  $scope.delete = function(id){
    var user = Category.delete({id:id}, function(){
      $scope.categories = Category.query();      
    });
  }

});
