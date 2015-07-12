angular.module('anonichat.Chatroom', [
  'firebase',
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/chatroom/:id', {
      templateUrl: 'app/chatroom/chatroom.html',
      controller: 'ChatroomController'
    });
}])

.controller('ChatroomController', ['$scope', '$firebaseObject', '$firebaseArray', '$routeParams',
  function($scope, $firebaseObject, $firebaseArray, $routeParams) {

  $scope.room = null;

  var refRoom = new Firebase('https://anonichat.firebaseio.com/chatrooms/' + $routeParams.id);
  var syncRoom = $firebaseObject(refRoom);
  syncRoom.$bindTo($scope, "room");

  $scope.messages = $firebaseArray(refRoom.child('messages'));

  $scope.username = "You";
  $scope.addMessage = function() {
    $scope.messages.$add({
      name: $scope.username,
      message: $scope.message
    });
    $scope.message = "";
  };

  // for chat room GUI starts


  // for chat room GUI ends

}]);