angular.module('App')
  .constant('Constants', {
    statoTavolo: {
      accomodato: {
        stato: 'ACCOMODATO',
        colore: 'red',
        campoOrario: 'accomodatoOrario',
        campoPersona: 'accomodatoPersona'
      },
      in_ordinazione: {
        stato: 'IN_ORDINAZIONE',
        colore: 'yellow',
        campoOrario: 'inOrdinazioneOrario',
        campoPersona: 'inOrdinazionePersona'
      },
      ordinato: {
        stato: 'ORDINATO',
        colore: 'green',
        campoOrario: 'ordinazioneOrario',
        campoPersona: 'ordinazionePersona'
      },
      liberato: {
        stato: 'LIBERATO',
        colore: 'blue',
        campoOrario: 'liberatoOrario',
        campoPersona: 'liberatoPersona'
      }
    }
  });
