(function() {
'use strict';
  angular
    .module('App')
    .controller('ModificaOrdineSceltaTavoloController', ModificaOrdineSceltaTavoloController);

ModificaOrdineSceltaTavoloController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Ordinatore', 'lodash', 'Constants'];
  function ModificaOrdineSceltaTavoloController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Ordinatore, lodash, Constants) {

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

    $scope.btnSelectedAsporto = false;
    $scope.tavoliAccomodati = [];

    $scope.caricaTavoliAccomodati = function( ){
      Ordinatore.getListaTavoliAccomodati({statoOrdinato: true, asporto: true}).then(function(response){
        $scope.tavoliAccomodati = lodash.sortBy(
          response.data, ['accomodatoOrario', 'codice']
        );
      });
    };
    $scope.caricaTavoliAccomodati();


    $scope.setAsporto = function(){
      // $scope.tavoliAccomodati = $scope.tavoliAccomodatiInAttesa;
      $scope.btnSelectedAsporto = true;
    }

    $scope.setTutti = function(){
      // $scope.tavoliAccomodati = $scope.tavoliAccomodatiTutti;
      $scope.btnSelectedAsporto = false;
    }


    $scope.visualizzaTavolo = function(tavolo){
      $state.go('app.modificaOrdineSceltaOrdine', { tavolo: tavolo });
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
