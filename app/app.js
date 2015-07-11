angular.module('app', ['ngRoute'])
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