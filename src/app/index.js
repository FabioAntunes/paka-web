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
        })/***** EXPENSES ****/
          .state('app.expenses', {
            url: '/expenses',
            abstract: true,
            templateUrl: 'app/expenses/expenses.html',
          })
            .state('app.expenses.list', {
              url: '',
              views: {
                'left-bar': {
                  templateUrl: 'app/components/listgroup/listgroup.html',
                  controller: 'ListgroupCtrl'
                },
                'right-bar': {
                  templateUrl: 'app/expenses/expenses.list.html',
                  controller: 'ListExpensesCtrl'
                }
              }
            })
            .state('app.expenses.categories', {
              url: '/categories/:id',
              views: {
                'left-bar': {
                  templateUrl: 'app/components/listgroup/listgroup.html',
                  controller: 'ListgroupCtrl'
                },
                'right-bar': {
                  templateUrl: 'app/expenses/expenses.list.html',
                  controller: 'ListExpensesCtrl'
                }
              }
            })
            .state('app.expenses.create', {
              url: '/create',
              views: {
                'left-bar': {
                },
                'right-bar': {
                  templateUrl: 'app/expenses/create.html',
                  controller: 'ExpenseCtrl'
                }
              }
            })
          /***** CATEGORIES ****/
          .state('app.categories', {
            url: '/categories',
            abstract: true,
            templateUrl: 'app/categories/categories.html',
          })
            .state('app.categories.list', {
              url: '',
              templateUrl: 'app/categories/categories.list.html',
              controller: 'ListCategoriesCtrl'
            })
            .state('app.categories.edit', {
              url: '/edit/:id',
              templateUrl: 'app/categories/create.html',
              controller: 'CategoryCtrl'
            })
            .state('app.categories.create', {
              url: '/create',
              templateUrl: 'app/categories/create.html',
              controller: 'CategoryCtrl'
            })
          /***** FRIENDS ****/
          .state('app.friends', {
            url: '/friends',
            abstract: true,
            templateUrl: 'app/friends/friends.html',
          })
            .state('app.friends.list', {
              url: '',
              templateUrl: 'app/friends/friends.list.html',
              controller: 'FriendCtrl'
            })
            .state('app.friends.edit', {
              url: '/edit/:id',
              templateUrl: 'app/friends/create.html',
              controller: 'FriendCtrl'
            })
            .state('app.friends.create', {
              url: '/create',
              templateUrl: 'app/friends/create.html',
              controller: 'FriendCtrl'
            })
            ;

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
