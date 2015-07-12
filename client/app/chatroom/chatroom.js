angular.module('anonichat.Chatroom', [
  'firebase',
  'ngRoute',
  'Auth'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/chatroom/:id', {
            templateUrl: 'app/chatroom/chatroom.html',
            controller: 'ChatroomController'
        });
}])

.controller('ChatroomController', ['$scope', 'Auth', '$firebaseArray', '$firebaseObject', '$routeParams',
  function($scope, Auth, $firebaseArray, $firebaseObject,  $routeParams) {

  var refRoom = new Firebase('https://anonichat.firebaseio.com/chatrooms/' + $routeParams.id);
  var syncRoom = $firebaseObject(refRoom);
  syncRoom.$bindTo($scope, "room");

  $scope.messages = $firebaseArray(refRoom.child('messages'));

  $scope.messages = $firebaseArray(refRoom.child('messages'));
  $scope.listener = null;

  var username = "You";

  Auth.$onAuth(function(authData) {
    if(authData.uid) {
      var ref = new Firebase("https://anonichat.firebaseio.com/listeners/" + authData.uid);
      syncListener = $firebaseObject(ref);
      syncListener.$bindTo($scope, 'listener');
    }
  });

  $scope.$watch('listener', function(newVal) {
    if($scope.listener) {
      username = $scope.listener.name;
      console.log(username);
    }
  });

  $scope.addMessage = function() {
    $scope.messages.$add({
      name: username,
      message: $scope.message
    });
    $scope.message = "";
  };

}
]);
