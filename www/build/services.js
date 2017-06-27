(function(){
angular.module('App')
.factory('Tavoli', function(lodash) {
  var tavoli = [{
    id: 0,
    numero: 0,
    descrizione: 'Tavolo 0',
    stato: 'in_attesa',
    orario: '19:30'
  }, {
    id: 1,
    numero: 1,
    descrizione: 'Tavolo 1',
    stato: 'richiesto_da_palmare',
    orario: '19:00'
  }, {
    id: 2,
    numero: 2,
    descrizione: 'Tavolo 2',
    stato: 'libero',
    orario: ''
  }, {
    id: 3,
    numero: 3,
    descrizione: 'Tavolo 3',
    stato: 'ordinato',
    orario: ''
  },{
    id: 4,
    numero: 4,
    descrizione: 'Tavolo 4',
    stato: 'in_attesa',
    orario: '19:30'
  }, {
    id: 5,
    numero: 5,
    descrizione: 'Tavolo 50',
    stato: 'in_attesa',
    orario: '20:30'
  }, {
    id: 6,
    numero: 6,
    descrizione: 'Tavolo 6',
    stato: 'libero',
    orario: ''
  }, {
    id: 7,
    numero: 7,
    descrizione: 'Tavolo 7',
    stato: 'ordinato',
    orario: ''
  }];

  return {
    all: function() {
      return tavoli;
    },
    inAttesa: function() {
      return lodash.sortBy(
        lodash.filter(tavoli, function(tav){
            return _.includes(['in_attesa', 'richiesto_da_palmare'], tav.stato);
        }),
        ["orario", "numero"]);
    },
    remove: function(tavolo) {
      tavoli.splice(tavoli.indexOf(tavolo), 1);
    },
    get: function(tavoloId) {
      for (var i = 0; i < tavoli.length; i++) {
        if (tavoli[i].id === parseInt(tavoloId)) {
          return tavoli[i];
        }
      }
      return null;
    }
  };
})
})();
(function(){
angular.module('App')
.factory('Categorie', function(lodash) {
  var categorie = [{
    id: 0,
    descrizione: 'Coperti/extra'
  }, {
    id: 1,
    descrizione: 'Primi'
  }, {
    id: 2,
    descrizione: 'Secondi'
  }, {
    id: 3,
    descrizione: 'Contorni'
  },{
    id: 4,
    descrizione: 'Pizze'
  }, {
    id: 5,
    descrizione: 'Bevande'
  }, {
    id: 6,
    descrizione: 'Dolci'
  }];

  return {
    all: function() {
      return categorie;
    },
    get: function(categoriaId) {
      for (var i = 0; i < categorie.length; i++) {
        if (categorie[i].id === parseInt(categoriaId)) {
          return categorie[i];
        }
      }
      return null;
    }
  };
})
})();
(function(){
angular.module('App')
.factory('Pietanze', function(lodash) {
  var pietanze = [{
    id: 0,
    descrizione: 'Coperti',
    categoriaId: 0
  }, {
    id: 1,
    descrizione: 'Pasta al ragù',
    categoriaId: 1
  }, {
    id: 2,
    descrizione: 'Risotto ai funghi',
    categoriaId: 1
  }, {
    id: 3,
    descrizione: 'Pollo',
    categoriaId: 2
  },{
    id: 4,
    descrizione: 'Margherita',
    categoriaId: 4
  }, {
    id: 5,
    descrizione: 'Acqua naturale',
    categoriaId: 5
  }, {
    id: 6,
    descrizione: 'Tiramisù',
    categoriaId: 6
  }];

  return {
    all: function() {
      return pietanze;
    },
    get: function(pietanzaId) {
      for (var i = 0; i < pietanze.length; i++) {
        if (pietanze[i].id === parseInt(pietanzaId)) {
          return pietanze[i];
        }
      }
      return null;
    },
    getPietanzeCategoria: function(categoriaId) {
      return lodash.filter(pietanze, { categoriaId : categoriaId })
    }
  };
})
})();
