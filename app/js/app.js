;(function($,window){

  var app = window.app = angular.module('app', [
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

  app.controller('AppCtrl', ['$scope', '$localStorage', '$window','$timeout',
    function ($scope, $localStorage, $window,$timeout) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

      // config
      var sApp = $scope.app = {
        name: 'origin',
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
        },
        setting:{
          menu:{},
          header:{},
          content:{},
          headerMenu:{}
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

      var screen = function(w){
        return new screen.fn.init(w);
      }

      screen.prototype = screen.fn = {
        constructor:screen,
        init:function (w) {
          this.w = w;
        },
        isXs:function () {
          return this.w < 768;
        },
        isSm:function () {
          return this.w > 768 && this.w < 992;
        },
        isMd:function (w) {
          return this.w > 992 && this.w < 1200;
        },
        isLg:function (w) {
          return this.w > 1200;
        }
      };

      screen.fn.init.prototype = screen.fn;

      //顶部导航
      var header = sApp.setting.header = {
        fixed:true //xs 默认固定
      };

      var headerMenu = sApp.setting.headerMenu = {
        fixed:true, //xs 默认固定
        show:false // xs 默认不显示
      };

      //导航图标
      var nav = header.nav = {
        close:false,
        menu:true,
        left:false,
        right:false,
        to:function (val) {
          for(var i in this){
            if(angular.isFunction(this[i]))continue;
            if(val == i){
              this[i] = true;
            }else {
              this[i] = false;
            }
          }
        }
      };

      //导航展开图标
      var expand = header.expand ={
        up:false,
        toggle:function () {
          console.log('切换了');
          this.up = !this.up;
        }
      };

      //菜单
      var menu = sApp.setting.menu = {
        folded:false,
        show:false,//xs 默认不显示
        fixed:true,// xs 默认固定 其余默认不固定
        docked:false
      };

      //导航图标切换
      nav.toggle = function () {
        var scn = screen($($window).width());
        if(scn.isXs()){
          if(menu.show){
            menu.show = false;
            nav.to('menu');
          }else {
            menu.show = true;
            nav.to('close');
          }
        }else if(scn.isSm() || scn.isMd() || scn.isLg()){
          if(menu.folded){
            menu.folded = false;
            nav.to('left');
          }else{
            menu.folded = true;
            nav.to('right');
          }
        }
        console.log(scn.isXs());
        console.log(scn.isSm());
        console.log(scn.isMd());
        console.log(scn.isLg());
      }

      /**
       * 屏幕尺寸变化处理
       */
      var resize = function(){
        var scn = screen($($window).width());
        if(scn.isSm()||scn.isMd()||scn.isLg()){
          menu.show = false;
          expand.up = false;
          if(menu.folded){
            nav.to('right');
          }else{
            nav.to('left');
          }
        }else if(scn.isXs()){
          if(menu.show){
            nav.to('close');
          }else{
            nav.to('menu');
          }
        }
        console.log(scn.isXs());
        console.log(scn.isSm());
        console.log(scn.isMd());
        console.log(scn.isLg());
      };
      resize.isRun = false;
      $($window).on('resize',function () {
          if(resize.isRun)return;
          resize.isRun = true;
          $timeout(function(){
            resize();
            resize.isRun = false;
          },800);
      });
      resize();


    }]).run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      $rootScope.$on('$stateChangeStart',
          function (e, toState, toParams, fromState, fromParams) {
            console.log();
            console.log(e.currentScope);
            // if(e.currentScope != null){
            //     e.currentScope.animate = 'fadeInOut';
            //     e.preventDefault();
            // }

          });
    }]);

})(jQuery,window);

