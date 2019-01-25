    var app = angular.module("qpucApp", ["firebase"]);

    app.controller("mainCtrl", function($scope, $firebaseArray) {
      var ref1 = new Firebase("https://qpuc-90ecd.firebaseio.com/messages");
      
      // create a synchronized array
      $scope.messages = $firebaseArray(ref1);
      // add new items to the array
      // the message is automatically added to our Firebase database!
      $scope.addMessage = function() {
        $scope.messages.$add({
          text: $scope.newMessageText
        });
      };

      var ref = new Firebase("https://qpuc-90ecd.firebaseio.com/data");
      var syncObject = $firebaseObject(ref);
      // synchronize the object with a three-way data binding
      // click on `index.html` above to see it used in the DOM!
      syncObject.$bindTo($scope, "data");
      // click on `index.html` above to see $remove() and $save() in action
    });