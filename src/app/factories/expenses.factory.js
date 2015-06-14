angular.module('pakaWeb')
.factory('Expenses', ['urls','$resource', function(urls, $resource) {
  return $resource(urls.BASE_API+'/expenses/:id', {id:'@id'},
    {
      'update': { method:'PUT' }
    }
  );
}]);