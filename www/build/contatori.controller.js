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
        pietanzeContatori: $stateParams.pietanzeContatori ? $stateParams.pietanzeContatori : []
      }

      $scope.aggiungiContatore = function(){
        $state.go('app.contatoriSceltaPietanza', {data: $scope.data});
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
