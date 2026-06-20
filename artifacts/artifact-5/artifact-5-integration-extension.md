# Artifact 5 — System-Integration & Extension

## Selected System Capability

**Wissensressource** (Artifact 1, Capability 3):

> "Die Gruppe kann sich eigenständig über unbekannte Kreaturen, essbare Pflanzen, Heilmittel, Rezepte und Überlebensstrategien informieren, um fundierte Entscheidungen in der Wildnis zu treffen."

Diese Capability stand seit Artifact 3 als "Lexikon" — `locked`, "Bald verfügbar" — im Modul-Grid des Launchers. Artifact 5 implementiert sie und löst damit ein Versprechen ein, das das System sich selbst schon zwei Artefakte zuvor gegeben hat.

---

## System Flow (Mermaid)

Siehe [src/flowchart-system.mermaid.md](src/flowchart-system.mermaid.md).

Der Flow zeigt absichtlich **keine** Schritt-für-Schritt-Interaktion (das leistet bereits Artifact 2 für Navigation) — sondern nur: welche Module existieren, welche davon implementiert sind, und wo Abhängigkeiten zwischen ihnen liegen. Zwei Dinge fallen darin auf:

1. Die Gefahren-Warnung (Teil von Navigation) verweist gezielt ins Lexikon — die neue Capability ist von Tag eins an vernetzt, nicht isoliert.
2. Die externe Wetter-API ist kein eigener Knoten im Modul-Sinn, sondern ein Signalgeber, der in zwei *bestehende* Capabilities einspeist.

---

## System Wireframe (low-fi)

Siehe [src/wireframe-system.png](src/wireframe-system.png).

Zeigt dieselbe Struktur räumlich: Launcher oben, vier Module darunter (zwei davon weiterhin gesperrt, gestrichelt), die jeweiligen Sub-Screens darunter, und die Wetter-API als externer, gestrichelter Knoten mit Einfluss-Pfeilen statt einer normalen Navigationskante — visuelle Unterscheidung zwischen "Nutzer navigiert hierher" und "System wird hiervon beeinflusst".

---

## Implementation Snapshot

- **Interface:** [src/interface.html](src/interface.html)
- **Styles:** [src/style.css](src/style.css) (importiert weiterhin unverändert [src/FC-Design.css](src/FC-Design.css))
- **Logic:** [src/logic.js](src/logic.js)

Gebaut nach exakt demselben Muster wie Artifact 3/4: ein HTML-Dokument mit allen Screens, `showScreen(id)` als einziger Navigations-Mechanismus, statische Daten statt Backend. Zwei neue Screens kommen hinzu:

- **`screen-lexikon`** — Liste aller Wissens-Einträge (Kreaturen, Pflanzen, Rezepte, Überlebensstrategien, Sprache), gerendert aus einem statischen `LEXIKON_ENTRIES`-Array in `logic.js`
- **`screen-lexikon-detail`** — ein einziger Detail-Screen, dessen Inhalt per `openLexikonEntry(id)` nachgeladen wird, statt sechs einzelne Detail-Screens zu bauen

Im Launcher wechselt die Lexikon-Karte von `<div class="module-card locked">` zu genau demselben `<button class="module-card active">`-Markup, das die Karte&Navigation-Kachel schon nutzt — keine neue Komponentenform, nur Wiederholung.

---

## Meaningful Extension: Wetter-API (Open-Meteo)

**Was:** Ein einziger `fetch()`-Aufruf gegen die kostenlose, schlüssellose Open-Meteo-API liefert das aktuelle Wetter für Oxford, UK — Tolkiens realen Wohnort, hier bewusst als Stellvertreter-Koordinate für "die Straße nach Bree" gewählt, da Mittelerde keine echten Geo-Koordinaten hat.

**Wie es Bedeutung statt nur Optik verändert:**

1. **Navigation/Gefahrenerkennung:** Bei Regen/Sturm wird auf `screen-routes` an der Nebelmoor-Route automatisch der Hinweis "Aktuell zusätzlich durch Unwetter erschwert" ergänzt — die Route war schon "Hohe Gefahr", das Wetter macht die Begründung dafür konkreter und aktuell.
2. **Wissensressource (Lexikon):** Bei Regen wird im Lexikon automatisch ein passender Eintrag (z. B. *Athelas* oder *Unterschlupf bei Unwetter*) mit dem Tag "Empfehlung heute" markiert — der Nutzer bekommt kontextabhängig das relevanteste Wissen zuerst angezeigt, nicht die immer gleiche Liste.

Beides ist **Verhaltensänderung**, kein Styling: welche Information hervorgehoben wird und welcher Warnhinweis erscheint, hängt vom tatsächlichen externen Zustand ab, nicht von einer festen Konfiguration.

**Wie es an Bestehendes anschließt, statt Neues zu erfinden:** Die Wetter-API führt keine eigene Capability ein. Sie ist ein Modifikator für zwei Capabilities, die bereits existieren (Navigation, Wissensressource) — genau die im Briefing geforderte Eigenschaft ("must connect to existing capabilities, not introduce a new one").

Implementiert in [src/logic.js](src/logic.js) über `fetchWeather()` → `applyWeatherEffects(condition)`, die den Badge-Text, die Routen-Annotation und das Lexikon-Re-Rendering in einem Schritt aktualisiert.

---

## Design Rationale

**Wie der integrierte Stand weiterhin den ursprünglichen Intent (Artifact 1) widerspiegelt:**
Der Intent aus Artifact 1 nennt explizit "gesammeltes Wissen (Rezepte, Lexikon)" als Teil dessen, was die Hobbits handlungsfähig macht. Das Lexikon war kein nachträglicher Einfall, sondern stand von Anfang an auf der Liste — Artifact 5 schließt eine Lücke, die das System selbst seit Artifact 3 sichtbar offen gehalten hat (`locked`-Karte). Die Wetter-Extension wiederum bedient denselben Intent-Satz noch direkter: "Sie sollen vorbereitet sein und das Unbekannte entdecken" — ein reales, sich änderndes Außensignal ist näher an "Unbekanntem" als jede statische Demo-Datenmenge.

**Wie sich die einzelnen Slices sinnvoll verbinden:**
Drei Verbindungen wurden bewusst gebaut, keine zufällig: (1) Launcher → Lexikon, identisches Eintrittsmuster wie Launcher → Karte; (2) Gefahren-Warnung → Lexikon-Cross-Link, damit eine Gefahren-Situation direkt zum passenden Wissenseintrag führt, statt zwei getrennte Inseln zu sein; (3) Wetter-API → Navigation *und* Wissensressource gleichzeitig, als gemeinsamer externer Auslöser für beide.

**Warum die gewählte Extension sinnvoll ist:**
Eine reine UI-Bibliothek (z. B. Bootstrap) hätte nur Optik verändert — das Briefing fordert explizit eine Verhaltens- oder Bedeutungsänderung. Eine echte, kostenlose, schlüssellose API ohne Backend-Aufwand (Open-Meteo) passt zum PoC-Charakter des gesamten Projekts und liefert trotzdem einen echten externen, nicht kontrollierbaren Zustand — der erste im gesamten System.

**Was bewusst nicht gebaut wurde:**

| Nicht gebaut | Begründung |
|---|---|
| Echte Mittelerde-Geokoordinaten / Karten-API | Existiert nicht — Oxford als erklärbarer, thematisch begründeter Realwelt-Stellvertreter reicht für den PoC |
| Persistente Speicherung von Lexikon-Suchen/Favoriten | Kein Mehrwert ohne Nutzerkonten — Artifact 1 schließt Rollen/Accounts explizit aus |
| Backend/CMS für Lexikon-Inhalte | Artifact 1, Constraint 3: Wissensressource wird manuell gepflegt — ein statisches Array ist die korrekte Repräsentation davon, kein technisches Defizit |
| Volltextsuche im Lexikon | Fünf Einträge brauchen keine Suche — würde Komplexität ohne Nutzen hinzufügen |
| Implementierung von Gefahrenerkennung/Gruppenkoordination | Bleiben bewusst `locked` — Artifact 5 erweitert kontrolliert um *eine* Capability, nicht um alle restlichen |

---

## Reflection

Siehe [Chapter V — The Fellowship, Complete](../../chapters/chapter-5-the-fellowship-complete.md) für die Reflexion über die Entwicklung von Verständnis, Scope und Entscheidungen seit Phase 1.
