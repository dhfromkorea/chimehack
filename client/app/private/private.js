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

.controller('PrivateController', ['$scope', 'Auth', '$location', '$firebaseObject', '$firebaseArray',
  function($scope, Auth, $location, $firebaseObject, $firebaseArray) {

    var authData = Auth.$getAuth()
    $scope.listener;
    $scope.requests;

    if(authData) {
      
      var ref = new Firebase("https://anonichat.firebaseio.com/listeners/" + authData.uid);
      syncListener = $firebaseObject(ref);
      syncListener.$bindTo($scope, 'listener');

      var refRequests = new Firebase("https://anonichat.firebaseio.com/requests");
      $scope.requests = $firebaseArray(refRequests);
      
      $scope.accept = function(key) {

        var ref = new Firebase('https://anonichat.firebaseio.com/chatrooms');
        chatrooms = $firebaseArray(ref);

        chatrooms.$add({
          listenerId: authData.uid,
          requestId: $scope.requests[key].$id,
          messages: [{
            name: 'GlassChat',
            message: 'Welcome to this private, anonymous chat with ' + $scope.listener.name
          }]
        }).then(function(room) {
          $scope.requests[key].roomId = room.key();
          $scope.requests.$save(key).then(function(ref) {
            console.log('redirecting to room ' + room.key());
            $location.path('/chatroom/' + room.key());
          });
        });
      }

    } else {
      $location.path('/login')
    }

  }
]);