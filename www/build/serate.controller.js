(function() {
'use strict';

    angular
        .module('App')
        .controller('SerateController', SerateController);

    SerateController.$inject = ['$scope', '$rootScope', '$ionicPlatform', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory', 'Cassa', 'lodash', '$ionicPopup', 'config'];
    function SerateController($scope, $rootScope, $ionicPlatform, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Cassa, lodash, $ionicPopup, config) {

       $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
      };

      $scope.idSagra = 1;

      $scope.data = {};
      Cassa.getListaSerate({idSagra: $scope.idSagra}).then(function(response){
        $scope.data.serate = lodash.orderBy(
          response.data, ['data'], ['desc']
        );
      });

      $scope.stampaChiusuraSerata = function(serata){
         Cassa.stampaSerata({idSerata: serata.id}).then(function(response){
          $state.go('app.serate', { title: 'Serate' }, {reload: true});
        });
      };

      $scope.nuovaSerata = function(){
        if(lodash.find( $scope.data.serate, function(serata){
          return serata.stato === 'APERTA';
        })){
          var confirmPopup = $ionicPopup.alert({
            title: 'Nuova serata',
            template: 'Chiudere tutte le serate aperte'
          });
          confirmPopup.then(function(res) {
            if(res) {
              confirmPopup.close();
            }
          });
        } else {
          $state.go('app.serate-crea', { title: 'Nuova serata' });
        }
      }

      $scope.chiudiSerata = function(serata){
        Cassa.chiudiSerata(
          serata.id,
          config.operatore
        ).then(function(response){
          $state.go('app.serate', { title: 'Serate' }, {reload: true});
        });
      };

      $scope.riapriSerata = function(serataRiapri){
        if(lodash.find( $scope.data.serate, function(serata){
          return (serata.stato === 'APERTA' && serataRiapri.id !== serata.id);
        })){
          var confirmPopup = $ionicPopup.alert({
            title: 'Riapertura serata',
            template: 'Impossibile ri-aprire la serata, chiudere tutte le serate aperte'
          });
          confirmPopup.then(function(res) {
            if(res) {
              confirmPopup.close();
            }
          });
        } else {
          serataRiapri.dataChiusura = null;
          serataRiapri.stato = "APERTA";
          serataRiapri.personaApertura = config.opeartore;
          Cassa.modificaSerata(serataRiapri).then(function(response){
            $state.go('app.serate', { title: 'Serate' }, {reload: true});
          });
        }
      };

      $scope.modificaSerata = function(serata){
        $state.go('app.serate-modifica', { title: 'Modifica serata', serata: serata });
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
