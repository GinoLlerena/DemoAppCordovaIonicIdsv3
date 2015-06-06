    'use strict';
    angular
        .module("ionicApp")
        .controller('HomeTabCtrl', HomeTabCtrl);

    HomeTabCtrl.$inject = ['$scope', 'authService'];
    
    function HomeTabCtrl($scope, authService) {


        getProfile();


        console.log('HomeTabCtrl');

        function getProfile() {

            var promise = authService.getProfile();

            promise.then(function (result) {
                $scope.profile = result.data;
            },
            function (error) {
                alert(error.data.message);
            });
        };

    };
