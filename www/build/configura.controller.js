(function () {
	'use strict';

	angular
		.module('App')
		.controller('ConfiguraController', ConfiguraController);

	ConfiguraController.$inject = ['$scope', '$ionicPopup', 'Modals', 'Model', '$state', 'lodash', '$window', '$rootScope', 'config'];
	function ConfiguraController($scope, $ionicPopup, Modals, Model, $state, lodash, $window, $rootScope, config) {

    $scope.data = {
      host: config.apiHost,
      itemAbilitati: $rootScope.items,
    };
    $scope.salvaConfigurazione = function( ){
      $window.localStorage.setItem("itemAbilitati", JSON.stringify($scope.data.itemAbilitati));
      $rootScope.items = $scope.data.itemAbilitati;
      $window.localStorage.setItem("host", $scope.data.host);
      config.apiHost = $scope.data.host;
      $state.go('home');
    };

    $scope.svuotaConfig = function ( ){
      $window.localStorage.clear();
    };





	}
})();
