// logic.js — Fellowship Companion, Artifact 5
// Basis: artifact-4/src/logic.js (showScreen, selectTarget, Sort-Buttons — unverändert).
// Neu: Lexikon-Daten + Rendering, und die Wetter-Extension (fetchWeather/applyWeatherEffects).

// ── Zustand (unverändert aus Artifact 4) ─────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function selectTarget() {
  document.getElementById('cta-bar').removeAttribute('hidden');
  document.getElementById('map-tap-hint').textContent = 'Ziel: Bree — Routen berechnen ↓';
}

document.querySelectorAll('.sort-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.sort-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
  });
});


// ── Lexikon — Wissensressource (Artifact 1, Capability 3) ────────────
// ENTSCHEIDUNG: statisches Array statt Backend/CMS — entspricht Artifact 1,
// Constraint 3 ("Inhalte der Wissensressource müssen manuell gepflegt werden").
// weatherTag markiert, bei welcher Wetterlage ein Eintrag als Empfehlung
// hervorgehoben wird (Verbindung zur Wetter-Extension weiter unten).
var LEXIKON_ENTRIES = [
  {
    id: 'nazgul',
    name: 'Die Nazgûl',
    category: 'Kreaturen',
    summary: 'Ringgeister auf schwarzen Pferden — meiden Licht und fließendes Wasser.',
    text: 'Die neun Nazgûl folgen der Spur des Rings. Sie erkennen seinen Träger über Distanz, sehen aber die physische Welt nur schwach. Fließendes Wasser und direktes Sonnenlicht schwächen sie. Bekannte Gegenmittel: laut singen oder rufen schreckt sie nicht ab — Stille und Deckung sind die einzige verlässliche Strategie.',
    weatherTag: null
  },
  {
    id: 'athelas',
    name: 'Athelas (Königskraut)',
    category: 'Pflanzen',
    summary: 'Heilkraut gegen Wundfieber und Schwarze-Atem-Vergiftung.',
    text: 'Athelas wächst an feuchten, schattigen Stellen entlang von Bachläufen — bevorzugt nach Regen, wenn der Boden durchfeuchtet ist. Zerstoßen und in heißes Wasser gegeben, lindert es Fieber durch vergiftete Klingen. Erkennbar an den schmalen, spitzen Blättern und dem schwach süßlichen Geruch beim Zerreiben.',
    weatherTag: 'rain'
  },
  {
    id: 'lembas',
    name: 'Lembas-Brot',
    category: 'Rezepte',
    summary: 'Elbisches Reisebrot — ein Stück sättigt für einen ganzen Tag.',
    text: 'Von den Elben aus Lothlórien gereicht. Ein einziges Lembas-Stück deckt den Tagesbedarf eines erwachsenen Reisenden. Wichtig: trocken und kühl lagern, in das mitgelieferte Blattwerk eingewickelt lassen — so bleibt es über Wochen haltbar.',
    weatherTag: null
  },
  {
    id: 'unterschlupf',
    name: 'Unterschlupf bei Unwetter',
    category: 'Überlebensstrategien',
    summary: 'Wo man bei Sturm und Starkregen sicher unterkommt.',
    text: 'Bei Sturm oder Starkregen keine Talsenken oder Flussbetten als Lager wählen — Überflutungsgefahr. Überhängende Felsen oder dichtes Unterholz an Hanglagen bieten Schutz, ohne Spuren zu hinterlassen. Feuer nur unter dichtem Blätterdach, niemals auf freiem Feld bei Sturm.',
    weatherTag: 'rain'
  },
  {
    id: 'sprachbarriere',
    name: 'Verständigung mit Elben',
    category: 'Sprache',
    summary: 'Grundlegende Höflichkeitsformeln in Sindarin.',
    text: '"Mae govannen" (Willkommen/Gut getroffen) als Gruß ist bei den meisten elbischen Völkern bekannt und wird als Zeichen von Respekt verstanden, auch von Reisenden, die kein Sindarin sprechen. Wichtiger als korrekte Aussprache ist die ruhige, offene Körperhaltung beim ersten Kontakt.',
    weatherTag: null
  }
];

// ENTSCHEIDUNG: eigene Einträge leben in LocalStorage, getrennt vom
// statischen LEXIKON_ENTRIES-Array — kein Vermischen von "mitgeliefertem"
// und "selbst hinzugefügtem" Wissen im Code, nur bei der Anzeige.
var LEXIKON_CUSTOM_KEY = 'fc-lexikon-custom-entries';

function loadCustomEntries() {
  try {
    return JSON.parse(localStorage.getItem(LEXIKON_CUSTOM_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCustomEntries(entries) {
  localStorage.setItem(LEXIKON_CUSTOM_KEY, JSON.stringify(entries));
}

function getAllLexikonEntries() {
  return LEXIKON_ENTRIES.concat(loadCustomEntries());
}

function renderLexikonList() {
  var container = document.getElementById('lexikon-list');
  if (!container) return;

  container.innerHTML = getAllLexikonEntries().map(function (entry) {
    var tag = entry.weatherTag && entry.weatherTag === window.currentWeatherTag
      ? '<span class="lexikon-recommend-tag">Empfehlung heute</span>'
      : entry.custom
        ? '<span class="lexikon-custom-tag">Eigener Eintrag</span>'
        : '';
    return `
      <button class="lexikon-card${entry.custom ? ' custom-entry' : ''}" onclick="openLexikonEntry('${entry.id}')">
        <div class="lexikon-card-header">
          <span class="lexikon-card-name">${entry.name}</span>
          ${tag}
        </div>
        <div class="lexikon-card-category">${entry.category}</div>
        <p class="lexikon-card-summary">${entry.summary}</p>
      </button>
    `;
  }).join('');
}

// ENTSCHEIDUNG: Titel/Kategorie wandern in den page-header (id-basiert),
// statt den generischen Platzhalter "Lexikon-Eintrag" stehen zu lassen —
// jeder Eintrag bekommt so seine eigene, erkennbare Detailseite.
function openLexikonEntry(id) {
  var entry = getAllLexikonEntries().find(function (e) { return e.id === id; });
  if (!entry) return;

  document.getElementById('lexikon-detail-title').textContent = entry.name;
  document.getElementById('lexikon-detail-sub').textContent = entry.category;
  document.getElementById('lexikon-detail-content').innerHTML =
    '<p class="lexikon-detail-text">' + entry.text + '</p>';

  showScreen('screen-lexikon-detail');
}

// ENTSCHEIDUNG: Speichern erzeugt eine neue id aus Name + Timestamp statt
// einen Zähler zu pflegen — kollisionsfrei genug für einen PoC ohne Backend.
function saveCustomEntry(event) {
  event.preventDefault();

  var name = document.getElementById('lexikon-new-name').value.trim();
  var text = document.getElementById('lexikon-new-text').value.trim();
  if (!name || !text) return;

  var category = document.getElementById('lexikon-new-category').value;
  var summary = document.getElementById('lexikon-new-summary').value.trim() || text.slice(0, 80);

  var entry = {
    id: 'custom-' + Date.now(),
    name: name,
    category: category,
    summary: summary,
    text: text,
    weatherTag: null,
    custom: true
  };

  var customEntries = loadCustomEntries();
  customEntries.push(entry);
  saveCustomEntries(customEntries);

  document.getElementById('lexikon-new-form').reset();
  renderLexikonList();
  showScreen('screen-lexikon');
}

renderLexikonList();


// ── Meaningful Extension: Wetter-API (Open-Meteo) ─────────────────────
// ENTSCHEIDUNG: Open-Meteo statt Wetter für Mittelerde-Koordinaten, da es
// kein echtes Mittelerde-Geo gibt. Oxford/UK steht stellvertretend für
// "die Straße nach Bree" — Tolkiens realer Wohnort, bewusst gewählt statt
// einer beliebigen Koordinate (siehe Design Rationale in der Artifact-MD).
//
// Die Wetterlage verändert zwei bereits bestehende Capabilities:
//   1) Navigation/Gefahrenerkennung: Regen/Sturm erhöht sichtbar die
//      Gefahreneinstufung der Nebelmoor-Route.
//   2) Wissensressource: Regen/Sturm hebt einen passenden Lexikon-Eintrag
//      als "Empfehlung heute" hervor.
// Kein drittes/neues Modul — die API perturbiert nur vorhandene Screens.

var OXFORD_LAT = 51.75;
var OXFORD_LON = -1.26;

window.currentWeatherTag = null;

function weatherCodeToCondition(code) {
  // Open-Meteo WMO-Codes: 51-99 deckt Regen/Schauer/Gewitter/Schnee ab.
  if (code >= 51) {
    return { label: 'Regen', icon: '🌧', tag: 'rain', bad: true };
  }
  if (code >= 1 && code <= 3) {
    return { label: 'Bewölkt', icon: '⛅', tag: null, bad: false };
  }
  return { label: 'Klar', icon: '☀', tag: null, bad: false };
}

function setWeatherBadges(text, isBad) {
  ['weather-badge', 'weather-badge-lexikon'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.classList.toggle('weather-bad', !!isBad);
  });
}

function applyWeatherEffects(condition) {
  window.currentWeatherTag = condition.tag;

  setWeatherBadges(condition.icon + ' Oxford: ' + condition.label, condition.bad);

  // Nebelmoor-Route bei Regen/Sturm als zusätzlich erschwert markieren.
  var note = document.getElementById('weather-note');
  if (note) {
    note.textContent = condition.bad ? ' Aktuell zusätzlich durch Unwetter erschwert.' : '';
  }

  renderLexikonList();
}

function fetchWeather() {
  var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + OXFORD_LAT +
            '&longitude=' + OXFORD_LON + '&current_weather=true';

  fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var code = data && data.current_weather ? data.current_weather.weathercode : 0;
      applyWeatherEffects(weatherCodeToCondition(code));
    })
    .catch(function () {
      setWeatherBadges('☁ Wetter: nicht verfügbar');
    });
}

fetchWeather();