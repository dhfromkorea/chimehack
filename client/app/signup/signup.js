angular.module('anonichat.Signup', [
  'firebase',
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/signup', {
      templateUrl: 'app/signup/signup.html',
      controller: 'SignupController'
    });
}])

.controller('SignupController', ['$scope', '$location',
  function($scope, $location) {

  var ref = new Firebase('https://anonichat.firebaseio.com/');

  $scope.email = '';
  $scope.password = '';

  $scope.registered = false;

  /**
   * Register a user after clicking the button.
   */
  $scope.register = function() {
    ref.createUser({
      email     : $scope.email,
      password  : $scope.password
    }, function (error, userData) {
      if(error) {
        console.log('Error creating user', error);
      } else {
        $scope.$apply(function() {
          $scope.registered = true;
        });
        console.log('Succesfully created user', userData);
      }
    })
  };

  /**
   * After showing a success message after registration, log the user in
   * and redirect it to the admin page.
   */
  $scope.loginRedirect = function() {
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

  }


}]);