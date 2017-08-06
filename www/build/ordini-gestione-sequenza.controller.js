(function() {
'use strict';

    angular
        .module('App')
        .controller('OrdiniGestioneSequenzaController', OrdiniGestioneSequenzaController);

    OrdiniGestioneSequenzaController.$inject = ['$scope', '$rootScope', '$stateParams', '$ionicPlatform', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Ordinatore', 'config', 'lodash'];
    function OrdiniGestioneSequenzaController($scope, $rootScope, $stateParams, $ionicPlatform, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Ordinatore, config, lodash) {

//TODO gestire le note delle pietanzeOrdinate
//Todo gestire flag ordine per spostare tavolo
//TODO aspettare salva dell ordine altrimenti rimandare
//todo slavare operatore e loalhost localstorage
//solo in una sequenz posso mettere coperti

      //mi serve categoria codice
      $scope.data = {
        tavolo: $stateParams.tavolo,
        pietanzeOrdinate: $stateParams.pietanzeOrdinate ? lodash.sortBy(
          $stateParams.pietanzeOrdinate, ['categoria.codice', 'nome']
        ) : [],
        numSequenzaSelezionato: $stateParams.numSequenza ? $stateParams.numSequenza : 1,
        sequenze: $stateParams.sequenze ? $stateParams.sequenze : [1]
      };

      $scope.totale = 0;
      lodash.forEach($scope.data.pietanzeOrdinate, function(value) {
        $scope.totale = $scope.totale+ (value.prezzo*value.quantita);
      });

      $scope.aggiungiSequenza = function(){
        var maxSequenza = lodash.max($scope.data.sequenze);
        $scope.data.sequenze.push(maxSequenza+1);
      }

      $scope.rimuoviSequenza = function(numSequenza){
        if($scope.data.sequenze.length === 1){
          var confirmPopup = $ionicPopup.alert({
            title: 'Elimina sequenza',
            template: 'Impossibile eliminare l\'unica sequenza'
          });
          confirmPopup.then(function(res) {
            if(res) {
              confirmPopup.close();
            }
          });
        } else {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Elimina sequenza',
            template: 'Eliminare la sequenza '+numSequenza+'?'
          });
          confirmPopup.then(function(res) {
            if(res) {
              //elimino pietanze della sequenza
              lodash.remove($scope.data.pietanzeOrdinate, function(value) {
                return value.numSequenza === numSequenza;
              });
              //Elimino la sequenza
              lodash.remove($scope.data.sequenze, function(value) {
                return value === numSequenza;
              });
              //Scalo le altre sequenze
              lodash.forEach($scope.data.pietanzeOrdinate, function(value) {
                if(value.numSequenza>numSequenza){
                  value.numSequenza = value.numSequenza-1;
                }
              });
              lodash.forEach($scope.data.sequenze, function(value, key) {
                if(value>numSequenza){
                  $scope.data.sequenze[key] = value-1;
                }
              });
            }
          });
        }
      }

      $scope.modificaPietanzeSequenza = function(numSequenza){
        $scope.data.numSequenzaSelezionato = numSequenza;
        $state.go('app.ordiniSceltaPietanza', {data: $scope.data});
      }

      $scope.inviaOrdine = function(){
        var pietanzeOrdine = [];
        lodash.forEach($scope.data.pietanzeOrdinate, function(value) {
          var pietanzaOrdinata = {
            note: "",
            numSequenza: value.numSequenzaSelezionato,
            pietanza: {
              id: value.id
            },
            quantita: value.quantita
          };
          pietanzeOrdine.push(pietanzaOrdinata);
        });

        var confirmPopup = $ionicPopup.confirm({
          title: 'Invio ordine',
          template: 'Procedere con l\'invio dell\'ordine?'
        });

        confirmPopup.then(function(res) {
          if(res) {
            Ordinatore.creaOrdine(
              {
                asporto: $scope.data.tavolo.asporto,
                idTavoloAccomodato: $scope.data.tavolo.id,
                numCoperti: 0,
                personaOrdine: config.operatore,
                pietanzeOrdinate: pietanzeOrdine
              }
            ).then(function(response){
               $state.go('app.ordini', { title: 'Ordini', icon: null, color: null }, {reload: true});
            });
          }
        });
      }


      // run this function when either hard or soft back button is pressed
      var doCustomBack = function() {
        if($scope.data.pietanzeOrdinate.length > 0){
          var confirmPopup = $ionicPopup.confirm({
            title: 'Cancellazione ordine',
            template: 'L\'ordine verrà perso, confermi?'
          });

          confirmPopup.then(function(res) {
            if(res) {
                $state.go('app.ordini', { title: 'Ordini', icon: null, color: null }, {reload: true});
            }
          });
        } else
          $state.go('app.ordini', { title: 'Ordini', icon: null, color: null }, {reload: true});
      };

      // override soft back
      // framework calls $rootScope.$ionicGoBack when soft back button is pressed
      var oldSoftBack = $rootScope.$ionicGoBack;
      $rootScope.$ionicGoBack = function() {
          doCustomBack();
      };
      var deregisterSoftBack = function() {
          $rootScope.$ionicGoBack = oldSoftBack;
      };

      // override hard back
      // registerBackButtonAction() returns a function which can be used to deregister it
      var deregisterHardBack = $ionicPlatform.registerBackButtonAction(
          doCustomBack, 101
      );

      // cancel custom back behaviour
      $scope.$on('$destroy', function() {
          deregisterHardBack();
      });



    }
})();
