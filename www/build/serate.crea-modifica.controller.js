(function() {
'use strict';

    angular
        .module('App')
        .controller('SerateCreaModificaController', SerateCreaModificaController);

    SerateCreaModificaController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory', 'Cassa', 'config'];
    function SerateCreaModificaController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Cassa, config) {

      $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
      };

      //TODO
      $scope.idSagra = 1;

      $scope.data = {
        idSagra: $scope.idSagra,
        codice: $stateParams.serata ? $stateParams.serata.codice : '',
        descrizione: $stateParams.serata ? $stateParams.serata.descrizione : '',
        data: $stateParams.serata ? $stateParams.serata.data : new Date()
      };

      $scope.apriSerata = function(serata){
        Cassa.apriSerata({
          idSagra: serata.idSagra,
          codice: serata.codice,
          descrizione: serata.descrizione,
          data: serata.data,
          personaApertura: config.operatore
        }).then(function(response){

        });
      };


    // tutto il payload (per riaprire passare stato aprto)
//todo gestie persna che modific
      $scope.modificaSerata = function(serata){
        Cassa.modificaSerata({
          serata: serata
        }).then(function(response){

        });
      };


      $scope.chiudiSerata = function(serata){
        Cassa.chiudiSerata({
          id: serata.idSagra,
          personaChiusura: config.operatore
        }).then(function(response){

        });
      };



    }
})();
