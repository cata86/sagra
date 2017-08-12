(function () {
	'use strict';

	angular
		.module('App')
		.controller('ConfiguraController', ConfiguraController);

	ConfiguraController.$inject = ['$scope', '$ionicPopup', 'Modals', 'Model', '$state', 'lodash', '$window', '$rootScope'];
	function ConfiguraController($scope, $ionicPopup, Modals, Model, $state, lodash, $window, $rootScope) {

    $scope.data = {
      host: '',
      itemConfigura: lodash.forEach(lodash.clone($rootScope.items), function(value, key) {
        value.checked = false;
      })
    };
    $scope.salvaConfigurazione = function( ){
      $window.localStorage.setItem("itemAbilitati", ["accompagnatore"]
        // lodash.filter($scope.data.itemConfigura, function(obj){
        //   return (obj.checked === true);
        // }).view
      );
      $window.localStorage.setItem("host", $scope.data.host);

      $state.go('home');

    };





	}
})();
