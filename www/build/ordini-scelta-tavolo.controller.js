(function() {
'use strict';
  angular
    .module('App')
    .controller('OrdiniSceltaTavoloController', OrdiniSceltaTavoloController);

OrdiniSceltaTavoloController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Ordinatore', 'lodash', 'Constants'];
  function OrdiniSceltaTavoloController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Ordinatore, lodash, Constants) {

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

    $scope.btnSelectedInAttesa = true;
    $scope.tavoliAccomodati = [];

    $scope.tavoliAccomodatiTutti = [];
    $scope.tavoliAccomodatiInAttesa = [];
    $scope.caricaTavoliAccomodati = function( ){
      Ordinatore.getListaTavoliAccomodati({statoOrdinato: true, asporto: false}).then(function(response){
        $scope.tavoliAccomodatiTutti = lodash.sortBy(
          response.data, ['accomodatoOrario', 'codice']
        );
        $scope.tavoliAccomodatiInAttesa = lodash.sortBy(
          lodash.filter(response.data, function(tav){
            return tav.stato !== Constants.statoTavolo.ordinato.stato;
          }),
          ['accomodatoOrario', 'codice']
        );
        $scope.tavoliAccomodati = $scope.tavoliAccomodatiInAttesa;
      });
    };
    $scope.caricaTavoliAccomodati();


    $scope.setInAttesa = function(){
      $scope.tavoliAccomodati = $scope.tavoliAccomodatiInAttesa;
      $scope.btnSelectedInAttesa = true;
    }

    $scope.setTutti = function(){
      $scope.tavoliAccomodati = $scope.tavoliAccomodatiTutti;
      $scope.btnSelectedInAttesa = false;
    }


    $scope.visualizzaTavolo = function(tavolo){
      if(tavolo.stato === Constants.statoTavolo.in_ordinazione.stato){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Tavolo non prenotabile',
          template: 'Il tavolo è servito da un altro operatore, proseguire?'
        });

        confirmPopup.then(function(res) {
          if(res) {
            $state.go('app.ordiniGestioneSequenza', { tavolo: tavolo });
          }
        });
      } else {
        $state.go('app.ordiniGestioneSequenza', { tavolo: tavolo });
      }
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
