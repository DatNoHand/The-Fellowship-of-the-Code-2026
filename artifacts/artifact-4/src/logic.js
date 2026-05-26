// ENTSCHEIDUNG: Ein einziger Zustand — welcher Screen ist sichtbar.
// Kein Framework, kein Router, keine State-Klasse.
// Für einen PoC reicht eine Funktion + CSS-Klassen.

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  // Scrollt den neuen Screen nach oben — wichtig wenn Routenliste gescrollt war
  window.scrollTo(0, 0);
}

// ENTSCHEIDUNG: Ziel-Auswahl als eigener Schritt vor "Routen berechnen".
// Entspricht dem Flow in Artifact 2: erst Ziel wählen (G/H/I), dann Routen laden (L).
// selectTarget() zeigt den CTA — der Nutzer muss bewusst tippen, nicht nur scrollen.
function selectTarget() {
  document.getElementById('cta-bar').removeAttribute('hidden');
  document.getElementById('map-tap-hint').textContent = 'Ziel: Bree — Routen berechnen ↓';
}

// ENTSCHEIDUNG: Sort-Buttons sind im PoC rein visuell.
// Die Daten sind statisch — kein echtes Sortieren notwendig.
// Im echten System würde hier die Route-Liste neu gerendert werden.

document.querySelectorAll('.sort-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.sort-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
  });
});