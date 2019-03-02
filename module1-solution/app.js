(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.itemsString = "";
    $scope.msg = "";
    $scope.valid = true;

    $scope.checkForItemsNumber = function () {
      if (!angular.isDefined ($scope.itemsString) || $scope.itemsString.length == 0) {
        returnFillDataErrorMessage();
        $scope.valid = false;
        } else {
          var numberOfItems = [];
          numberOfItems =   $scope.itemsString.split(",");
          if (numberOfItems.length <= 3) {
            returnEnjoyMessage();
            $scope.valid = true;
          } else {
            returnTooMucMessage();
            $scope.valid = true;
          }
        }
    };

    function returnFillDataErrorMessage () {
      $scope.msg = "Please enter data first";
    };

    function returnEnjoyMessage () {
      $scope.msg = "Enjoy!";
    };

    function returnTooMucMessage () {
      $scope.msg = "Too much!";
    };
  }

})();
