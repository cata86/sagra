(function() {
'use strict';
    angular
        .module('App')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['$scope', '$state', 'config'];
    function GalleryController($scope, $state, config) {

        $scope.operatore = config.operatore;

        $scope.openItem = function(item){
            $state.go('app.'+item.view, { title: item.title, icon: item.icon, color: item.color }, {}, {reload: true});
        };
    }
})();
