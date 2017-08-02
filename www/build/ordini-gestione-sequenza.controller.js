(function() {
'use strict';

    angular
        .module('App')
        .controller('OrdiniGestioneSequenzaController', OrdiniGestioneSequenzaController);

    OrdiniGestioneSequenzaController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Ordinatore', 'config', 'lodash'];
    function OrdiniGestioneSequenzaController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Ordinatore, config, lodash) {

//TODO mettere controllo se spingo indietro perchè perdo ordine
//TODO gestire le note delle pietanzeOrdinate
//TODO da gestire le sequenze
//Todo gestire flag ordine per spostare tavolo
//TODO aspettare salva dell ordine altrimenti rimandare
//todo slavare operatore e loalhost localstorage

      $scope.numSequenza = 1;


//mi serve categoria codice
      $scope.data = {
        tavolo: $stateParams.tavolo,
        pietanzeOrdinate: $stateParams.pietanzeOrdinate ? lodash.sortBy(
          $stateParams.pietanzeOrdinate, ['categoria.codice', 'nome']
        ) : [],
        numSequenzaSelezionato: $stateParams.numSequenza ? $stateParams.numSequenza : $scope.numSequenza
      };

      $scope.totale = 0;
      lodash.forEach($scope.data.pietanzeOrdinate, function(value) {
        $scope.totale = $scope.totale+ (value.prezzo*value.quantita);
      });

      $scope.modificaPietanzeSequenza = function(numSequenza){
        //todo gestire numero sequenza
        $state.go('app.ordiniSceltaPietanza', {data: $scope.data});
      }

      $scope.inviaOrdine = function(){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Invio ordine',
          template: 'Procedere con l\'invio dell\'ordine?'
        });

        confirmPopup.then(function(res) {
          if(res) {
          }
        });
      }


    }
})();
