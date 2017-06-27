(function() {
'use strict';
  angular
    .module('App')
    .controller('OrdiniController', OrdiniController);

  OrdiniController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Tavoli'];
  function OrdiniController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Tavoli) {

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
      if(table.stato==='richiesto_da_palmare'){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Tavolo non prenotabile',
          template: 'Il tavolo è servito da un altro operatore, proseguire?'
        });

        confirmPopup.then(function(res) {
          if(res) {
            $state.go('app.tavolo', { idTavolo: table.id });
          }
        });
      } else {
        $state.go('app.tavolo', { idTavolo: table.id });
      }
    }

    if (!$scope.item.color) {
        $ionicViewSwitcher.nextDirection('back');
        $ionicHistory.nextViewOptions({
            disableBack: true,
            disableAnimate : true,
            historyRoot  : true
        });
        $state.go('app.gallery');
    }
  }




})();
