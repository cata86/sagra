(function() {
  var config = {
    operatore: 'pippo',
    apiHost: 'http://localhost:8080',
    passwordConfigurazione: 'sagra'
  };

  angular.module('App')
    .value('config',config);

})();
