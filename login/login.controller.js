(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var viewModel = this;

        viewModel.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            viewModel.dataLoading = true;
            AuthenticationService.Login(viewModel.username, viewModel.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(viewModel.username, viewModel.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    viewModel.dataLoading = false;
                }
            });
        };
    }

})();
