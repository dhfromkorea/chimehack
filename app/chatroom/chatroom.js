angular.module('anonichat.Chatroom', [
  'firebase',
  'ngRoute'
])

/*.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chatroom', {
    templateUrl: './chatroom.html',
    controller: ChatroomController
  });
}])*/

.controller('ChatroomController', ['$scope', '$firebase', 
  function($scope, $firebase) {
  
  var ref = new Firebase('https://anonichat.firebaseio.com/anonichat');

  $scope.messages = $firebase(ref.limit(15));
  $scope.username = "You";

  $scope.addMessage = function() {
    $scope.messages.$add({
      name: $scope.username,
      message: $scope.message
    });
    $scope.message = "";
  };

}]);