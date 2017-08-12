angular.module('App')
  .constant('Constants', {
    statoTavolo: {
      accomodato: {
        stato: 'ACCOMODATO',
        colore: 'red'
      },
      in_ordinazione: {
        stato: 'IN_ORDINAZIONE',
        colore: 'yellow'
      },
      ordinato: {
        stato: 'ORDINATO',
        colore: 'green'
      },
      liberato: {
        stato: 'LIBERATO',
        colore: 'blue'
      }
    }
  });
