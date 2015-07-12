angular.module('anonichat.Login', [
  'firebase',
  'ngRoute',
  'Auth'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/login/login.html',
      controller: 'LoginController'
    });
}])

.controller('LoginController', ['$scope', '$location', 'Auth',
  function($scope, $location, Auth) {

  $scope.email = '';
  $scope.password = '';

  /**
   * DUPLICATE in signup.js
   */
  $scope.login = function() {
    
    Auth.$authWithPassword({
      email: $scope.email,
      password: $scope.password
    }).then(function(authData) {
      console.log("Logged in as:", authData.uid);
      $location.path('/private')
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });

  };

}]);