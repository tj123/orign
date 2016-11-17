
app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvide, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/app');
        $stateProvide
            .state('app', {
                url: '/app',
                templateUrl: 'app.html'
            })
            .state('app.dash', {
                url: '/dash',
                templateUrl: 'tpl/app_dash.html'
            })
            .state('app.sys', {
                url: '/sys',
                templateUrl: 'tpl/sys.html'
            })
            .state('app.menu', {
                url: '/menu',
                templateUrl: 'tpl/sys_menu.html',
                resolve: {
                    deps: ['$ocLazyLoad', function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/ctrl/sys_menu.js']);
                    }]
                }
            })
            .state('app.dep', {
                url: '/dep',
                templateUrl: 'tpl/sys_dep.html'
            })
            .state('app.user', {
                url: '/user',
                templateUrl: 'tpl/sys_user.html'
            })
            .state('app.role', {
                url: '/role',
                templateUrl: 'tpl/sys_role.html'
            })
            .state('app.setup', {
                url: '/setup',
                templateUrl: 'tpl/sys_setup.html'
            })
    }]);

