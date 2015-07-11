angular.module('app', ['ngRoute', 'anonichat.Chatroom'])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/app', {
    templateUrl: 'app.html',
    controller: 'appCtrl'
    });
  }
)
.controller('appCtrl', function($scope){

});
