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

.controller('StartchatController', ['$scope', '$firebaseArray', '$firebaseObject', '$location',
  function($scope, $firebaseArray, $firebaseObject, $location) {

  var ref = new Firebase('https://anonichat.firebaseio.com/requests');
  var requests = $firebaseArray(ref);

  $scope.domain = '';
  $scope.waiting = false;
  $scope.ready = false;


  var request = null;
  var roomId = null;

  $scope.startChat = function() {

    console.log('starting chat');

    requests.$add({
      domain: $scope.domain,
      roomId: null
    }).then(function(req) {
      request = req;
      $scope.waiting = true;
      // wait for a update on request
      request.on('value', function(snapshot) {
        request = snapshot;
        if(request.val().roomId) {
          $scope.ready = true;
        }
      });

    });

  }

  $scope.goToRoom = function() {
    console.log(request);
    console.log(request.key(), request.val().roomId);
    $location.path('/chatroom/' + request.val().roomId);
  };

            // usability improvement.
            $scope.selected = 1;
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
