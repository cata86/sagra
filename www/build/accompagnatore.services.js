(function(){
angular.module('App')
.factory('Accompagnatore', function($http, config) {
  return {
    getListaTavoliReali: function(soloLiberi){
      return $http({
        url: config.apiHost+'/api/tavoli/listaTavoliReali',
        method: "GET",
        params: soloLiberi,
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    },
    getListaTavoliAccomodatiByTavoloId: function(idTavoloReale){
      return $http({
        url: config.apiHost+'/api/tavoli/listaTavoliAccomodatiByTavoloId',
        method: "GET",
        params: idTavoloReale,
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    },
    apriTavoloAccomodato: function(idTavoloReale, accomodatoPersona, asporto, numCoperti, nomeAsporto){
      return $http({
        url: config.apiHost+'/api/tavoli/apriTavoloAccomodato',
        method: "POST",
        data: {
          'idTavoloReale': idTavoloReale,
          'accomodatoPersona': accomodatoPersona,
          'asporto': asporto,
          'numCoperti': numCoperti,
          'nomeAsporto': nomeAsporto ? nomeAsporto : null
        },
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    },
    chiudiTavoloAccomodato: function(idTavoloAccomodato, liberatoPersona){
      return $http({
        url: config.apiHost+'/api/tavoli/chiudiTavoloAccomodato',
        method: "POST",
        data: {
          'id': idTavoloAccomodato,
          'liberatoPersona': liberatoPersona
        },
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    }
  };
})
})();
