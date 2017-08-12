(function() {
'use strict';

    angular
        .module('App')
        .controller('ModificaOrdineSceltaTavoloController', ModificaOrdineSceltaTavoloController);

    ModificaOrdineSceltaTavoloController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory'];
    function ModificaOrdineSceltaTavoloController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory) {

        $scope.item = {
            title: $stateParams.title,
            icon: $stateParams.icon,
            color: $stateParams.color
        };


        if (!$scope.item.color) {
            $ionicViewSwitcher.nextDirection('back');
            $ionicHistory.nextViewOptions({
                disableBack: true,
                disableAnimate : true,
                historyRoot  : true
            });
            $state.go('app.gallery');
        }
    }
})();
