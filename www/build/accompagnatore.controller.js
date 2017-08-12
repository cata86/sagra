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
            lodash.filter(response.data, function(tav){
              return tav.asporto === false;
            }),
            ['codice']
          );
    		})
    	};
    $scope.caricaTavoliReali();



    if (!$scope.item.title) {
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
