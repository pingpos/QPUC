    var app = angular.module("qpucApp");

    app.controller("mainCtrl", function($scope) {
      var idxQuestionCourrante = 0; 
      $scope.numManche = 2;

      var data = questions;
      var audio = null;

      function setManche(num){
        $scope.questionsManche = data["manche" + $scope.numManche];

        $scope.questionCourrante = $scope.questionsManche[idxQuestionCourrante];
        $scope.showRepUnique = false;
      }

      setManche($scope.numManche);


      function questionSuivante(){
        if(idxQuestionCourrante < $scope.questionsManche.length-1){
          $(".reponse").css("background-color","orange");  
          $scope.showRepUnique = false;
          idxQuestionCourrante++;
          $scope.questionCourrante = $scope.questionsManche[idxQuestionCourrante]; 
        }

        if($scope.numManche == 2){
          audio.pause();
          audio = null;
        }

      }
      $scope.questionSuivante = questionSuivante;

      function questionPrecedente(){
        $scope.showRepUnique = false;
        if(idxQuestionCourrante > 0){
          idxQuestionCourrante--;
          $scope.questionCourrante = $scope.questionsManche[idxQuestionCourrante]; 
        }

        if($scope.numManche == 2){
          audio.pause();
          audio = null;
        }
      }
      $scope.questionPrecedente = questionPrecedente;

      function showRep(){
        if($scope.questionCourrante.reponses.length > 1){
          $("#reponse"+  $scope.questionCourrante.juste).css("background-color","green");         
        }else{
          $scope.showRepUnique = true;
        }
      }

      $scope.showRep = showRep;

      function toggleMusic(){
        if(audio == null){
          audio = new Audio($scope.questionCourrante.question);
          audio.currentTime = $scope.questionCourrante.time || 0;
          audio.play(); 
        }else{
          audio.pause(); 
          audio = null;
        }
       
      }
      $scope.toggleMusic = toggleMusic;

    });