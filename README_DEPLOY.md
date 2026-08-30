# Asta Live 2026-27 V38

Modifiche V38:
- Decisione d'asta migliorata: `PRENDI / IN MEDIA / LASCIA` ora considera prezzo atteso, massimo personale, alternative disponibili, necessità del ruolo e scarsità.
- Il valore statistico non forza più da solo un `LASCIA`, evitando di penalizzare automaticamente i giocatori costosi ma coerenti con il mercato.
- La decisione viene ricalcolata anche mentre si modifica il campo `Pagato`, mantenendo coerenti termometro e stato.
- Mantenuti prezzi dinamici, frecce di trend, profilazione avversari, costo-opportunità e massimo personale.
- Demo Backtesting/Profilazione nascosta dall'interfaccia ma mantenuta nel codice.
- Mantenuti allineamento desktop di `tnote` e layout mobile.

Deploy: pubblicare `index.html`, `style.css` e la cartella `data/`.


V41: stabilizzazione della decisione canonica e traccia decisionale unica visibile nel dettaglio giocatore.
V43: la decisione mostrata nell’hint del dettaglio è dinamica e si aggiorna in base al prezzo inserito nel campo Pagato, come la decisione nel componente.
