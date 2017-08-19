(function() {
'use strict';
  angular
    .module('App')
    .controller('ModificaOrdineSceltaTavoloController', ModificaOrdineSceltaTavoloController);

ModificaOrdineSceltaTavoloController.$inject = ['$scope', '$rootScope', '$ionicPlatform', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Ordinatore', 'lodash', 'Constants'];
  function ModificaOrdineSceltaTavoloController($scope, $rootScope, $ionicPlatform, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Ordinatore, lodash, Constants) {

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

    $scope.btnSelectedAsporto = false;
    $scope.tavoliAccomodati = [];

    $scope.caricaTavoliAccomodati = function( ){
      Ordinatore.getListaTavoliAccomodati({statoOrdinato: true, asporto: true}).then(function(response){
        $scope.tavoliAccomodati = lodash.orderBy(
          response.data, ['accomodatoOrario', 'codice'], ['desc', 'asc']
        );
      });
    };
    $scope.caricaTavoliAccomodati();


    $scope.setAsporto = function(){
      // $scope.tavoliAccomodati = $scope.tavoliAccomodatiInAttesa;
      $scope.btnSelectedAsporto = true;
    }

    $scope.setTutti = function(){
      // $scope.tavoliAccomodati = $scope.tavoliAccomodatiTutti;
      $scope.btnSelectedAsporto = false;
    }


    $scope.visualizzaTavolo = function(tavolo){
      $state.go('app.modificaOrdineSceltaOrdine', { tavolo: tavolo });
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
