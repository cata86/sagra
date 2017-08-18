(function() {
'use strict';

    angular
        .module('App')
        .controller('ModificaOrdineSceltaOrdineController', ModificaOrdineSceltaOrdineController);

    ModificaOrdineSceltaOrdineController.$inject = ['$scope', '$rootScope', '$stateParams', '$ionicPlatform', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Ordinatore', 'config', 'lodash'];
    function ModificaOrdineSceltaOrdineController($scope, $rootScope, $stateParams, $ionicPlatform, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Ordinatore, config, lodash) {

      $scope.data = {
        tavolo: $stateParams.tavolo
      };

    	Ordinatore.getListaOrdiniByTavoloId({idTavoloAccomodato: $scope.data.tavolo.id}).then(function(response){
        $scope.ordiniTavolo = lodash.orderBy(response.data, ['data'], ['desc']);
    	})

      $scope.visualizzaOrdine = function(ordine){
        $state.go('app.modificaOrdineGestioneSequenza', { tavolo: $scope.data.tavolo, ordine: ordine });
      }


    }
})();
