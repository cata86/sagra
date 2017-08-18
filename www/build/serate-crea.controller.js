(function() {
'use strict';

    angular
        .module('App')
        .controller('SerateCreaController', SerateCreaController);

    SerateCreaController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory', 'Cassa', 'config'];
    function SerateCreaController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Cassa, config) {

      $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
      };

      //TODO
      $scope.idSagra = 1;

      $scope.data = {
        codice: '',
        descrizione: '',
        dataSerata: new Date()
      };

      $scope.creaSerata = function(){
        Cassa.apriSerata(
          $scope.idSagra,
          $scope.data.codice,
          $scope.data.descrizione,
          $scope.data.dataSerata,
          config.operatore
        ).then(function(response){
          $state.go('app.serate', { title: 'Serate' }, {reload: true});
        });
      };



    }
})();
