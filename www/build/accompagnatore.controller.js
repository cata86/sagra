(function() {
'use strict';

  angular
    .module('App')
    .controller('AccompagnatoreController', AccompagnatoreController);

  AccompagnatoreController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','Tavoli'];
  function AccompagnatoreController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Tavoli) {

    $scope.item = {
      title: $stateParams.title,
      icon: $stateParams.icon,
      color: $stateParams.color
    };

		$scope.tavoli = Tavoli.all();

    if (!$scope.item.color) {
      $ionicViewSwitcher.nextDirection('Indietro');
      $ionicHistory.nextViewOptions({
          disableBack: true,
          disableAnimate : true,
          historyRoot  : true
      });
      $state.go('app.gallery');
    }
  }
})();
