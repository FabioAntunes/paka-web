'use strict';
angular.module('pakaWeb')
.factory('AuthSrvc', function (urls, $http, $location, $cookieStore) {

  function _login(credentials) {
    $http.post(urls.BASE_API + '/auth/login', credentials).success(function(response){
      $cookieStore.put('token', response);
      $location.path('/dashboard');
    }).error(function(data, status, headers, config){
      console.log(data);
      console.log(status);
      console.log(headers);
      console.log(config);
    });
  }

  function _logout(){
    $cookieStore.remove('token');
    $location.path('/');
  }

  function _register(credentials) {
    $http.post(urls.BASE_API + '/auth/register', credentials).success(function(response){
      $cookieStore.put('token', response);
      $location.path('/dashboard');
    }).error(function(data, status, headers, config){
      console.log(data);
      console.log(status);
      console.log(headers);
      console.log(config);
    });
  }

  function _check() {
    return $cookieStore.get('token') ? true : false;
  }

  return {
    login: _login,
    logout: _logout,
    register: _register,
    check: _check
  };
});