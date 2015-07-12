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
    function($scope, Auth, $firebaseArray, $firebaseObject, $routeParams) {

        var refRoom = new Firebase('https://anonichat.firebaseio.com/chatrooms/' + $routeParams.id);
        var syncRoom = $firebaseObject(refRoom);
        syncRoom.$bindTo($scope, "room");

        $scope.messages = $firebaseArray(refRoom.child('messages'));

        $scope.messages = $firebaseArray(refRoom.child('messages'));
        // $scope.listener = null;
        var defaultListenerProfile = {
            name: 'Lisa Kingsley',
            story: 'I have been there. I may not know the answer, but I can certainly listen.',
            imgUrl: 'http://orig05.deviantart.net/33cb/f/2010/122/6/2/young_woman_4_by_imaswedestock.jpg'
        };
        $scope.listener = defaultListenerProfile;
        var username = "You";


        $scope.$watch('listener', function(newVal) {
            if ($scope.listener) {
                username = $scope.listener.name;
            }
        });

        Auth.$onAuth(function(authData) {
            if (authData.uid) {
                var ref = new Firebase("https://anonichat.firebaseio.com/listeners/" + authData.uid);
                syncListener = $firebaseObject(ref);
                syncListener.$bindTo($scope, 'listener');
            }
        });

        $scope.addMessage = function() {
            $scope.messages.$add({
                name: username,
                message: $scope.message
            });
            $scope.message = "";
        };
        // just for the time being. you can delete: START
        var ref = new Firebase('https://anonichat.firebaseio.com/chatrooms');

        chatrooms = $firebaseArray(ref);
        $scope.listenerId = 2;

        $scope.createChatroom = function() {
            chatrooms.$add({
                listenerId: $scope.listenerId,
                messages: [{
                    name: 'anonichat',
                    message: 'Welcome to the chat!'
                }]
            }).then(function(room) {
                console.log("room created with ID " + room.key());
                $location.path('/chatroom/' + room.key());
            });
        };
        // just for the time being. you can delete: END

    }
]);
