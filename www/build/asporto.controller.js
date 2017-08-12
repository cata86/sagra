(function() {
'use strict';

    angular
        .module('App')
        .controller('AsportoController', AsportoController);

    AsportoController.$inject = ['$scope', '$rootScope', '$stateParams', '$ionicPlatform', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Accompagnatore', 'Ordinatore', 'config', 'lodash'];
    function AsportoController($scope, $rootScope, $stateParams, $ionicPlatform, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Accompagnatore, Ordinatore, config, lodash) {

      $scope.numeroSequenzaDefault = 1;

      $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
      };

      $scope.data = {
        tavoloReale: $stateParams.tavoloReale ? $stateParams.tavoloReale : undefined,
        tavolo: $stateParams.tavolo ? $stateParams.tavolo : undefined,
        pietanzeOrdinate: $stateParams.pietanzeOrdinate ? lodash.sortBy(
          $stateParams.pietanzeOrdinate, ['categoria.codice', 'nome']
        ) : [],
        nomeAsporto: $stateParams.nomeAsporto ? $stateParams.nomeAsporto : ''
      };

      $scope.totale = 0;
      lodash.forEach($scope.data.pietanzeOrdinate, function(value) {
        $scope.totale = $scope.totale+ (value.prezzo*value.quantita);
      });

      $scope.modificaPietanze = function(){
        $state.go('app.asportoSceltaPietanza', {data: $scope.data});
      }

      $scope.inviaOrdine = function(){
        var numeroCopertiPietanza = 0;
        var pietanzeOrdine = [];
        lodash.forEach($scope.data.pietanzeOrdinate, function(value) {
          var pietanzaOrdinata = {
            note: "",
            numSequenza: $scope.numeroSequenzaDefault,
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
          title: 'Invio ordine',
          template: 'Procedere con l\'invio dell\'ordine?'
        });

        confirmPopup.then(function(res) {
          if(res) {
            Accompagnatore.getListaTavoliReali({soloLiberi: false}).then(function(response){
              $scope.data.tavoloReale = lodash.filter(response.data, function(tavolo){
                return tavolo.asporto === true;
              })[0];

              //apro tavolo accomodato asporto
              Accompagnatore.apriTavoloAccomodato(
                $scope.data.tavoloReale.id,
                config.operatore,
                $scope.data.tavoloReale.asporto,
                0,
                $scope.data.nomeAsporto
              ).then(function(response){
                  $scope.data.tavolo = response.data;
                  Ordinatore.creaOrdine(
                  {
                    asporto: $scope.data.tavolo.asporto,
                    idTavoloAccomodato: $scope.data.tavolo.id,
                    numCoperti: $scope.data.tavolo.numCoperti,
                    personaOrdine: config.operatore,
                    pietanzeOrdinate: pietanzeOrdine
                  }
                ).then(function(response){
                  $state.go('app.asportoInviato', { tavolo: $scope.data.tavolo, ordine: response.data }, {});
                });
              })
            })
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
                $state.go('app.gallery');
            }
          });
        } else
          $state.go('app.gallery');
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
