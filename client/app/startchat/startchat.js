(function() {
    // state variables in a scope
    is_rendered = false;

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

    .controller('StartchatController', ['$scope', '$firebaseArray', '$location', 'Domains',
        function($scope, $firebaseArray, $location, Domains) {

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
            console.log(Domains);
            // usability improvement.
            $scope.selected = 3;
            $('.selecter').selecter({
              label: 'how could we help?'
            });
            // bootstrap selecter does not like angular select ng-repeat
            // if (!is_rendered) {
            //     Domains.push('Probably a little bit of all.');
            //     is_rendered = true;
            //     $scope.domains = Domains;
            // }
        }
    ]);
})();
