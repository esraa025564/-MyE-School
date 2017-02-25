(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var viewModel = this;

        viewModel.register = register;

        function register() {
            viewModel.dataLoading = true;
            UserService.Create(viewModel.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        viewModel.dataLoading = false;
                    }
                });
        }
    }

})();
