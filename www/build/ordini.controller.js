(function() {
'use strict';
  angular
    .module('App')
    .controller('OrdiniController', OrdiniController);

  OrdiniController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','Tavoli'];
  function OrdiniController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Tavoli) {

    $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
    };

    $scope.btnSelectedInAttesa = true;
    $scope.tavoli = Tavoli.inAttesa();

    $scope.setInAttesa = function(){
      $scope.tavoli = Tavoli.inAttesa();
      $scope.btnSelectedInAttesa = true;
    }

    $scope.setTutti = function(){
      $scope.tavoli = Tavoli.all();
      $scope.btnSelectedInAttesa = false;
    }

    $scope.viewTable = function(table){
      $state.go('app.tavolo', { idTavolo: table.id });
    }

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
