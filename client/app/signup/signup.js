angular.module('anonichat.Signup', [
  'firebase',
  'ngRoute',
  'Auth'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/signup', {
      templateUrl: 'app/signup/signup.html',
      controller: 'SignupController'
    });
}])

.controller('SignupController', ['$scope', '$location', 'Auth',
  function($scope, $location, Auth) {

  $scope.email = '';
  $scope.password = '';

  $scope.registered = false;
  $scope.error = null;

  /**
   * Register a user after clicking the button.
   */
  $scope.register = function() {

    Auth.$createUser({
      email: $scope.email,
      password: $scope.password
    }).then(function(userData) {
      $scope.registered = true
      console.log("User created with uid: " + userData.uid);
    }).catch(function(error) {
      $scope.error = error;
    });

  };

  /**
   * After showing a success message after registration, log the user in
   * and redirect it to the admin page.
   */
  $scope.loginRedirect = function() {

    Auth.$authWithPassword({
      email: $scope.email,
      password: $scope.password
    }).then(function(authData) {
      console.log("Logged in as:", authData.uid);
      $location.path('/private')
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });

  }


}]);