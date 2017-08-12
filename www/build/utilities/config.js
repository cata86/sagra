(function() {
  var config = {
    operatore: null,
    apiHost: 'http://localhost:8080',
    passwordConfigurazione: 'sagra'
  };

  angular.module('App')
    .constant('config', config);
})();
