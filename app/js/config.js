app.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvide, $urlRouterProvider) {
    //$urlRouterProvider.otherwise('/t3/dep');
    $urlRouterProvider.otherwise('/frame');
    $stateProvide
        .state('app', {
          url: '/app',
          templateUrl: 'app.html',
          resolve: {
            deps: ['$ocLazyLoad', function (ld) {
              return ld.load(['css/app.css']);
            }]
          }
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
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
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
        .state('test', {
          url: '/test',
          templateUrl: 'test.html',
          resolve: {
            deps: ['$ocLazyLoad', function (ld) {
              return ld.load(['css/test.css']);
            }]
          }
        })
        .state('test2', {
          url: '/t2',
          templateUrl: 'test2.html',
          resolve: {
            deps: ['$ocLazyLoad', function (ld) {
              return ld.load(['css/test2.css']);
            }]
          }
        })
        .state('test3', {
          url: '/t3',
          templateUrl: 'test3.html',
          resolve: {
            deps: ['$ocLazyLoad', function (ld) {
              return ld.load(['css/test3.css']);
            }]
          }
        })
        .state('test3.dep', {
          url: '/dep',
          templateUrl: 'tpl/sys_dep.html'
        })
        .state('test3.dep2', {
          url: '/dep2',
          templateUrl: 'tpl/sys_dep2.html'
        })
        .state('frame', {
          url: '/frame',
          templateUrl: 'frame.html',
          resolve: {
            deps: ['$ocLazyLoad', function (ld) {
              return ld.load(['css/frame.css']);
            }]
          }
        })
        .state('frame.dep',{
          url:'/dep',
          templateUrl:'tpl/sys_dep.html'
        })
        .state('frame.dep2',{
          url:'/dep2',
          templateUrl:'tpl/sys_dep2.html'
        })
  }]);

