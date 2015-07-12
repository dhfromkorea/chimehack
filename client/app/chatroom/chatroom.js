angular.module('anonichat.Chatroom', [
  'firebase',
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chatroom', {
    templateUrl: 'app/chatroom/chatroom.html',
    controller: 'ChatroomController'
  });
}])

.controller('ChatroomController', ['$scope', '$firebaseArray',
  function($scope, $firebaseArray) {

  var ref = new Firebase('https://anonichat.firebaseio.com/anonichat');

  $scope.messages = $firebaseArray(ref.limitToLast(15));
  $scope.username = "You";

  $scope.addMessage = function() {
    $scope.messages.$add({
      name: $scope.username,
      message: $scope.message
    });
    $scope.message = "";
  };

}]);