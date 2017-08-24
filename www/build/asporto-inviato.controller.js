(function() {
'use strict';

    angular
        .module('App')
        .controller('AsportoInviatoController', AsportoInviatoController);

    AsportoInviatoController.$inject = ['$scope', '$rootScope', '$stateParams', '$ionicPlatform', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Ordinatore', 'config', 'lodash'];
    function AsportoInviatoController($scope, $rootScope, $stateParams, $ionicPlatform, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Ordinatore, config, lodash) {

      $scope.tavolo = $stateParams.tavolo;
      $scope.totale = ($stateParams.ordine && $stateParams.ordine.totale) ? $stateParams.ordine.totale : 0;
      $scope.quotaPersona = ($stateParams.ordine && $stateParams.ordine.quotaPersona) ? $stateParams.ordine.quotaPersona : 0;

      $scope.nuovoOrdine = function(){
        $state.go('app.asporto', {},
        {reload: true});
      }

      // run this function when either hard or soft back button is pressed
      var doCustomBack = function() {
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
