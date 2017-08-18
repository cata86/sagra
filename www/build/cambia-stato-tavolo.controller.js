(function() {
'use strict';
  angular
    .module('App')
    .controller('CambiaStatoTavoloController', CambiaStatoTavoloController);

CambiaStatoTavoloController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Ordinatore', 'lodash', 'Constants'];
  function CambiaStatoTavoloController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Ordinatore, lodash, Constants) {

    $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
    };

    $scope.getColoreStatoTavolo = function(statoTavoloAccomodato){
      var colore = lodash.filter(Constants.statoTavolo, function(statoTavolo){
          return statoTavolo.stato === statoTavoloAccomodato;
      })[0].colore;
      return {"color": colore};
    }

    $scope.statiTavolo = Constants.statoTavolo;
    $scope.statoTavoloSelected = $scope.statiTavolo[0];

    $scope.tavoliAccomodati = [];

    $scope.caricaTavoliAccomodati = function( ){
      Ordinatore.getListaTavoliAccomodati({statoOrdinato: true, asporto: false}).then(function(response){
        $scope.tavoliAccomodati = lodash.orderBy(
          response.data, ['accomodatoOrario', 'codice'], ['desc', 'asc']   //TODO
        );
      });
    };
    $scope.caricaTavoliAccomodati();

    $scope.setStatoTavolo = function(statoTavolo){
      $scope.statoTavoloSelected = statoTavolo;
    }


    $scope.cambiaStatoTavolo = function(tavolo){
      $state.go('app.', { tavolo: tavolo });
    }


    if (!$scope.item.title) {
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
