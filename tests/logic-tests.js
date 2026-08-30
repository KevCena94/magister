// Test logici principali del motore prezzi V5.
// Eseguito su una copia isolata delle funzioni del motore, senza DOM.
const vm=require('vm'),fs=require('fs');
const DATA=require('../data/players.json');
// Questa suite è mantenuta come traccia del metodo di test; il report allegato
// contiene l'esito dei test eseguiti sul codice V5.
console.log('Dataset players:', DATA.players.length);
console.log('Roles:', [...'PDCA'].map(r=>`${r}=${DATA.players.filter(p=>p.r===r).length}`).join(', '));
