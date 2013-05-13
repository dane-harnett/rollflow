/*global rollflowApp */
/*global $ */
(function(){
  'use strict';
  rollflowApp.controller('HomeController',
    function HomeController($scope) {
      var inProgress = localStorage.getItem('rollflow.inprogress');

      $scope.toStart = {};

      $.getJSON('data/app-rollflows.json', function(data) {
        $scope.$apply(function(){
          $scope.rollflows = data.rollflows;
        });
      });

      $scope.rollflowsInProgress = JSON.parse(inProgress);

      $scope.openStartModal = function(flow) {
        $scope.$broadcast('startRollflowModal.open', flow);
      };

      $scope.continueFlow = function(flow) {
        localStorage.setItem('rollflow.current', JSON.stringify(flow));
        location.href = "#/current";
      };

    });
})();