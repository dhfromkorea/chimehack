angular.module('anonichat.Login', [
  'firebase',
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/login/login.html',
      controller: 'LoginController'
    });
}])

.controller('LoginController', ['$scope', '$location',
  function($scope, $location) {

  var ref = new Firebase('https://anonichat.firebaseio.com/');

  $scope.email = '';
  $scope.password = '';

  /**
   * DUPLICATE in signup.js
   */
  $scope.login = function() {
    ref.authWithPassword({
      email    : $scope.email,
      password : $scope.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $location.path('/private')
      }
    }, {
      remember: "sessionOnly"
    });
  };

}]);