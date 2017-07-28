(function() {
'use strict';

  angular
    .module('App')
    .controller('AccompagnatoreController', AccompagnatoreController);

  AccompagnatoreController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory', 'Accompagnatore', 'lodash'];
  function AccompagnatoreController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Accompagnatore, lodash) {

    $scope.item = {
      title: $stateParams.title,
      icon: $stateParams.icon,
      color: $stateParams.color
    };

		$scope.tavoliReali = [];

    $scope.caricaTavoliReali = function( ){
    		Accompagnatore.getListaTavoliReali({soloLiberi: false}).then(function(response){
          $scope.tavoliReali = lodash.sortBy(
            response.data, ['codice']
          );
    		})
    	};
    $scope.caricaTavoliReali();



    if (!$scope.item.color) {
      $ionicViewSwitcher.nextDirection('Indietro');
      $ionicHistory.nextViewOptions({
          disableBack: true,
          disableAnimate : true,
          historyRoot  : true
      });
      $state.go('app.gallery');
    }
  }
})();
