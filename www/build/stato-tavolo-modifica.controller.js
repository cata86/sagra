(function() {
'use strict';
  angular
    .module('App')
    .controller('StatoTavoloModificaController', StatoTavoloModificaController);

StatoTavoloModificaController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Ordinatore', 'lodash', 'Constants'];
  function StatoTavoloModificaController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Ordinatore, lodash, Constants) {

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

    $scope.modificaStatoTavolo = function(){
      // $scope.statoTavoloSelected = statoTavolo;
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
