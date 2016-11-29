(function (angular) {
  angular.module('app').directive('menu', ['$timeout', '$window', '$document',
    function ($timeout, $window, $document) {
      return {
        restrict: 'C',
        link: function (scope, el) {
          var item = el.find('.menu-item');
          item.bind('click', function (e) {
            e.stopPropagation();
            angular.element(this).addClass('active').siblings('.menu-item').removeClass('active');
          });

          $document.bind('click',function () {
            //item.removeClass('active');
          });

        }
      };
    }]);
})(window.angular);