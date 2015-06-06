//(function () {
    'use strict';
    angular
        .module("ionicApp")
        .controller('SignInCtrl',SignInCtrl);

    SignInCtrl.$inject = ['$ionicPlatform', '$scope', '$rootScope', '$state', '$localStorage'];

    function SignInCtrl($ionicPlatform, $scope, $rootScope, $state, $localStorage) {

        var otherOptions = {
            location: 'no',
            clearcache: 'yes',
            toolbar: 'no'
        };

        var oauth = new OAuthClient('http://192.168.178.48:44333/core/connect/authorize');

        $scope.authorize = function (options) {
            var deferred = $.Deferred();
            var req = oauth.createImplicitFlowRequest(options.client_id, options.redirect_uri, options.scope, options.response_type);
            // Now we need to open a window.
            if (window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if (cordovaMetadata.hasOwnProperty("cordova-plugin-inappbrowser") === true || cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    var browserRef = window.open(req.url, '_blank', 'location=no,toolbar=no');
                    browserRef.addEventListener("loadstart", function (e) {
                        var url = e.url;
                        if (url.indexOf(options.redirect_uri + '#') !== 0) return;
                        browserRef.close();
                        var error = /\#error=(.+)$/.exec(url);
                        if (error) {
                            deferred.reject({
                                error: error[1]
                            });
                        } else {
                            var uriFragment = url.substring(url.indexOf('#') + 1);
                            var result = oauth.parseResult(uriFragment);
                            // Mitigate against CSRF attacks by checking we actually sent this request
                            // We could also assert the nonce hasn't been re-used.
                            if (result.state == req.state) {
                                deferred.resolve(result)
                            }
                            else {
                                deferred.reject({
                                    error: "The state received from the server did not match the one we sent."
                                });
                            }
                        }
                    });
                    browserRef.addEventListener('exit', function (event) {
                        deferred.reject("The sign in flow was canceled");
                    });
                }
            }
            return deferred.promise();
        };

      
        $scope.signIn = function () {
            $ionicPlatform.ready(function () {
                $scope.authorize({
                    client_id: 'implicitclient',
                    redirect_uri: 'http://localhost:4400/index.html',
                    scope: 'openid profile email webapi',
                    response_type: 'id_token token'
                }).done(function (data) {
                    $localStorage.accessToken = data.access_token;
                    $state.go('tabs.home');
                    //alert('Access Token: ' + data.access_token);
                }).fail(function (data) {
                    alert(data.error);
                });
            });
        };

    };
//})();