/*global rollflowApp */
/*global $ */
(function(){
  'use strict';
  rollflowApp.controller('StartRollflowModalController',
    function StartRollflowModalController($scope) {
      $scope.rollflow = {label:""};

      $scope.$on('startRollflowModal.open', function(a,rollflow) {
        $scope.open(rollflow);
      });

      $scope.open = function(rollflow) {
        $scope.rollflow = rollflow;
        $scope.shouldBeOpen = true;
      };

      $scope.close = function() {
        $scope.rollflow = {};
        $scope.shouldBeOpen = false;
      };

      $scope.start = function() {
        var x      = localStorage.getItem('rollflow.inprogress'),
            typeID = $('#typeID').val(),
            id     = $('#id').val(),
            label  = $('#label').val(),
            startItem = $('#startItem').val();
        
        x = JSON.parse(x);
        if (x === null) x = {};
        
        if (typeof x[id] == "undefined") {
          x[id] = {
            id:id,
            label:label,
            rollflow:typeID,
            currentItem:startItem
          };
          localStorage.setItem('rollflow.inprogress', JSON.stringify(x));
          localStorage.setItem('rollflow.current', JSON.stringify(x[id]));
          $scope.close();

          location.href = "#/current";
        } else {
          alert('In progress flow with that ID exists, choose another');
        }
      };

      $scope.opts = {
        backdropFade: true,
        dialogFade:true
      };

    });
})();