var app = angular.module('jmApp', ['ngRoute'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{
   $locationProvider.html5Mode({
      enable: true,
      requireBase: false
   });

   try {
      $routeProvider.when('/', {
         templateUrl : '/app/views/login.html',
         controller     : 'loginController',
         }).when('/board', {
           templateUrl : "/app/views/board.html",
           controller  : 'boardController',
        }).when('/login', {
         templateUrl : '/app/views/login.html',
         controller     : 'loginController',
      }).otherwise ({ redirectTo: '/' });
   } catch (error) {
      console.log(error);
   }
}]);

