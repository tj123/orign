;(function (window) {

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

  app.controller('AppCtrl', ['$scope', '$localStorage', '$window', '$timeout',
    function ($scope, $localStorage, $window, $timeout) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

      function isSmartDevice($window) {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

      /**
      *屏幕的处理
       */
      var screen = function (w) {
        w = w || angular.element($window).width();
        return new screen.fn.init(w);
      };

      screen.prototype = screen.fn = {
        constructor: screen,
        init: function (w) {
          this.w = w;
        },
        isXs: function () {
          return this.w < 768;
        },
        isSm: function () {
          return this.w > 768 && this.w < 992;
        },
        isMd: function (w) {
          return this.w > 992 && this.w < 1200;
        },
        isLg: function (w) {
          return this.w > 1200;
        }
      };

      screen.fn.init.prototype = screen.fn;

      var setting = $scope.setting = {
            //顶部导航
            header: {
              fixed: true, //xs 默认固定
              nav: {
                close: false,
                menu: true,
                left: false,
                right: false,
              },
              expand: {
                up: false
              }
            },
            headerMenu: {
              fixed: true, //xs 默认固定
              show: false // xs 默认不显示
            },
            //菜单
            menu: {
              folded: false,
              show: false,//xs 默认不显示
              fixed: true,// xs 默认固定 其余默认不固定
              docked: false
            },
          },
          header = $scope.header = {
            nav: {
              //切换导航样式
              to: function (val) {
                var n = setting.header.nav;
                for (var i in n) {
                  if (val == i) {
                    n[i] = true;
                  } else {
                    n[i] = false;
                  }
                }
              },
              toggle: function () {
                var scn = screen();
                if (scn.isXs()) {
                  menu.toggleShow();
                } else if (scn.isSm() || scn.isMd() || scn.isLg()) {
                  menu.toggleFold();
                }
              }
            },
            expand: {
              toggle: function () {
                setting.header.expand.up = !setting.header.expand.up;
              },
              up:function () {
                setting.header.expand.up = true;
              },
              down:function () {
                setting.header.expand.up = false;
              }
            }
          },
          //顶部左侧导航
          _headerMenu = setting.headerMenu,
          headerMenu = $scope.headerMenu = {
            fixed: function () {
              _headerMenu.fixed = true;
            },
            mobilizable: function () {
              _headerMenu.fixed = false;
            },
            show: function () {
              _headerMenu.show = true;
            },
            hide: function () {
              _headerMenu.show = false;
            }
          },
          //菜单
          _menu = setting.menu,
          menu = $scope.menu = {
            show: function () {
              //xs 的处理
              header.nav.to('close');
              _menu.show = true;
            },
            toggleShow:function () {
              var t = this;
              if(t.isShow()){
                t.hide();
              }else{
                t.show();
              }
            },
            toggleFold:function () {
              var t = this;
              if(t.isFolded()){
                t.expand();
              }else{
                t.folded();
              }
            },
            isShow: function () {
              return _menu.show;
            },
            isHide: function () {
              return !_menu.show;
            },
            hide:function () {
              header.nav.to('menu');
              _menu.show = false;
            },
            isFolded: function () {
              return _menu.folded;
            },
            fold: function () {
              header.nav.to('right')
              _menu.folded = true;
            },
            folded: function () {
              this.fold();
            },
            expand:function () {
              header.nav.to('left');
              _menu.folded = false;
            },
            updateNotXs:function () {
              menu.hide();
              header.expand.down();
              if (menu.isFolded()) {
                header.nav.to('right');
              } else {
                header.nav.to('left');
              }
            },
            updateXs:function () {
              if (menu.isShow()) {
                header.nav.to('close');
              } else {
                header.nav.to('menu');
              }
            },
            mask:{
              hide:function () {
               menu.hide();
              }
            }
          };
      /**
       * 屏幕尺寸变化处理
       */
      var resize = function () {
        var scn = screen();
        if (scn.isSm() || scn.isMd() || scn.isLg()) {
          menu.updateNotXs();
        } else if (scn.isXs()) {
          menu.updateXs();
        }
      };
      resize.isRun = false;
      angular.element($window).on('resize', function () {
        if (resize.isRun)return;
        resize.isRun = true;
        $timeout(function () {
          resize();
          resize.isRun = false;
        }, 800);
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

})(window);

