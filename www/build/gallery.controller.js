(function() {
'use strict';
    angular
        .module('App')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['$scope', '$state', 'config', '$window', 'lodash'];
    function GalleryController($scope, $state, config, $window, lodash) {

        $scope.operatore = config.operatore;

        $scope.itemAbilitati = $window.localStorage.getItem('itemAbilitati');

        $scope.myFilter = function (item) {
          return lodash.find($scope.itemAbilitati, item.view)
        };


        $scope.openItem = function(item){
          $state.go('app.'+item.view, { title: item.title, icon: item.icon, color: item.color }, {reload: true});
        };
    }
})();
