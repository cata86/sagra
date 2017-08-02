(function() {
'use strict';

  angular
    .module('App')
    .controller('AccompagnatoreTavoloController', AccompagnatoreTavoloController);

  AccompagnatoreTavoloController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','Accompagnatore', 'config', '$ionicPopup', 'lodash', 'Constants'];
  function AccompagnatoreTavoloController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Accompagnatore, config, $ionicPopup, lodash, Constants) {

    $scope.tavoloRealeSelezionato = $stateParams.tavoloReale;
    $scope.tavoliAccomodatiByTavoloId = [];
    $scope.caricaTavoliAccomodatiByTavoloId = function(tavoloReale){
      Accompagnatore.getListaTavoliAccomodatiByTavoloId({idTavoloReale: tavoloReale.id}).then(function(response){
    	  $scope.tavoliAccomodatiByTavoloId = lodash.sortBy(
          lodash.filter(response.data, function(tav){
            return tav.stato !== Constants.statoTavolo.liberato.stato;
          }),
          ['codice']
        );
    	})
    };
    $scope.caricaTavoliAccomodatiByTavoloId($scope.tavoloRealeSelezionato);

    $scope.getColoreStatoTavolo = function(statoTavoloAccomodato){
      var colore = lodash.filter(Constants.statoTavolo, function(statoTavolo){
          return statoTavolo.stato === statoTavoloAccomodato;
      })[0].colore;
      return {"color": colore};
    }

    $scope.apriTavoloAccomodato = function(){
      Accompagnatore.apriTavoloAccomodato(
        $scope.tavoloRealeSelezionato.id,
        config.operatore,
        $scope.tavoloRealeSelezionato.asporto
      ).then(function(response){
        var confirmPopup = $ionicPopup.alert({
          title: 'Tavolo accomodato',
          template: response.data.descrizione
        });
        confirmPopup.then(function(res) {
          if(res) {
            $state.go('app.accompagnatoreTavolo', { tavoloReale: $scope.tavoloRealeSelezionato }, {reload: true});
          }
        });
    	})
    };

    var confermaChiusuraTavoloAccomodato = function(tavoloAccomodato){
      Accompagnatore.chiudiTavoloAccomodato(
        tavoloAccomodato.id,
        config.operatore
      ).then(function(response){
        var confirmPopup = $ionicPopup.alert({
          title: 'Tavolo liberato',
          template: response.data.descrizione+' liberato correttamente'
        });
        confirmPopup.then(function(res) {
          if(res) {
            $state.go('app.accompagnatoreTavolo', { tavoloReale: $scope.tavoloRealeSelezionato }, {reload: true});
          }
        });
      })
    }

    $scope.chiudiTavoloAccomodato = function(tavoloAccomodato){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Liberazione tavolo',
        template: 'Liberare '+tavoloAccomodato.descrizione+'?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          if(tavoloAccomodato.stato !== 'ORDINATO'){
            var confirmPopupStato = $ionicPopup.confirm({
              title: 'Attenzione: liberazione tavolo',
              template: tavoloAccomodato.descrizione+' è in stato '+tavoloAccomodato.stato+', liberare il tavolo?'
            });
            confirmPopupStato.then(function(res) {
              if(res){
                confermaChiusuraTavoloAccomodato(tavoloAccomodato);
              }
            });
          } else {
            confermaChiusuraTavoloAccomodato(tavoloAccomodato);
          }
        }
      });
    }


  }
})();
