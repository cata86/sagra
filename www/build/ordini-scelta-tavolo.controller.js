(function() {
'use strict';
  angular
    .module('App')
    .controller('OrdiniSceltaTavoloController', OrdiniSceltaTavoloController);

OrdiniSceltaTavoloController.$inject = ['$scope', '$rootScope', '$ionicPlatform', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Accompagnatore', 'Ordinatore', 'lodash', 'Constants', 'config'];
  function OrdiniSceltaTavoloController($scope, $rootScope, $ionicPlatform, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Accompagnatore, Ordinatore, lodash, Constants, config) {

    $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
    };

    $scope.getColoreStatoTavolo = function(statoTavoloAccomodato){
      var colore = lodash.filter(Constants.statoTavolo, function(statoTavolo){
          return statoTavolo.stato === statoTavoloAccomodato;
      })[0].colore;
      return {"color": colore};
    }

    $scope.btnSelectedInAttesa = true;
    $scope.tavoliAccomodati = [];

    $scope.tavoliAccomodatiTutti = [];
    $scope.tavoliAccomodatiInAttesa = [];
    $scope.caricaTavoliAccomodati = function( ){
      Ordinatore.getListaTavoliAccomodati({statoOrdinato: true, asporto: false}).then(function(response){
        $scope.tavoliAccomodatiTutti = lodash.orderBy(
          response.data, ['codice'], ['asc']
        );
        $scope.tavoliAccomodatiInAttesa = lodash.orderBy(
          lodash.filter(response.data, function(tav){
            return tav.stato !== Constants.statoTavolo.ordinato.stato;
          }),
          ['accomodatoOrario', 'codice'], ['asc', 'asc']
        );
        if($scope.btnSelectedInAttesa)
          $scope.tavoliAccomodati = $scope.tavoliAccomodatiInAttesa;
        else
          $scope.tavoliAccomodati = $scope.tavoliAccomodatiTutti;
      });
    };
    $scope.caricaTavoliAccomodati();

    $scope.aggiornaTavoli = function( ){
      $scope.caricaTavoliAccomodati();
      //  $state.go('app.ordini', { title: 'Ordini', icon: null, color: null }, {reload: true});
    };

    $scope.setInAttesa = function(){
      $scope.tavoliAccomodati = $scope.tavoliAccomodatiInAttesa;
      $scope.btnSelectedInAttesa = true;
    }

    $scope.setTutti = function(){
      $scope.tavoliAccomodati = $scope.tavoliAccomodatiTutti;
      $scope.btnSelectedInAttesa = false;
    }


    $scope.visualizzaTavolo = function(tavolo){
      var confirmPopup = $ionicPopup.confirm({
          title: 'Tavolo in ordinazione',
          template: tavolo.descrizione+' in ordinazione?'
        });

        confirmPopup.then(function(res) {
          if(res) {
            if(tavolo.stato === Constants.statoTavolo.in_ordinazione.stato){
              var confirmPopup = $ionicPopup.confirm({
                title: 'Tavolo non prenotabile',
                template: 'Il tavolo è servito da un altro operatore, proseguire?'
              });

              confirmPopup.then(function(res) {
                if(res) {
                  $state.go('app.ordiniGestioneSequenza', { tavolo: tavolo });
                }
              });
            } else if(tavolo.stato === Constants.statoTavolo.accomodato.stato){
              Accompagnatore.impostaStatoTavoloAccomodato(
                tavolo.id,
                Constants.statoTavolo.in_ordinazione.stato,
                config.operatore
                ).then(function(response){
                    $state.go('app.ordiniGestioneSequenza', { tavolo: tavolo });
              });
            } else {
               $state.go('app.ordiniGestioneSequenza', { tavolo: tavolo });
            }
          }
        });
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
