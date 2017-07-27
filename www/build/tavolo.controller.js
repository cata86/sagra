(function() {
'use strict';

    angular
        .module('App')
        .controller('TavoloController', TavoloController);

    TavoloController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Tavoli'];
    function TavoloController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Tavoli) {

      $scope.tavolo = Tavoli.get($stateParams.idTavolo);

      $scope.editSequenza = function(idSequenza){
        $state.go('app.sequenza', { idSequenza: idSequenza});
      }

      $scope.inviaOrdine = function(){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Invio ordine',
          template: 'Procedere con l\'invio dell\'ordine?'
        });

        confirmPopup.then(function(res) {
          if(res) {
          }
        });
      }


    }
})();
