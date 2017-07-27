(function() {
'use strict';

  angular
    .module('App')
    .controller('AccompagnatoreController', AccompagnatoreController);

  AccompagnatoreController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','Accompagnatore'];
  function AccompagnatoreController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Accompagnatore) {

    $scope.item = {
      title: $stateParams.title,
      icon: $stateParams.icon,
      color: $stateParams.color
    };

		$scope.tavoliReali = [];


    $scope.caricaTavoliReali = function( ){
    		Accompagnatore.getListaTavoliReali({soloLiberi: false}).then(function(response){
    			$scope.tavoliReali = response.data;
    		})
    	};

    $scope.caricaTavoliReali();

    $scope.visualizzaTavoliAccomodati = function(tavoloReale){
       $state.go('app.tavolo', { idTavolo: table.id });
    }


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
