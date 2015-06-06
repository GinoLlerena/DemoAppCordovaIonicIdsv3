
    'use strict';
    angular
        .module("ionicApp")
        .factory('authService', authService);

   
    function authService($http, $q, $localStorage) {

        var authServiceFactory = {};
        authServiceFactory.data = [];

        var _getProfile = function (response) {
            return $http.get("http://192.168.178.48:44333/core/connect/userinfo")
           .success(function (data) {
               authServiceFactory.data = data;
           });

        }

        authServiceFactory.getProfile = _getProfile;

        return authServiceFactory;
    };
