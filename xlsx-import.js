/*
 * Import Excel (.xlsx/.xls) per Asta Live.
 * Da aggiungere alla pagina DOPO app.js.
 * Richiede SheetJS (window.XLSX).
 */
(function () {
  const input = document.getElementById('rosaFile');
  if (!input) return;

  const isExcel = file => /\.(xlsx|xls)$/i.test(file.name || '');

  const norm = value => String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[._/\\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const num = value => {
    if (value === null || value === undefined || value === '') return null;
    let s = String(value).trim().replace(/[^0-9,.-]/g, '');
    // Gestisce sia 123,45 sia 1.234,56.
    if (s.includes(',') && s.includes('.')) s = s.replace(/\./g, '').replace(',', '.');
    else s = s.replace(',', '.');
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  };

  const findColumn = (header, aliases) => {
    const wanted = aliases.map(norm);
    return header.findIndex(cell => wanted.includes(norm(cell)));
  };

  const ruolo = value => {
    const r = norm(value).toUpperCase();
    if (['P', 'D', 'C', 'A'].includes(r)) return r;
    if (r.includes('PORT')) return 'P';
    if (r.includes('DIF')) return 'D';
    if (r.includes('CENT')) return 'C';
    if (r.includes('ATT')) return 'A';
    return 'C';
  };

  function parseWorkbook(buffer) {
    if (!window.XLSX) throw new Error('Lettore Excel non disponibile.');

    const wb = XLSX.read(buffer, { type: 'array' });
    if (!wb.SheetNames.length) throw new Error('Il file Excel non contiene fogli.');

    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(ws, {
      header: 1,
      defval: '',
      raw: false,
      blankrows: false
    });

    let headerIndex = -1;
    for (let i = 0; i < Math.min(rows.length, 15); i++) {
      if (findColumn(rows[i], ['Nome', 'Nome giocatore', 'Giocatore']) >= 0) {
        headerIndex = i;
        break;
      }
    }
    if (headerIndex < 0) throw new Error('Non trovo la colonna "Nome" nell\'intestazione Excel.');

    const header = rows[headerIndex];
    const iNome = findColumn(header, ['Nome', 'Nome giocatore', 'Giocatore']);
    const iSquadra = findColumn(header, ['Sq.', 'Sq', 'Squadra', 'Team']);
    const iRuolo = findColumn(header, ['R.', 'R', 'Ruolo', 'Role']);
    const iMantra = findColumn(header, ['R.MANTRA', 'R MANTRA', 'Mantra']);
    const iFvm = findColumn(header, ['FVM/1000', 'FVM', 'FVM 1000']);
    const iQt = findColumn(header, ['QUOT.', 'QUOT', 'Qt.A', 'Qta', 'Quotazione']);
    const iFuoriLista = findColumn(header, ['Fuori lista', 'Fuori lista?']);

    const players = [];
    const seen = new Set();

    for (const row of rows.slice(headerIndex + 1)) {
      const name = String(row[iNome] ?? '').trim();
      if (!name) continue;

      // Se il file marca esplicitamente un giocatore come fuori lista, non lo scartiamo:
      // lo importiamo comunque e conserviamo l'informazione in fuoriLista.
      const id = norm(name);
      if (!id || seen.has(id)) continue;
      seen.add(id);

      players.push({
        n: name,
        r: iRuolo >= 0 ? ruolo(row[iRuolo]) : 'C',
        sq: iSquadra >= 0 ? String(row[iSquadra] ?? '').trim() || '?' : '?',
        rm: iMantra >= 0 ? String(row[iMantra] ?? '').trim() : '',
        fvm: iFvm >= 0 ? num(row[iFvm]) : null,
        qt: iQt >= 0 ? num(row[iQt]) : null,
        fuoriLista: iFuoriLista >= 0 ? String(row[iFuoriLista] ?? '').trim() : ''
      });
    }

    if (players.length < 20) {
      throw new Error(`Ho trovato solo ${players.length} giocatori nell'Excel: controlla il foglio e l'intestazione.`);
    }

    return players;
  }

  // Capture phase: intercetta solo Excel prima dei vecchi handler CSV/TXT/JSON.
  document.addEventListener('change', async function (event) {
    if (event.target !== input) return;
    const file = input.files && input.files[0];
    if (!file || !isExcel(file)) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const esito = document.getElementById('esRosa');
    if (esito) {
      esito.textContent = 'Leggo il file Excel…';
      esito.className = 'esito';
    }

    try {
      const players = parseWorkbook(await file.arrayBuffer());

      // L'app attuale espone applicaPlayers nel file app.js.
      if (typeof window.applicaPlayers === 'function') {
        window.applicaPlayers(players, 'file');
      } else if (typeof window.aggiornaDatasetGiocatori === 'function') {
        window.aggiornaDatasetGiocatori(players);
      } else {
        throw new Error('Motore di importazione dell\'app non disponibile.');
      }

      if (esito) {
        esito.textContent = `${players.length} giocatori caricati da Excel.`;
        esito.className = 'esito';
      }
    } catch (err) {
      if (esito) {
        esito.textContent = err.message || 'Errore nella lettura del file Excel.';
        esito.className = 'esito err';
      }
    } finally {
      input.value = '';
    }
  }, true);
})();
