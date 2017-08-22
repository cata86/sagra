(function () {
  'use strict';

  angular
    .module('App')
    .controller('AppController', AppController);

  AppController.$inject = ['$scope', '$ionicPopover', 'config', '$rootScope', '$window'];
  function AppController($scope, $ionicPopover, config, $rootScope, $window) {

    $scope.operatore = config.operatore;

    if($window.localStorage.getItem("host")){
        config.apiHost = $window.localStorage.getItem("host");
    }

    if($window.localStorage.getItem("itemAbilitati")){
        $rootScope.items = JSON.parse($window.localStorage.getItem("itemAbilitati"));
    }else{
        $rootScope.items = [
      {
          color: "#e63900",
          icon: "ion-android-people",
          title: "Tavoli",
          view: "accompagnatore",
          checked: true
      },
      {
          color: "#5AD863",
          icon: "ion-android-restaurant",
          title: "Ordini",
          view: "ordini",
          checked: true
      },
      {
          color: "#f8cd49",
          icon: "ion-android-car",
          title: "Asporto",
          view: "asporto",
          checked: true
      },
      {
          color: "#AD5CE9",
          icon: "ion-ios-speedometer",
          title: "Contatori",
          view: "contatori",
          checked: true
      },
      {
          color: "#6666ff",
          icon: "ion-cash",
          title: "Serate",
          view: "serate",
          checked: true
      },
      {
          color: "#cc0099",
          icon: "ion-ios-compose",
          title: "Modifica ordine",
          view: "modifica-ordine",
          checked: true
      },
      {
          color: "#e86836",
          icon: "ion-cube",
          title: "Stato tavolo",
          view: "stato-tavolo",
          checked: true
      }
    ];
    }
    

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
