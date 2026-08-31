# Asta Live 2026-27 V62

## V62 — Decisione da asta
- Mantiene il redesign V61 e la logica dell’asta senza modificarne le regole.
- La scheda aperta evidenzia **Max consigliato**, **prezzo corrente** e **margine residuo**.
- Il margine si aggiorna in tempo reale mentre viene digitato il prezzo.
- La decisione resta dinamica: PRENDI / RILANCIA / LASCIA.
- Il termometro d’asta continua a mostrare il confronto tra prezzo, mercato, range e tetto.
- Mantiene la fase globale P → D → C → A e le Occasioni compatibili coerenti con il reparto.

## Deploy
Pubblicare nella root del sito:
- `index.html`
- `style.css`
- `data/players.json`

La versione non richiede modifiche al dataset.

V64: fix TRKLAB mobile, semantic margin colors, all eligible rivals, and checkpoint auction simulation.
