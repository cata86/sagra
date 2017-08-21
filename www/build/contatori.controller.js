(function() {
'use strict';

    angular
        .module('App')
        .controller('ContatoriController', ContatoriController);

    ContatoriController.$inject = ['$scope', '$rootScope', '$stateParams', '$ionicPlatform', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Accompagnatore', 'Ordinatore', 'config', 'lodash'];
    function ContatoriController($scope, $rootScope, $stateParams, $ionicPlatform, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Accompagnatore, Ordinatore, config, lodash) {

       $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
      };

      $scope.data = {
        pietanzeContatori: $stateParams.pietanzeContatori ?
          $stateParams.pietanzeContatori : []
      }

      if(!$stateParams.pietanzeContatori)
      Ordinatore.getContatori().then(function(response){ $scope.data.pietanzeContatori = response.data })

      $scope.aggiungiContatore = function(){
        $state.go('app.contatoriSceltaPietanza', {data: $scope.data});
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
