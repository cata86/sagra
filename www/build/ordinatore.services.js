(function(){
angular.module('App')
.factory('Ordinatore', function($http, config) {
  return {
    getListaTavoliAccomodati: function(statoOrdinato){
      return $http({
        url: config.apiHost+'/api/ordini/listaTavoliAccomodati',
        method: "GET",
        params: statoOrdinato,
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    },
    getListaCategoriePietanze: function(idSagra){
      return $http({
        url: config.apiHost+'/api/ordini/listaCategoriePietanze',
        method: "GET",
        params: idSagra,
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    },
    getListaPietanze: function(idSagra){
      return $http({
        url: config.apiHost+'/api/ordini/listaPietanze',
        method: "GET",
        params: idSagra,
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    },
    getListaOrdiniByTavoloId: function(idTavoloAccomodato){
      return $http({
        url: config.apiHost+'/api/ordini/listaOrdiniByTavoloId',
        method: "GET",
        params: idTavoloAccomodato,
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    },
    creaOrdine: function(idTavoloAccomodato, liberatoPersona){
      return $http({
        url: config.apiHost+'/api/ordini/creaOrdine',
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
