/*



***************** TODO FUTURI ********************
- asporto grafica per categoria
- gestire le note delle pietanzeOrdinate
- gestione idsagra
- nei tavoli in attesa si vorrebbe spostare in alto un tavolo (esempio band va servito subito)

- asporto: calcola resto
- gestione sequenze
- stampa per sequenza
- solo in una sequenza posso mettere coperti

**********+*********** AVVIARE  ****************************
- ionic serve
- export PATH=/home/vagrant/Downloads/apache-maven-3.5.0/bin/:$PATH
- mvn -Dmaven.test.skip=true package


******************* NUOVA SAGRA *********************
1. modificare nome sagra cablato nel menu.html e home.html
2. modificare icona sagra
- mettere icona con nome icon.png nella cartella resources
- ionic resources --icon -> Generate only the icons. `icon.png`, `icon.psd` or `icon.ai` is located in `./resources/` directory
- ionic resources --splash -> Generate only the splash screens. `splash.png`, `splash.psd` or `splash.ai` is located in `./resources/` directory
- ionic resources ios --icon -> Generate icons per platform
- ionic resources android --icon -> Generate icons per platform

*********************** RICORDA **************************
- il coperto deve avere codice 000
- occorre sempre avere una serata aperta
- nel db caricare dati sagra, pietanze e tavoli reali ricordare di caricare il tavolo asporto
- le categorie vengono stampate nella stampante letta da DB mentre lo scontrino viene inviato ai dolci se contiene solo dolci
- invia ordine il flag mantieniInAttesa: se false o null sposta il tavolo in ordinato, se true lo mette in accomodato se e solo se era accomodato o in_ordinazione




*/
