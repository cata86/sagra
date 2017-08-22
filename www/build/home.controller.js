(function () {
	'use strict';

	angular
		.module('App')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$ionicPopup', 'Modals', 'Model', 'config', '$state', '$window'];
	function HomeController($scope, $ionicPopup, Modals, Model, config, $state, $window) {

    $scope.data = {
      nomeOperatore : ''
    }

    if( $window.localStorage.getItem("nomeOperatore"))
      $scope.data.nomeOperatore = $window.localStorage.getItem("nomeOperatore");

    $scope.entra = function(){
       config.operatore = $scope.data.nomeOperatore;
       $window.localStorage.setItem("nomeOperatore", $scope.data.nomeOperatore);
       $state.go('app.gallery');
    }

    $scope.configura = function(){
      var promptPopup = $ionicPopup.prompt({
        title: 'Autenticazione',
        template: 'Password',
        inputType: 'text',
        inputPlaceholder: ''
      });

      promptPopup.then(function(res) {
        if(res === config.passwordConfigurazione){
          $state.go('app.configura');
        } else {
          //TODO
        }
      });
    }


		// $scope.users = [];
		// $scope.showUsers = function () {
		// 	Model.Users.getAll().then(function (users) {
		// 		$scope.users = angular.copy(users);
		// 	});
		// 	Modals.openModal($scope, 'templates/modals/users.html', 'animated rotateInDownLeft');
		// };

		// $scope.closeModal = function () {
		// 	Modals.closeModal();
		// 	$scope.users = [];
		// };

	}
})();
