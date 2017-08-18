(function() {
'use strict';

    angular
        .module('App')
        .controller('SerateController', SerateController);

    SerateController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory', 'Cassa', 'lodash'];
    function SerateController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Cassa, lodash) {

       $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
      };

      $scope.idSagra = 1;

      $scope.data = {};
      Cassa.getListaSerate({idSagra: $scope.idSagra}).then(function(response){
        $scope.data.serate = lodash.sortBy(
          response.data, ['data']
        );
      });

      $scope.nuovaSerata = function(){
        $state.go('app.serate-crea-modifica', { title: 'Nuova serata' });
      }

      $scope.modificaSerata = function(serata){
        $state.go('app.serate-crea-modifica', { title: 'Modifica serata', serata: serata });
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
