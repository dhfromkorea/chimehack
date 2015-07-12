angular.module('anonichat.Startchat', [
  'firebase',
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/startchat', {
      templateUrl: 'app/startchat/startchat.html',
      controller: 'StartchatController'
    });
}])

.controller('StartchatController', ['$scope', '$firebaseArray', '$location',
  function($scope, $firebaseArray, $location) {

  var ref = new Firebase('https://anonichat.firebaseio.com/chatrooms');

  chatrooms = $firebaseArray(ref);
  $scope.listenerId = 2;

  $scope.createChatroom = function() {
    chatrooms.$add({
      listenerId: $scope.listenerId,
      messages: [
        {
          name: 'anonichat',
          message: 'Welcome to the chat!'
        }
      ]
    }).then(function(room) {
      console.log("room created with ID " + room.key());
      $location.path('/chatroom/' + room.key());
    });
  };

}]);