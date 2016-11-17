var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'ui.jq',
    'ui.validate',
    'oc.lazyLoad'
]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
        app.CONTEXT = 'localhost:8080/';
    }]);

app.controller('AppCtrl', ['$scope', '$localStorage', '$window',
    function ($scope, $localStorage, $window) {
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

        // config
        $scope.app = {
            name: 'orign',
            version: '1.0.0',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                menuColor: 'bg-black',
                headerFixed: true,
                menuFixed: false,
                menuFolded: true,
                menuDock: false,
                container: false
            }
        }

        // save settings to local storage
        if (angular.isDefined($localStorage.settings)) {
            $scope.app.settings = $localStorage.settings;
        } else {
            $localStorage.settings = $scope.app.settings;
        }
        $scope.$watch('app.settings', function () {
            if ($scope.app.settings.menuDock && $scope.app.settings.menuFixed) {
                // aside dock and fixed must set the header fixed.
                $scope.app.settings.headerFixed = true;
            }
            // save to local storage
            $localStorage.settings = $scope.app.settings;
        }, true);

        // angular translate
        //$scope.lang = {isopen: false};
        //$scope.langs = {en: 'English', de_DE: 'German', it_IT: 'Italian'};
        //$scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
        //$scope.setLang = function (langKey, $event) {
            // set the current lang
           // $scope.selectLang = $scope.langs[langKey];
            // You can change the language during runtime
           // $translate.use(langKey);
         //   $scope.lang.isopen = !$scope.lang.isopen;
       // };

        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

    }]).run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeStart',
            function(e, toState, toParams, fromState, fromParams){
                console.log();
                console.log(e.currentScope);
                // if(e.currentScope != null){
                //     e.currentScope.animate = 'fadeInOut';
                //     e.preventDefault();
                // }

            });
    }]);
