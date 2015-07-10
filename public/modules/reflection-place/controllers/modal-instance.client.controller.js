'use strict';

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('reflection-place').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, logTitle) {

  $scope.items = items;
  $scope.logTitle = logTitle;
    
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});