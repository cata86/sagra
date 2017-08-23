(function() {
'use strict';
    angular
        .module('App')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['$scope', '$rootScope', '$ionicPlatform', '$state', 'config', '$window', 'lodash'];
    function GalleryController($scope, $rootScope, $ionicPlatform, $state, config, $window, lodash) {

        $scope.operatore = config.operatore;

        $scope.openItem = function(item){
          $state.go('app.'+item.view, { title: item.title, icon: item.icon, color: item.color }, {reload: true});
        };



        // run this function when either hard or soft back button is pressed
      var doCustomBack = function() {
        $state.go('home');
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
