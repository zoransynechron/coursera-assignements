(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    //initial list of items that can be bought
    toBuy.toBuyItems = ShoppingListCheckOffService.addInitialItems();

    toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.addItemToAlreadyBought(ShoppingListCheckOffService.getElementOfToBuyItem (itemIndex));
      ShoppingListCheckOffService.removeItemFromToBuy(itemIndex);
    };
  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.alreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();
  }


  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [];
    var alreadyBoughtItems = [];

    service.addInitialItems = function () {
      if (toBuyItems.length === 0) {
        var itemCookies = {
          name: "cookies",
          quantity: "10"
        };
        var itemChips = {
          name: "chips",
          quantity: "5"
        };
        var itemDrinks = {
          name: "drinks",
          quantity: "15"
        };
        var itemFruits = {
          name: "bananas",
          quantity: "5"
        };
        var itemVegetables = {
          name: "broccoli",
          quantity: "1"
        };
        toBuyItems.push(itemCookies);
        toBuyItems.push(itemChips);
        toBuyItems.push(itemDrinks);
        toBuyItems.push(itemFruits);
        toBuyItems.push(itemVegetables);
      }
      return toBuyItems;
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getAlreadyBoughtItems = function () {
      return alreadyBoughtItems;
    };

    service.getElementOfToBuyItem = function (itemIndex) {
      return toBuyItems[itemIndex];
    };

    service.addItemToAlreadyBought = function (item) {
      alreadyBoughtItems.push(item);
    };

    service.removeItemFromToBuy = function (itemIndex) {
      toBuyItems.splice(itemIndex, 1);
    };

  }

})();
