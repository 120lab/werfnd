'use strict';

angular.module('weRfnd').directive('sameAs', function () {
    return {
      //restrict: 'A', // only activate on element attribute
      require: 'ngModel',  // get a hold of NgModelController
      link: function(scope, element, attrs, ngModelCtrl){

        //if (!ngModelCtrl) return; // do nothing if no ng-model

        // watch own value and re-validate on change
        scope.$watch(attrs.ngModel, function() {
          validate();
        });

        var validate = function() {
          // values
          var val1 = ngModelCtrl.$viewValue;          
          //console.log(JSON.stringify(val1));          
          if(typeof val1 == 'undefined' || val1 == "") 
          {
            console.log('undefined matched');
            ngModelCtrl.$setValidity('password', 1==2);
            return ;
          }
          var strVal = String(val1);
          //console.log(strVal);
          
          var len = strVal.length;
          //console.log(len);
          
          // set validity
          ngModelCtrl.$setValidity('password', len >= 6 && len <= 12);
        };
      }
    };
  });
