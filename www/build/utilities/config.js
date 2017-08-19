(function() {
  var config = {
    operatore: null,
    apiHost: 'http://192.168.1.2:8080',
    passwordConfigurazione: 'sagra'
  };

  angular.module('App')
    .constant('config', config);
})();
