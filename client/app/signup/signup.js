angular.module('anonichat.Signup', [
  'firebase',
  'ngRoute',
  'Auth',
  'Domains',
  'checklist-model'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/signup', {
      templateUrl: 'app/signup/signup.html',
      controller: 'SignupController'
    });
}])

.controller('SignupController', ['$scope', '$location', 'Auth', '$firebaseObject', 'Domains',
  function($scope, $location, Auth, $firebaseObject, Domains) {

  $scope.email = '';
  $scope.password = '';

  $scope.registered = false;
  $scope.infosaved = false;
  $scope.error = null;

  $scope.domains = Domains;

  /**
   * Register a user after clicking the button.
   */
  $scope.register = function() {

    Auth.$createUser({
      email: $scope.email,
      password: $scope.password
    }).then(function(userData) {
      startGettingInfo(userData.uid);
      console.log("User created with uid: " + userData.uid);
    }).catch(function(error) {
      $scope.error = error;
    });

  };

  $scope.listener = null;

  var startGettingInfo = function(uid) {
    console.log('Start getting info');
    var ref = new Firebase('https://anonichat.firebaseio.com/listeners/' + uid);
    var syncListener = $firebaseObject(ref);
    syncListener.$bindTo($scope, 'listener');
    
    $scope.registered = true;
    
  }

  /**
   * Provide additional information
   */
   $scope.saveInformation = function() {
    $scope.infosaved = true;
    console.log('going to private');
    login();
   }

  /**
   * After showing a success message after registration, log the user in
   * and redirect it to the admin page.
   */
  var login = function() {

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