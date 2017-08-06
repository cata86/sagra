(function () {
  'use strict';

  angular
    .module('App')
    .controller('AppController', AppController);

  AppController.$inject = ['$scope', '$ionicPopover', 'config'];
  function AppController($scope, $ionicPopover, config) {

    $scope.operatore = config.operatore;

    $scope.items = [
      {
          color: "#E47500",
          icon: "ion-android-people",
          title: "Accompagnatore",
          view: "accompagnatore"
      },
      {
          color: "#5AD863",
          icon: "ion-ios-compose",
          title: "Ordini",
          view: "ordini"
      },
      {
          color: "#F8E548",
          icon: "ion-cash",
          title: "Cassa",
          view: "cassa"
      },
      {
          color: "#AD5CE9",
          icon: "ion-android-restaurant",
          title: "Cucina",
          view: "cucina"
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
