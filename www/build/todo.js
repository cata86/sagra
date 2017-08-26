
//Verificare come funziona il pulsante indietro
//Alert se non esiste una serata aperta (valutare dove, nei tavoli accomodati sicuramente)



/***************** TODO FUTURI ********************/
//gestione sequenze
//stampa per sequenza
//gestire le note delle pietanzeOrdinate
//solo in una sequenza posso mettere coperti
//gestione idsagra
//asporto: calcola resto
//nei tavoli in attesa si vorrebbe spostare in alto un tavolo (esempio band va servito subito)



/***************** RICORDA ********************/
// il coperto deve avere codice 000
// occorre sempre avere una serata aperta
// nel db caricare dati sagra, pietanze e tavoli reali ricordare di caricare il tavolo asporto
// solo gli ordini (scotrino + comande) che contengono solo dolci vanno dalla stampante dei dolci
// invia ordine il flag mantieniInAttesa: se false o null sposta il tavolo in ordinato, se true lo mette in accomodato se e solo se era accomodato o in_ordinazione
