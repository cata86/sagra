(function() {
  var config = {
    operatore: null,
    apiHost: 'http://localhost:8080'
  };

  angular.module('App')
    .constant('config', config);
})();
