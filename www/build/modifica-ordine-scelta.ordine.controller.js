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



      // run this function when either hard or soft back button is pressed
      var doCustomBack = function() {
          $state.go('app.modifica-ordine', { title: 'Modifica ordine' }, {reload: true});
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
