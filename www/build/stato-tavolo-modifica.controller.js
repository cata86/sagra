(function() {
'use strict';
  angular
    .module('App')
    .controller('StatoTavoloModificaController', StatoTavoloModificaController);

StatoTavoloModificaController.$inject = ['$scope', '$rootScope', '$ionicPlatform', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Accompagnatore', 'lodash', 'Constants', 'config'];
  function StatoTavoloModificaController($scope, $rootScope, $ionicPlatform, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Accompagnatore, lodash, Constants, config) {

    $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
    };

    $scope.data = {
      tavolo: $stateParams.tavolo
    };

    $scope.getOrarioStatoTavolo = function(tavoloAccomodato, statoTavolo){
      var campoOrario = lodash.filter(Constants.statoTavolo, function(obj){
          return obj.stato === statoTavolo;
      })[0].campoOrario;
      return tavoloAccomodato[campoOrario];
    }

    $scope.getPersonaStatoTavolo = function(tavoloAccomodato, statoTavolo){
      var campoPersona = lodash.filter(Constants.statoTavolo, function(obj){
          return obj.stato === statoTavolo;
      })[0].campoPersona;
      return tavoloAccomodato[campoPersona];
    }

    $scope.getColoreStatoTavolo = function(statoTavoloAccomodato){
      var colore = lodash.filter(Constants.statoTavolo, function(statoTavolo){
          return statoTavolo.stato === statoTavoloAccomodato;
      })[0].colore;
      return {"color": colore};
    }

    $scope.statiTavolo = Constants.statoTavolo;


    $scope.statoTavoloSelected = $scope.data.tavolo.stato;
    $scope.setStatoTavolo = function(statoTavolo){
      $scope.statoTavoloSelected = statoTavolo;
    }

    $scope.modificaStatoTavolo = function(tavoloAccomodato){
      Accompagnatore.impostaStatoTavoloAccomodato(
        tavoloAccomodato.id,
        $scope.statoTavoloSelected,
        config.operatore).then(function(response){
          $state.go('app.stato-tavolo', { title: 'Stato tavolo' }, {reload: true});
      });
    }


    // run this function when either hard or soft back button is pressed
      var doCustomBack = function() {
         $state.go('app.stato-tavolo', { title: 'Stato tavolo' }, {reload: true});
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
