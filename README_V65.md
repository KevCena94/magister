# Asta Live 2026-27 — V65

Versione completa e deployabile.

## Contenuto
- `index.html` — applicazione completa, UI, dati incorporati, OCR/import, asta, rivali e simulazione.
- `style.css` — foglio stile del progetto.
- `data/players.json` — dataset giocatori originale.
- `README_DEPLOY.md` — note di deploy.

## V65
- Rivali selezionabili per gli acquisti “Ad altri”.
- Simulazione su copia dello stato con checkpoint prima dell'applicazione.
- Applicazione transazionale: nessun acquisto parziale se lo scenario non è valido.
- Vincolo hard: nessuna squadra può superare 1.000 crediti di spesa complessiva.
- Controllo di budget residuo, slot e credito minimo necessario per completare la rosa.
