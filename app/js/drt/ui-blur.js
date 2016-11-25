angular.module('app')
    .directive('uiBlur', ['$timeout', '$parse', function ($timeout, $parse) {
      return {
        link: function (scope, element, attr) {

          console.log(scope);
          console.log(element);
          console.log(attr);

          var model = $parse(attr.uiBlur);

          console.log(model);
          // scope.$watch(model, function (value) {
          //   console.log('watch');
          //   if (value === true) {
          //     $timeout(function () {
          //       element.focus();
          //     });
          //   }
          // });
          element.attr('tabindex',Math.round(500 + Math.random() * 500));
          element.bind('blur', function () {
            //scope.$apply(model.assign(scope, false));
            console.log('blur');
          });
          element.bind('focus',function () {
            console.log('focus');
          });

          element.on('blur',function () {
            console.log('blur');
          });

          //element.trigger('click');

          $(element[0]).on('click',function () {
            console.log('jq blur');
          });

        }
      };
    }]);