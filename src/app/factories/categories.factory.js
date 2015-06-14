angular.module('pakaWeb')
.factory('Categories', ['urls','$resource', function(urls, $resource) {
  return $resource(urls.BASE_API+'/categories/:id', {id:'@id'},
    {
      'update': { method:'PUT' }
    }
  );
}]);