(function() {
'use strict';
  angular
    .module('App')
    .controller('StatoTavoloController', StatoTavoloController);

StatoTavoloController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Ordinatore', 'lodash', 'Constants'];
  function StatoTavoloController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Ordinatore, lodash, Constants) {

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

    $scope.tavoliAccomodati = [];
    $scope.caricaTavoliAccomodati = function( ){
      Ordinatore.getListaTavoliAccomodati({statoOrdinato: true, asporto: false}).then(function(response){
        $scope.tavoliAccomodati = lodash.orderBy(
          response.data, ['accomodatoOrario', 'codice'], ['desc', 'asc']
        );
      });
    };
    $scope.caricaTavoliAccomodati();

    $scope.modificaStatoTavolo = function(tavolo){
      $state.go('app.stato-tavolo-modifica', { title: 'Modifica stato tavolo', tavolo: tavolo });
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
