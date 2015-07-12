angular.module('anonichat.Startchat', [
  'firebase',
  'ngRoute',
  'Domains'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/startchat', {
      templateUrl: 'app/startchat/startchat.html',
      controller: 'StartchatController'
    });
}])

.controller('StartchatController', ['$scope', '$firebaseArray', '$location','Domains',
  function($scope, $firebaseArray, $location, Domains) {

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
  console.log(Domains);
  $scope.domains = Domains;
  $scope.selected = Domains[0];

}]);