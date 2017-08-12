(function() {
'use strict';

    angular
        .module('App')
        .controller('SerateController', SerateController);

    SerateController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory'];
    function SerateController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory) {

//apri serata
//chiudi serata
//riapri serata
//stampa scontrino
       $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
      };

      $scope.idSagra = 1;

      $scope.serate = [];
      $scope.caricaSerate = function( ){
        Ordinatore.getListaSerate({idSagra: $scope.idSagra}).then(function(response){
          $scope.serate = lodash.sortBy(
            response.data, ['data']
          );
        });
      };
      $scope.caricaSerate();


      if (!$scope.item.color) {
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
