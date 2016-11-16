app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvide, $urlRouterProvider) {
        $urlRouterProvider.otherwise('app');
        $stateProvide.state('app', {
            url: '/app',
            templateUrl: 'tpl/app.html'
        }).state('app.dash',{
            url:'/dash',
            templateUrl:'tpl/app_dash.html'
        });
    }]);