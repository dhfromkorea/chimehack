angular.module('app', [
  'ngRoute', 
  'anonichat.Chatroom', 
  'anonichat.Startchat', 
  'anonichat.Signup',
  'anonichat.Login'
])
.config(function($routeProvider) {
  $routeProvider
   .when('/app', {
    templateUrl: 'app/app.html',
    controller: 'appCtrl'
    })
   .otherwise({
      redirectTo: '/app'
    });
  }
)
.controller('appCtrl', function($scope){

});
