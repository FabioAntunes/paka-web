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

  function _recover(credentials) {
    $http.post(urls.BASE_API + '/password/email', credentials).success(function(response){
      alert('email enviado');
    }).error(function(data, status, headers, config){
      console.log(data);
      console.log(status);
      console.log(headers);
      console.log(config);
    });
  }

  function _reset(credentials) {
    $http.post(urls.BASE_API + '/password/reset', credentials).success(function(response){
      $location.path('/');
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
    recover: _recover,
    reset: _reset,
    check: _check
  };
});