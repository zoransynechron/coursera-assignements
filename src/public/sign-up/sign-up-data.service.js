(function () {
"use strict";

angular.module('public')
.service('SignUpDataService', SignUpDataService);

function SignUpDataService() {
  var service = this;
  var userData;

  service.saveUserData = function(userData) {
    service.userData = userData;
  }

  service.retrieveUserData = function() {
    return service.userData;
  }

}

})();
