(function() {
'use strict';

  angular
    .module('App')
    .controller('AccompagnatoreController', AccompagnatoreController);

  AccompagnatoreController.$inject = ['$scope', '$rootScope', '$ionicPlatform', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory', 'Accompagnatore', 'lodash'];
  function AccompagnatoreController($scope, $rootScope, $ionicPlatform, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Accompagnatore, lodash) {

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

    // run this function when either hard or soft back button is pressed
    var doCustomBack = function() {
        $state.go('app.gallery');
    };

    // override soft back
    // framework calls $rootScope.$ionicGoBack when soft back button is pressed
    var oldSoftBack = $rootScope.$ionicGoBack;
    $rootScope.$ionicGoBack = function() {
        doCustomBack();
    };
    var deregisterSoftBack = function() {
        $rootScope.$ionicGoBack = oldSoftBack;
    };

    // override hard back
    // registerBackButtonAction() returns a function which can be used to deregister it
    var deregisterHardBack = $ionicPlatform.registerBackButtonAction(
        doCustomBack, 101
    );

    // cancel custom back behaviour
    $scope.$on('$destroy', function() {
        deregisterHardBack();
    });



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
