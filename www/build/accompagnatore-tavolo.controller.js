(function() {
'use strict';

  angular
    .module('App')
    .controller('AccompagnatoreTavoloController', AccompagnatoreTavoloController);

  AccompagnatoreTavoloController.$inject = ['$scope', '$rootScope', '$ionicPlatform', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','Accompagnatore', 'config', '$ionicPopup', 'lodash', 'Constants','Cassa'];
  function AccompagnatoreTavoloController($scope, $rootScope, $ionicPlatform, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Accompagnatore, config, $ionicPopup, lodash, Constants,Cassa) {


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

     $scope.getOrarioStatoTavolo = function(tavoloAccomodato){
      var statoTavoloAccomodato = tavoloAccomodato.stato;
      var campoOrario = lodash.filter(Constants.statoTavolo, function(statoTavolo){
          return statoTavolo.stato === statoTavoloAccomodato;
      })[0].campoOrario;
      return tavoloAccomodato[campoOrario];
    }

    $scope.apriTavoloAccomodato = function(ospiti){
      Accompagnatore.apriTavoloAccomodato(
        $scope.tavoloRealeSelezionato.id,
        config.operatore,
        $scope.tavoloRealeSelezionato.asporto,
        0, 
        undefined,
        ospiti
      ).then(function(response){
        var confirmPopup = $ionicPopup.alert({
          title: response.data.ospiti ? 'Tavolo OSPITI accomodato' : 'Tavolo accomodato',
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
        $state.go('app.accompagnatoreTavolo', { tavoloReale: $scope.tavoloRealeSelezionato }, {reload: true});
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




     // run this function when either hard or soft back button is pressed
    var doCustomBack = function() {
        $state.go('app.accompagnatore', { title: 'Tavoli' }, {reload: true});
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
