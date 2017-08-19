(function() {
'use strict';

    angular
        .module('App')
        .controller('SerateModificaController', SerateModificaController);

    SerateModificaController.$inject = ['$scope', '$rootScope', '$ionicPlatform', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory', 'Cassa', 'config'];
    function SerateModificaController($scope, $rootScope, $ionicPlatform, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Cassa, config) {

      $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
      };

      //TODO
      $scope.idSagra = 1;

      $scope.data = {
        serata: $stateParams.serata ? $stateParams.serata : {}
      };
      $scope.data.serata.data = new Date($scope.data.serata.data);



      $scope.modificaSerata = function(){
        Cassa.modificaSerata({
          serata: serata
        }).then(function(response){

        });
      };


      // run this function when either hard or soft back button is pressed
      var doCustomBack = function() {
         $state.go('app.serate', { title: 'Serate' }, {reload: true});
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


    }
})();
