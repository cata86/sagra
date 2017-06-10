(function() {
'use strict';

    angular
        .module('App')
        .controller('TavoloController', TavoloController);

    TavoloController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','Tavoli'];
    function TavoloController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Tavoli) {


		$scope.tavolo = Tavoli.get($stateParams.idTavolo);
		console.log($scope.tavolo);

		$scope.editSequenza = function(idSequenza){
			$state.go('app.sequenza', { idSequenza: idSequenza});
		}

    }
})();
