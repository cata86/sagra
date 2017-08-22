(function() {
'use strict';

    angular
        .module('App')
        .controller('ContatoriSceltaPietanzaController', ContatoriSceltaPietanzaController);

    ContatoriSceltaPietanzaController.$inject = ['$scope', '$rootScope', '$stateParams', '$ionicPlatform', '$ionicViewSwitcher', '$state', '$ionicHistory','$ionicPopup', 'Accompagnatore', 'Ordinatore', 'config', 'lodash'];
    function ContatoriSceltaPietanzaController($scope, $rootScope, $stateParams, $ionicPlatform, $ionicViewSwitcher, $state, $ionicHistory, $ionicPopup, Accompagnatore, Ordinatore, config, lodash) {

      $scope.item = {
        title: $stateParams.title,
        icon: $stateParams.icon,
        color: $stateParams.color
      };

      $scope.idSagra = 1; //TODO

      $scope.categoriaSelezionata = 1;
      $scope.categorie = [];
      $scope.caricaCategorie = function(){
        Ordinatore.getListaCategoriePietanze({idSagra: $scope.idSagra}).then(function(response){
          $scope.categorie = lodash.sortBy(
            response.data, ['codice']
          );
          $scope.caricaPietanze();
        });
      };
      $scope.caricaCategorie();


      $scope.data = {
        pietanze: []
      };

      $scope.caricaPietanze = function( ){
        Ordinatore.getListaPietanze({idSagra: $scope.idSagra}).then(function(response){
          $scope.data.pietanze = lodash.sortBy(
            response.data, ['nome']
          );
        });
      };

      $scope.cambiaCategoria = function(categoria){
        $scope.categoriaSelezionata = categoria.id;
      }


      // run this function when either hard or soft back button is pressed
      var doCustomBack = function() {
        var pietanzeContatoriToSave = lodash.filter($scope.data.pietanze, function(obj){
          return (obj.contatore === true);
        });

        var confirmPopup = $ionicPopup.confirm({
          title: 'Salva contatori',
          template: 'Salvare i contatori?'
        });

        confirmPopup.then(function(res) {
          if(res) {
            Ordinatore.setContatori(pietanzeContatoriToSave).then(function(response){
              $state.go('app.contatori', {
                title: 'Contatori',
                icon: null,
                color: null
              },
              {reload: true});
            });
          } else {
            $state.go('app.contatori', {
              title: 'Contatori',
              icon: null,
              color: null
            },
            {reload: true});
          }
        });

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
