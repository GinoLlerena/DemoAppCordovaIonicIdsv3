    'use strict';
    angular
        .module("ionicApp")
        .config(config) ;
    
    function config($stateProvider, $urlRouterProvider, $httpProvider) {

       $httpProvider.interceptors.push('authInterceptorService');

        $stateProvider
          .state('signin', {
              url: '/sign-in',
              templateUrl: 'templates/sign-in.html',
              controller: 'SignInCtrl'
          })
         .state('tabs', {
              url: '/tab',
              abstract: true,
              templateUrl: 'templates/tabs.html'
          })
          .state('tabs.home', {
              url: '/home',
              views: {
                  'home-tab': {
                      templateUrl: 'templates/home.html',
                      controller: 'HomeTabCtrl'
                  }
              }
          })
   
          .state('tabs.about', {
              url: '/about',
              views: {
                  'about-tab': {
                      templateUrl: 'templates/about.html'
                  }
              }
          });
       

        $urlRouterProvider.otherwise('/sign-in');

    };
