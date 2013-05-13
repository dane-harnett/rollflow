/*global rollflowApp */
/*global $ */
(function(){
  'use strict';
  rollflowApp.controller('CurrentController', function CurrentController($scope) {
    $scope.variables = {};
    $scope.settings  = {};

    $scope.setRollflow = function(rollflow) {
      $scope.rollflow = rollflow;
    };

    $scope.setCurrentItem = function(itemID) {
      $scope.rollflow.items[itemID].visible = true;
    };

    //$scope.rollflow = JSON.parse(data);

    $scope.done = function(item, doneOption) {
      var $currentItem = $('#' + item.id),
        $nextItem = null,
        variable = null;


      if (typeof item.type != "undefined" && item.type == "variable") {
        variable  = $scope.variables[item.variable];
        $nextItem = $('#' + item.nextItems[variable].id);
        doneOption = $scope.rollflow.items[item.nextItems[variable].id];
      } else {
        $nextItem = $('#' + doneOption.id);
      }

      $scope.variables[item.id] = doneOption.label;


      //$currentItem.css('width', ($currentItem.closest('.container').width() - 2) + 'px');
      $currentItem.css('position', 'absolute');
      $currentItem.animate({top:'-200px'}, function() {
        item.visible = false;
      });

      //$nextItem.css('width', ($nextItem.closest('.container').width() - 2) + 'px');
      $nextItem.css('position', 'absolute');
      $nextItem.css('top', '200px');
      $scope.rollflow.items[doneOption.id].visible = true;
      $nextItem.animate({top:'0'});

      $scope.currentFlowInst.currentItem = doneOption.id;
      var ip = JSON.parse(localStorage.getItem('rollflow.inprogress'));
      ip[$scope.currentFlowInst.id] = $scope.currentFlowInst;
      localStorage.setItem('rollflow.inprogress', JSON.stringify(ip));
      localStorage.setItem('rollflow.current', JSON.stringify($scope.currentFlowInst));
    };

    $scope.currentFlowInst = JSON.parse(localStorage.getItem('rollflow.current'));
    var currentFlow = null;

    $.getJSON('data/app-rollflows.json', function(data) {
      currentFlow = data.rollflows[$scope.currentFlowInst.rollflow];

      $.getJSON('data/' + currentFlow.file, function(data2) {
        $scope.$apply(function(){
          $scope.setRollflow(data2);
          $scope.setCurrentItem($scope.currentFlowInst.currentItem);
        });
      });
    });
  });
})();