(function() {
'use strict';

    angular
        .module('App')
        .controller('SerateModificaController', SerateModificaController);

    SerateModificaController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory', 'Cassa', 'config'];
    function SerateModificaController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Cassa, config) {

      $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
      };

      //TODO
      $scope.idSagra = 1;

      $scope.data = {
        serata: $stateParams.serata ? $stateParams.serata : {}
      };
      $scope.data.serata.data = new Date($scope.data.serata.data);



      $scope.modificaSerata = function(){
        Cassa.modificaSerata({
          serata: serata
        }).then(function(response){

        });
      };


    }
})();
