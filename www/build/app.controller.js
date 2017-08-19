(function () {
  'use strict';

  angular
    .module('App')
    .controller('AppController', AppController);

  AppController.$inject = ['$scope', '$ionicPopover', 'config', '$rootScope'];
  function AppController($scope, $ionicPopover, config, $rootScope) {

    $scope.operatore = config.operatore;

    $rootScope.items = [
      {
          color: "#e63900",
          icon: "ion-android-people",
          title: "Tavoli",
          view: "accompagnatore"
      },
      {
          color: "#5AD863",
          icon: "ion-android-restaurant",
          title: "Ordini",
          view: "ordini"
      },
      {
          color: "#f8cd49",
          icon: "ion-android-car",
          title: "Asporto",
          view: "asporto"
      },
      {
          color: "#AD5CE9",
          icon: "ion-ios-speedometer",
          title: "Contatori",
          view: "contatori"
      },
      {
          color: "#6666ff",
          icon: "ion-cash",
          title: "Serate",
          view: "serate"
      },
      {
          color: "#cc0099",
          icon: "ion-ios-compose",
          title: "Modifica ordine",
          view: "modifica-ordine"
      },
      {
          color: "#e86836",
          icon: "ion-cube",
          title: "Stato tavolo",
          view: "stato-tavolo"
      }
    ];

    $scope.exitApp = function () {
        ionic.Platform.exitApp();
    };

    $ionicPopover.fromTemplateUrl('templates/modals/popover.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };

    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
  }
})();
