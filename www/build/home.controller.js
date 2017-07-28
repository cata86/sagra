(function () {
	'use strict';

	angular
		.module('App')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$ionicPopup', 'Modals', 'Model', 'config', '$state'];
	function HomeController($scope, $ionicPopup, Modals, Model, config, $state) {

    $scope.data = {
      nomeOperatore : ''
    }

    $scope.entra = function(){
       config.operatore = $scope.data.nomeOperatore;
       $state.go('app.gallery');
    }


		$scope.users = [];
		$scope.showUsers = function () {
			Model.Users.getAll().then(function (users) {
				$scope.users = angular.copy(users);
			});
			Modals.openModal($scope, 'templates/modals/users.html', 'animated rotateInDownLeft');
		};

		$scope.closeModal = function () {
			Modals.closeModal();
			$scope.users = [];
		};

		//Center content
		//1. http://codepen.io/mhartington/pen/gcHeL
		//2. http://codepen.io/anon/pen/meQJvp
	}
})();
