# Asta Live 2026-27 — V72.8

## V72.8 – Incrocio prezzi e nuova asta
- Il file `data/prezzi_asta_2026_27.json` contiene **solo i prezzi pagati** nell'asta precedente, estratti dal backup fornito.
- Non contiene rose, assegnazioni, formazioni, squadre o cronologia dell'asta.
- L'app legge automaticamente questi prezzi da `data/`, quindi sono disponibili anche quando l'app viene pubblicata online.
- All'avvio di V72.8 la rosa è volutamente **azzerata** per la nuova asta.
- I prezzi della precedente asta vengono invece usati come memoria storica per migliorare la valutazione dei giocatori.
- Il modello incrocia: modello statistico + storico 2025-26 + prezzo realmente pagato nell'asta 2026-27 precedente.
- Il prezzo dell'asta precedente ha il peso maggiore perché è il segnale più recente.
- La precedente formazione non viene ripristinata e non viene salvata nel file remoto dei prezzi.
- L'autosalvataggio della nuova asta usa una nuova chiave (`asta2026_autosave_stato_v72_8`), quindi non recupera automaticamente la vecchia asta.

## File dati
- `data/rose_storiche_2025_26.xlsx` — storico rose/prezzi 2025-26.
- `data/prezzi_asta_2026_27.json` — soli prezzi reali dell'asta precedente (195 giocatori).
