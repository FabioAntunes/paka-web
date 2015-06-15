angular.module('pakaWeb')
.factory('User', ['urls','$resource', '$q', '$cookieStore', function(urls, $resource, $q, $cookieStore) {
  var user = $cookieStore.get('token');
  

  return {
    getUserInfo: function(){
      var u = $q.defer();
      if(user){
        u.resolve(user);
      }else{
        var User = $resource(urls.BASE_API+'/user');
        User.get(function(results){
          user = results;
          u.resolve(user);
        })
      }

      return u.promise;
    }
  };
}]);