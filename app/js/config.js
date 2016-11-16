app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvide, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvide.state('app', {
            url: '/',
            templateUrl: 'tpl/app.html'
        });
    }]);