// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('ionicApp', ['ionic', 'ngStorage',  'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
});

//angular
//    .module('ionicApp')
//    .factory('authInterceptorService', ['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {

//        var authInterceptorServiceFactory = {};

//        var _request = function (config) {

//            config.headers = config.headers || {};

//            if ($localStorage.hasOwnProperty("accessToken") === true) {
//                if ($localStorage.accessToken !== undefined) {
//                    config.headers.Authorization = 'Bearer ' + $localStorage.accessToken;
//                }
//            }

//            return config;
//        }

//        var _responseError = function (rejection) {
//            if (rejection.status === 401) {
//                $location.path('/');
//            }
//            return $q.reject(rejection);
//        }

//        authInterceptorServiceFactory.request = _request;
//        authInterceptorServiceFactory.responseError = _responseError;

//        return authInterceptorServiceFactory;
//}]);
