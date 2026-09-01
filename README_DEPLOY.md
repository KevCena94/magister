# Asta Live 2026-27 — V67

Base V65 mantenuta. Migliorie V67:
- Rivali allineati al contenuto desktop.
- Ogni scheda giocatore mostra i rivali più plausibili per quel giocatore, con interesse stimato, offerta indicativa, budget/slot residui e confidenza.
- La previsione generale Rivali evita, quando possibile, di assegnare lo stesso prossimo obiettivo a tutti gli avversari.
- La stima usa necessità del ruolo, budget e slot residui, comportamento storico e mercato.
- Il modello non presenta una previsione come certezza.
- Nessuna squadra può superare 1000 crediti.

## V67.1 – logica coppia portiere
La previsione dei Rivali considera anche la relazione tra portiere titolare e riserva diretta. Se un avversario ha già acquistato il titolare di un club, la relativa riserva viene trattata come obiettivo naturale dello stesso avversario, con aumento dell'interesse e della confidenza e con motivazione esplicita nella scheda del giocatore.
