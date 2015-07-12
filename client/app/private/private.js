angular.module('anonichat.Private', [
  'ngRoute',
  'Auth'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/private', {
      templateUrl: 'app/private/private.html',
      controller: 'PrivateController'
    });
}])

.controller('PrivateController', ['$scope', 'Auth', '$location', '$firebaseObject',
  function($scope, Auth, $location, $firebaseObject) {

    var authData = Auth.$getAuth()
    $scope.listener;

    if(authData) {
      
      var ref = new Firebase("https://anonichat.firebaseio.com/listeners/" + authData.uid);
      syncListener = $firebaseObject(ref);
      syncListener.$bindTo($scope, 'listener');
      
    } else {
      $location.path('/login')
    }

  }
]);