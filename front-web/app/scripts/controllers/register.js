'use strict';

/**
 * @ngdoc function
 * @name weRfnd.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the weRfnd
 */
angular.module('weRfnd')
  .controller('RegisterCtrl', function ($scope,$rootScope,$http,alert) {
    $scope.signin = function(){

      console.log('test register');
      
      var url = 'http://localhost:3000/register';
      var user = {
        user : $scope.email,
        password : $scope.register.password.value
      };
      var config = {};

      var successCallback = function(res){
        console.log(user);
        alert('success', 'HipHip, ', 'register done ');
      };
     
     var errorCallback = function(err){
        console.log('test register');
        alert('warning', 'Sorry, ', 'Could not register');
     };
      
      $http.post(url, user).then(successCallback, errorCallback );
      

    }
  });
