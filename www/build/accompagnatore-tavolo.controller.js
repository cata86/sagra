(function() {
'use strict';

  angular
    .module('App')
    .controller('AccompagnatoreTavoloController', AccompagnatoreTavoloController);

  AccompagnatoreTavoloController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','Accompagnatore'];
  function AccompagnatoreTavoloController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Accompagnatore) {

    $scope.tavoloReale = $stateParams.tavoloReale;
		$scope.tavoliAccomodatiByTavoloId = [];

    $scope.caricaTavoliAccomodatiByTavoloId = function(tavoloReale){
    		Accompagnatore.getListaTavoliAccomodatiByTavoloId({idTavoloReale: $scope.tavoloReale.id}).then(function(response){
    			$scope.tavoliAccomodatiByTavoloId = response.data;
    		})
    	};

    $scope.caricaTavoliAccomodatiByTavoloId($scope.tavoloReale);

  }
})();
