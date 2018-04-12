angular.module('weRfnd').config(function($urlRouterProvider,$stateProvider){
    $urlRouterProvider.otherwise('/main');
    $stateProvider
    .state('main',{
        url: '/main',
        templateUrl: '/views/main.html'
    })
    .state('register',{
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
    });

})