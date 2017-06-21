(function() {
'use strict';

    angular
        .module('App')
        .controller('SequenzaController', SequenzaController);

    SequenzaController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory', 'Categorie', 'Pietanze'];
    function SequenzaController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory, Categorie, Pietanze) {

		console.log($stateParams.idSequenza);

    $scope.categorie = Categorie.all();

    // $scope.pietanze = Pietanze.all();
    //sistemare loadash e fare qui il filter senza fare ogni volta la query per categoria
    $scope.categoriaSelezionata = $scope.categorie[0];

    $scope.pietanzeCategoria = Pietanze.getPietanzeCategoria($scope.categoriaSelezionata.id);
   	$scope.selezionaCategoria = function(categoriaId){
       $scope.categoriaSelezionata = Categorie.get(categoriaId);
       $scope.pietanzeCategoria = Pietanze.getPietanzeCategoria(categoriaId);
		}


    }
})();

