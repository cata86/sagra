(function() {
  var config = {
    operatore: null,
    apiHost: 'http://10.0.2.15:8080',
    passwordConfigurazione: 'sagra'
  };

  angular.module('App')
    .constant('config', config);
})();
