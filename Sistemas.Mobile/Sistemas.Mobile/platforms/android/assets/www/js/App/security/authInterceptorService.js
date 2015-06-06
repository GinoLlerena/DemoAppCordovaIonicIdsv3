angular
    .module('ionicApp')
    .factory('authInterceptorService', ['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};

            if ($localStorage.hasOwnProperty("accessToken") === true) {
                if ($localStorage.accessToken !== undefined) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.accessToken;
                }
            }

            return config;
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                $location.path('/');
            }
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
}]);