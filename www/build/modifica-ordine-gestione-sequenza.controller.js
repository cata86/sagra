(function() {
'use strict';

    angular
        .module('App')
        .controller('ModificaOrdineGestioneSequenzaController', ModificaOrdineGestioneSequenzaController);

    ModificaOrdineGestioneSequenzaController.$inject = ['$scope', '$rootScope', '$stateParams', '$ionicPlatform', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Ordinatore', 'config', 'lodash'];
    function ModificaOrdineGestioneSequenzaController($scope, $rootScope, $stateParams, $ionicPlatform, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Ordinatore, config, lodash) {

      $scope.data = {
        tavolo: $stateParams.tavolo,
        ordine: $stateParams.ordine ? $stateParams.ordine : null,
        pietanzeOrdinate: $stateParams.pietanzeOrdinate ? lodash.sortBy(
          $stateParams.pietanzeOrdinate, ['categoria.codice', 'nome']
        ) : [],
        numSequenzaSelezionato: $stateParams.numSequenza ? $stateParams.numSequenza : 1,
        sequenze: $stateParams.ordine.sequenze ? $stateParams.ordine.sequenze : [1]
      };

      if(!$stateParams.pietanzeOrdinate){
        lodash.forEach(lodash.sortBy($stateParams.ordine.pietanzeOrdinate, ['categoria.codice', 'nome']), function(value) {
          var pietanza = {
            categoria: value.pietanza.categoria,
            contatore: value.pietanza.contatore,
            coperto: value.pietanza.coperto,
            descrizione: value.pietanza.descrizione,
            id: value.pietanza.id,
            nome: value.pietanza.nome,
            numSequenza: value.numSequenza,
            prezzo: value.pietanza.prezzo,
            quantita: value.quantita
          }
          $scope.data.pietanzeOrdinate.push(pietanza);
        });
      }


      lodash.sortBy(
        $scope.data.pietanzeOrdinate, ['categoria.codice', 'nome']
      );


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
        $state.go('app.modificaOrdineSceltaPietanza', {data: $scope.data});
      }

      $scope.modificaOrdine = function(){
        var pietanzeOrdine = [];
        var numeroCopertiPietanza = 0;
        lodash.forEach($scope.data.pietanzeOrdinate, function(value) {
          var pietanzaOrdinata = {
            note: "",
            numSequenza: value.numSequenza,
            pietanza: {
              id: value.id
            },
            quantita: value.quantita,
            coperto: value.coperto
          };
          if(pietanzaOrdinata.coperto)
            numeroCopertiPietanza = pietanzaOrdinata.quantita;
          pietanzeOrdine.push(pietanzaOrdinata);
        });

        var confirmPopup = $ionicPopup.confirm({
          title: 'Modificare l\'ordine',
          template: 'Procedere con la modifica dell\'ordine?'
        });

        confirmPopup.then(function(res) {
          if(res) {
            Ordinatore.modificaOrdine(
              {
                id: $scope.data.ordine.id,
                asporto: $scope.data.tavolo.asporto,
                idTavoloAccomodato: $scope.data.tavolo.id,
                numCoperti: numeroCopertiPietanza,
                personaOrdine: config.operatore,
                pietanzeOrdinate: pietanzeOrdine
              }
            ).then(function(response){
               $state.go('app.modifica-ordine', { title: 'Modifica ordine', icon: null, color: null }, {reload: true});
            });
          }
        });
      }


      $scope.eliminaOrdine = function(){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Elimina l\'ordine',
          template: 'Procedere con l\'eliminazione dell\'ordine?'
        });

        confirmPopup.then(function(res) {
          if(res) {
            Ordinatore.eliminaOrdine({idOrdine:$scope.data.ordine.id}
            ).then(function(response){
               $state.go('app.modifica-ordine', { title: 'Modifica ordine', icon: null, color: null }, {reload: true});
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
                $state.go('app.modifica-ordine', { title: 'Ordini', icon: null, color: null }, {reload: true});
            }
          });
        } else
          $state.go('app.modifica-ordine', { title: 'Ordini', icon: null, color: null }, {reload: true});
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
