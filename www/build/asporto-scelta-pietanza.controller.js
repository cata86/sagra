(function() {
'use strict';

  angular
      .module('App')
      .controller('AsportoSceltaPietanzaController', AsportoSceltaPietanzaController);

  AsportoSceltaPietanzaController.$inject = ['$scope', '$rootScope', '$stateParams', '$ionicPlatform', '$ionicViewSwitcher', '$state', '$ionicHistory',  'Ordinatore', 'lodash'];
  function AsportoSceltaPietanzaController($scope, $rootScope, $stateParams, $ionicPlatform, $ionicViewSwitcher, $state, $ionicHistory, Ordinatore, lodash) {

    $scope.data = $stateParams.data;
    $scope.idSagra = 1; //TODO
    $scope.numeroSequenzaDefault = 1;

    $scope.categoriaSelezionata = 1;
    $scope.categorie = [];
    $scope.caricaCategorie = function(){
      Ordinatore.getListaCategoriePietanze({idSagra: $scope.idSagra}).then(function(response){
        $scope.categorie = lodash.sortBy(
          response.data, ['codice']
        );
        $scope.caricaPietanze();
      });
    };
    $scope.caricaCategorie();


    $scope.pietanze = [];
    $scope.caricaPietanze = function( ){
      Ordinatore.getListaPietanze({idSagra: $scope.idSagra}).then(function(response){
        $scope.pietanze = lodash.sortBy(
          response.data, ['nome']
        );
        //aggiorno le quantita delle pietanze ordinate
        lodash.forEach($scope.pietanze, function(value, key) {
          var pietanzaOrdinata;
          if($scope.data){
            pietanzaOrdinata = lodash.find($scope.data.pietanzeOrdinate, {id:value.id});
          }
          value.quantita = 0;
          value.numSequenza =  $scope.numeroSequenzaDefault;
          if(pietanzaOrdinata){
            value.coperto = pietanzaOrdinata.coperto;
            value.quantita = pietanzaOrdinata.quantita;
          }

        });
      });
    };

    $scope.cambiaCategoria = function(categoria){
      $scope.categoriaSelezionata = categoria.id;
    }

    $scope.modificaQuantita = function(pietanza, operazione){
      //modifica sempre array pietanze
      var pietanza = lodash.find($scope.pietanze, {id:pietanza.id});
      if(operazione === 'aggiungi'){
        pietanza.quantita = pietanza.quantita+1;
      } else if(operazione === 'rimuovi'){
        if(pietanza.quantita > 0)
          pietanza.quantita = pietanza.quantita-1;
      }
    }

    // run this function when either hard or soft back button is pressed
    var doCustomBack = function() {
      //rimando indietro tt le pietanze con quantita diversa da zero
      var pietanzeOrdinate = lodash.filter($scope.pietanze, function(obj){
        return (obj.quantita > 0);
      });

      $state.go('app.asporto', {
        tavoloReale: $scope.data.tavoloReale,
        tavolo: $scope.data.tavolo,
        pietanzeOrdinate: pietanzeOrdinate,
        nomeAsporto: $scope.data.nomeAsporto
      },
      {reload: true});
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

