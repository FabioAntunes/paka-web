angular.module('pakaWeb')
.factory('Friends', ['urls','$resource', function(urls, $resource) {
  return $resource(urls.BASE_API+'/friends/:id', {id:'@id'},
    {
      'update': { method:'PUT' }
    }
  );
}]);