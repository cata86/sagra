(function(){
angular.module('App')
.factory('Accompagnatore', function($http) {
  return {
    getListaTavoliReali: function(soloLiberi){
      return $http({
        url:'http://localhost:8080/api/tavoli/listaTavoliReali',
        method:"GET",
        params:soloLiberi,
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    },
    getListaTavoliAccomodatiByTavoloId: function(idTavoloReale){
      return $http({
        url:'http://localhost:8080/api/tavoli/listaTavoliAccomodatiByTavoloId',
        method:"GET",
        params:idTavoloReale,
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzc3ODM3MX0.an4vxwTfUf_TWy6Vs6UdXxR_3mRy3z1xDHNN2CJZcdRNZkGwBXBB-07pQrOeAh5jDcivYmM9PeGZxkBe1tGWsA'}
      });
    }
  };
})
})();
