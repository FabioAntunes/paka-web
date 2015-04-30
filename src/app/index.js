'use strict';

angular.module('pakaWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'angular-loading-bar'])
	.constant('urls', {
       BASE: 'http://localhost:3000',
       BASE_API: 'http://localhost:8000/api'
   })
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('app', {
        abstract: true,
        templateUrl: 'app/dash/dash.html',
        controller: 'DashCtrl'
      })
      .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dash/dash.html',
        controller: 'DashCtrl'
      }).state('app.expenses', {
        url: '/expenses?category',
        templateUrl: 'app/expenses/expenses.html',
        controller: 'ExpensesCtrl'
      });

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push(['$q', '$location', '$cookieStore', function ($q, $location, $cookieStore) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403) {
                    $cookieStore.remove('token');
                    $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    }]);
  })
;
