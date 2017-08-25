(function() {
  var config = {
    operatore: 'noOperatore',
    apiHost: 'http://localhost:8080',
    passwordConfigurazione: 'sagra'
  };

  angular.module('App')
    .value('config',config);

})();
