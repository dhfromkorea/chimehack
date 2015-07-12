angular.module('Auth', ['firebase'])

.factory('Auth', ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://anonichat.firebaseio.com/");
    return $firebaseAuth(ref);
  }
])