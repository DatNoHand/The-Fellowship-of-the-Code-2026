# Artifact 4 – Logic & State

## System Capability

### Navigation und Orientierung (Fokus: Routenentscheidung & Interaktion)

Derselbe Capability-Slice wie in Artifact 3 — jetzt mit funktionierender Logik. Die Anwendung erlaubt es dem Nutzer, auf der Karte ein Ziel auszuwählen, Routen zu vergleichen und eine Routenwahl aktiv zu bestätigen. Der Flow reagiert auf Nutzerinteraktion: Screens wechseln, Zustände ändern sich, Gefahren-Warnung erscheint kontextabhängig.

---

## Implementierung

**Interface:**  [src/interface.html](src/interface.html)

**Styles:**     [src/style.css](src/style.css)

**Logic:**      [src/logic.js](src/logic.js)

---

## Beschreibung der Logik

### Zustandsmodell

Der einzige persistente Zustand der Anwendung ist: **welcher Screen ist aktiv**.

```
Zustand = { activeScreen: "screen-launcher" | "screen-map" | "screen-routes" | "screen-warning" }
```

Kein Objekt, kein Store, keine Variable — der Zustand ist direkt in den CSS-Klassen des DOM gespeichert. `.screen.active` ist der aktive Screen; alle anderen haben kein `.active`.

**Warum:** Für einen PoC ist der DOM selbst ausreichend als Zustandsspeicher. Eine eigene State-Variable würde erst dann Sinn ergeben, wenn mehrere Teile der Anwendung auf denselben Zustand reagieren müssten (z.B. ein Header-Badge, der den aktiven Screen anzeigt).

---

### `showScreen(id)` — Kern der Navigation

```javascript
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}
```

**Entscheidungen:**
- Entfernt `.active` von *allen* Screens vor dem Setzen — kein manuelles Verwalten des vorherigen Screens notwendig
- `window.scrollTo(0, 0)` verhindert, dass man auf einem neuen Screen in der Mitte landet, wenn zuvor die Routenliste gescrollt wurde
- Keine Transitions oder Animationen zwischen Screens — PoC-Priorität liegt auf Klarheit, nicht Immersion

---

### `selectTarget()` — Zwei-Schritt-Zielauswahl

```javascript
function selectTarget() {
  document.getElementById('cta-bar').removeAttribute('hidden');
  document.getElementById('map-tap-hint').textContent = 'Ziel: Bree — Routen berechnen ↓';
}
```

**Entscheidungen:**
- Entspricht direkt den Flow-Schritten **G → H → I** aus Artifact 2 (Nutzer tippt auf Ziel → System markiert Ziel → Routen-CTA erscheint)
- CTA-Bar ist initial `hidden` (HTML-Attribut, semantisch korrekt), nicht `display:none` per CSS — der Browser versteht `hidden` als "existiert nicht im Layout"
- Hint-Text wird überschrieben: kommuniziert den neuen Zustand ohne visuellen Screen-Wechsel
- Der Nutzer muss zwei bewusste Schritte tun: Ziel wählen, dann CTA drücken — kein versehentlicher Sprung zur Routenliste

---

### Karteninteraktionen

Die SVG-Karte hat drei klickbare Bereiche, implementiert als `<g onclick>`:

| Bereich | Funktion | Ziel-Screen |
|---|---|---|
| Bree-Marker | `selectTarget()` | — (CTA erscheint) |
| Gefahrenzone 1 (vor 2h) | `showScreen('screen-warning')` | Gefahren-Warnung |
| Gefahrenzone 2 (vor 5h) | `showScreen('screen-warning')` | Gefahren-Warnung |

**Warum Gefahrenzonen direkt zur Warnung?** Die Demo zeigt, dass die Karte nicht nur Kontext-Visualisierung ist, sondern aktiv auf Gefahren aufmerksam macht — auch ohne den Routenlisten-Schritt zwischendurch. Das unterstützt den Intent aus Artifact 1: "klare, verständliche Informationen ohne Überlastung".

**Hit-Areas:** Jede klickbare `<g>`-Gruppe enthält ein transparentes `<rect>` oder `<circle>` als vergrößertes Tap-Target — der sichtbare Marker ist zu klein für zuverlässige Touch-Interaktion.

---

### Sort-Buttons (visuell)

```javascript
document.querySelectorAll('.sort-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.sort-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
  });
});
```

**Entscheidung:** Kein echtes Sortieren der Routenliste — die Daten sind statisch. Der Button-Wechsel zeigt die Interaktions-Möglichkeit, ohne eine Sortieralgorithmus-Implementierung zu erfordern. Im echten System würde die Route-Liste bei `click` neu gerendert werden.

---

## Design Rationale

### Bezug zu Artifact 1

**Intent:** "Unterstützung bei der Routenentscheidung in unsicherer Umgebung — schnell erfassbar, ohne Überforderung"

Die Logik setzt diesen Intent direkt um:
- Jeder Screen-Wechsel ist eine *bewusste Nutzeraktion* — die App zeigt nicht automatisch die nächste Information
- Die Gefahren-Warnung erscheint nur bei Hochrisiko-Route oder direktem Tap auf Gefahrenzone — kein Alarm-Flooding
- `selectTarget()` erzwingt einen expliziten Zielauswahl-Schritt vor der Routenberechnung — Frodo (Persona: Low-Tech, Entscheidungsträger) wird durch den Flow *geführt*, nicht überfordert

**Constraint 2 (Webanwendung):** Kein Native-App-Framework, kein Build-Step, kein Bundler. Vanilla JS in einer einzigen Datei — läuft in jedem modernen Browser direkt.

---

### Bezug zu Artifact 2

Der implementierte Flow entspricht dem Mermaid-Diagram aus Artifact 2:

```
Artifact-2-Flow           →   Implementierung
──────────────────────────────────────────────
A: Nutzer öffnet App      →   screen-launcher (initial active)
B: Launcher erscheint     →   Module-Grid sichtbar
D: tippt Karte & Nav      →   showScreen('screen-map')
G: tippt auf Ziel         →   selectTarget()
H: Ziel markiert          →   CTA-Bar erscheint, Hint ändert sich
I: Routen-CTA erscheint   →   map-action-bar wird sichtbar
L: Routenliste erscheint  →   showScreen('screen-routes')
N: Nutzer wählt Route     →   onClick auf Route-Card
O: Gefahrenstufe hoch?    →   if high-risk → showScreen('screen-warning')
Q: Nutzer bestätigt       →   btn-confirm → showScreen('screen-launcher')
```

Nicht implementiert (bewusste Entscheidungen):
- **Schritt K** (kein begehbarer Weg) — kein Error-State, da Routen statisch sind
- **Schritt T** (Gruppenupdate) — würde Gruppenkoordinations-Capability erfordern (Artifact 1: Capability 3, noch nicht implementiert)
- **Rückweg Q→L** aus Artifact-2-Review — "← Andere Route" in der Warnung navigiert zurück zu `screen-routes`

---

### Entscheidung: Single-Page statt Multi-Page

Artifact 3 hatte vier separate HTML-Dateien mit `<a href>` Navigation. Artifact 4 konsolidiert alles in eine `interface.html`.

**Warum:**
- Kein Page-Reload unterbricht den Flow — für Demo und mündliche Verteidigung entscheidend
- Alle Screens und ihre Inhalte sind in einem Dokument sicht- und erklärbar
- `showScreen()` ist der einzige Einstiegspunkt für alle Übergänge — leicht zu verfolgen und zu debuggen

**Trade-off:** Die HTML-Datei ist länger und enthält alle Screens gleichzeitig im DOM. Bei einer echten Anwendung würde man ab einer bestimmten Komplexität auf komponentenbasiertes Rendering wechseln.

---

### Entscheidung: CSS-Trennung (style.css vs. FC-Design.css)

`FC-Design.css` enthält das vollständige Dark-Fantasy-Theme und bleibt unverändert — auch die statischen Einzelseiten aus Artifact 3 referenzieren diesen File.

`style.css` importiert `FC-Design.css` und ergänzt:
- Screen-Switching-Regeln (`.screen`, `.screen.active`)
- Button-Reset (Browser-Defaults überschreiben)
- Karten-spezifische Regeln (`.map-svg`, `.map-tap-target`, Animationen)

**Warum:** Klare Trennung zwischen "unverändertes Theme" und "neu hinzugefügte Interaktionslogik in CSS".

---

## Was wurde bewusst nicht implementiert

| Feature | Begründung |
|---|---|
| Echte Route-Sortierung | Statische Daten im PoC — Algorithmus würde nur simuliert |
| "Route bestätigt"-Screen | Flow-Schritt T (Gruppenupdate) gehört zu Capability 3 |
| Screen-Transitions (fade/slide) | Komplexität ohne Mehrwert für PoC-Demo |
| Persistenter Routenzustand | Kein echtes State-Management nötig — Demo ist einmalig |
| Error-State (kein Weg gefunden) | Statische Daten kennen kein Fehler-Szenario |

---

## Annahmen

1. **Statische Daten sind ausreichend** — Routenberechnung und Gefahrendaten kommen in einem echten System vom Backend. Der PoC zeigt nur die UI-Schicht.

2. **Kein persistenter Zustand zwischen Sessions** — Frodo wählt die Route einmalig, kein "Letzte Route" Feature.

3. **Browser-Unterstützung: Modern** — `100svh`, `@import` in CSS, `hidden`-Attribut, `querySelectorAll` — keine Polyfills, kein IE-Support.
