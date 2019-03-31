(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'SignUpDataService', 'menuItems'];
function SignUpController(MenuService, SignUpDataService, menuItems) {
  var $ctrl = this;
  var shortNames = [];
  for (var i = 0; i < menuItems.menu_items.length; i++) {
    shortNames.push(menuItems.menu_items[i].short_name.toLowerCase() + "");
  }

  $ctrl.submit = function() {
    if ($ctrl.user.favourite !== undefined) {
      MenuService.getMenuItemByShortName($ctrl.user.favourite).then(function(result) {
        $ctrl.invalidMenuItem = false;
        $ctrl.user.favouriteMenuItem = result;
        SignUpDataService.saveUserData($ctrl.user);
        $ctrl.saved = true;
      }, function(error) {
        $ctrl.invalidMenuItem = true;
        $ctrl.saved = false;
      });
    } else {
      $ctrl.invalidMenuItem = true;
      $ctrl.saved = false;
    }
};
}

})();
