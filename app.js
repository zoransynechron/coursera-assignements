(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('MenuBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItemsList.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'itemsDirectiveCtrl',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var itemsDirective = this;

    itemsDirective.areItemsFound = function() {
      return itemsDirective.items !== undefined && itemsDirective.items.length === 0;
    };
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowCtrl = this;

    narrowCtrl.getFoundMenuItems = function () {
      if (narrowCtrl.searchTerm === "" || !angular.isDefined(narrowCtrl.searchTerm)) {
           narrowCtrl.found = [];
         } else {
           MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm)
           .then(function(result) {
             narrowCtrl.found = result;
           });
         }
    };

    narrowCtrl.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };

  }

  MenuSearchService.$inject = ['$http', 'MenuBasePath'];
  function MenuSearchService($http,MenuBasePath) {
    var service = this;

    var foundItems = [];

    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
          method: "GET",
          url: (MenuBasePath + "/menu_items.json"),
        }).then(function (result) {
          foundItems = [];
          for (var i = 0; i < result.data.menu_items.length; i++) {
            if (result.data.menu_items[i].description.indexOf(searchTerm) !== -1){
              foundItems.push(result.data.menu_items[i]);
            }
          }
          return foundItems;
        });
    };

    service.removeItem = function (itemIndex) {
      foundItems.splice(itemIndex, 1);
    };
  }
})();
