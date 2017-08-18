(function(){
angular.module('App')
.factory('Cassa', function($http, config) {
  return {
    getListaSerate: function(idSagra){
      return $http({
        url: config.apiHost+'/api/serate/listaSerata',
        method: "GET",
        params: idSagra,
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    },
    apriSerata: function(idSagra, codice, descrizione, data, personaApertura){
      return $http({
        url: config.apiHost+'/api/serate/apriSerata',
        method: "POST",
        data: {
          'idSagra': idSagra,
          'codice': codice,
          'descrizione': descrizione,
          'data': data,
          'personaApertura': personaApertura
        },
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    },
    chiudiSerata: function(idSerata, personaChiusura){
      return $http({
        url: config.apiHost+'/api/serate/chiudiSerata',
        method: "POST",
        data: {
          'id': idSerata,
          'personaChiusura': personaChiusura
        },
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    },
    modificaSerata: function(serata){
      return $http({
        url: config.apiHost+'/api/serate/modificaSerata',
        method: "POST",
        data: {
          'id': serata.id,
          'idSagra': serata.idSagra,
          'codice': serata.codice,
          'descrizione': serata.descrizione,
          'data': serata.data,
          'personaApertura': serata.personaApertura,
          'personaChiusura': serata.personaChiusura,
          'dataApertura': serata.dataApertura,
          'dataChiusura': serata.dataChiusura,
          'stato': serata.stato
        },
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    }


  };
})
})();
