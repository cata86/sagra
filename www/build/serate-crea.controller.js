(function() {
'use strict';

    angular
        .module('App')
        .controller('SerateCreaController', SerateCreaController);

    SerateCreaController.$inject = ['$scope', '$rootScope', '$ionicPlatform', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory', 'Cassa', 'config'];
    function SerateCreaController($scope, $rootScope, $ionicPlatform, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Cassa, config) {

      $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
      };

      //TODO
      $scope.idSagra = 1;

      $scope.data = {
        codice: '',
        descrizione: '',
        dataSerata: new Date()
      };

      $scope.creaSerata = function(){
        Cassa.apriSerata(
          $scope.idSagra,
          $scope.data.codice,
          $scope.data.descrizione,
          $scope.data.dataSerata,
          config.operatore
        ).then(function(response){
          $state.go('app.serate', { title: 'Serate' }, {reload: true});
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
