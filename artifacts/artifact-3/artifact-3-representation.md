# Artifact 3 – Representation

## System Capability

### Navigation und Orientierung (Fokus: Routenentscheidung & Darstellung)

Die Anwendung ermöglicht es Frodo und der Gruppe, berechnete Routen von ihrem aktuellen Standort (Buckland) zum nächsten Ziel (Bree) visuell zu vergleichen und eine Route aktiv auszuwählen. Die Nutzer sehen strukturierte Informationen zu Distanz, Gefahrenstufe und Geländeschwierigkeit — und können darauf basierend eine informierte Entscheidung treffen.

**Warum dieses Feature?**

Während Artifact 2 die Logik und den Flow der gesamten Navigations-Capability beschreibt, liegt der Fokus hier darauf, wie die Routenwahl konkret in der Oberfläche repräsentiert wird.

Gerade in einer unsicheren Umgebung wie Mittelerde — Nazgûl auf den Fersen, unbekanntes Terrain — ist es entscheidend, dass Informationen klar, schnell erfassbar und vergleichbar sind. Die UI reduziert Komplexität und unterstützt Frodo dabei, Risiken bewusst abzuwägen: nicht einfach die schnellste Route nehmen, sondern die sicherste.

---

## Statische Interface Implementation

Link zu der Seite: [src/interface.html](src/Fellowship-Companion.html)
Map            [src/interface.html](src/Fellowship-Companion-Page2.html)
Route          [src/interface.html](src/Fellowship-Companion-Page3.html)
Risikowarnung  [src/interface.html](src/Fellowship-Companion-Page4.html)

---

## Beschreibung der Interface-Struktur

Die implementierte Oberfläche besteht aus vier Screens, die direkt aus dem Wireframe aus Artifact 2 abgeleitet wurden. Der Kern liegt auf Screen 3 (Routenvergleich) und Screen 4 (Gefahren-Warnung) als der eigentlichen Entscheidungsmoment.

### 1. Launcher (Einstieg & Orientierung)

Der Launcher zeigt:

- App-Name und Kontext: "Fellowship Companion — Dein Wegbegleiter durch Mittelerde"
- Datum im lore-konsistenten Auenland-Kalender ("9. Blumenmonat, S.Z. 3018")
- Animierter Bedrohungsindikator: "⚠ Bedrohung nahe"
- 2×2-Modul-Grid: nur **Karte & Navigation** ist aktiv, drei weitere Module sind ausgegraut ("Bald verfügbar")

**Zweck:** Der Nutzer versteht sofort, dass dies eine App mit mehreren Capabilities ist — und dass er sich gerade in einem frühen Stand befindet. Nur ein Pfad ist offen.

### 2. Kartenansicht (Kontext vor der Entscheidung)

Die isometrische SVG-Karte zeigt:

- **Frodo** als pulsierender goldener Marker ("FRODO") — visuell dominant
- **Gefährten** (Samweis, Merry, Pippin) als kleinere blaue Marker in der Nähe
- **Nazgûl-Sichtungen** als blinkende rote Gefahrenzonen mit Zeitstempel ("vor 2h", "vor 5h")
- **Bree** als Ziel-Marker am Ende der Straße
- Alert-Leiste: "Nazgûl gesichtet — 2 Reiter, zuletzt vor ~2 Stunden"

**Zweck:** Bevor die Routenliste erscheint, versteht der Nutzer die Ausgangslage — wo er ist, wo die Gefahr ist, wohin er muss. Die Entscheidung hat Kontext.

### 3. Routenliste (Kern der Entscheidung)

Dies ist der wichtigste Bereich der UI.

Jede der drei Routen ist als eigene Karte dargestellt und enthält:

- **Distanz** (z.B. "8 Tagesreisen")
- **Geländeschwierigkeit** (Leicht / Mittel / Schwer)
- **Gefahrenstufe** (Niedrig / Mittel / Hoch) — mit farbigem Balken und Textwert
- **Kurzbeschreibung** der Route in einem Satz

Zusätzlich:

- Standard-Sortierung: nach Sicherheit (sicherste Route zuerst)
- Alternative Sortierung über Tabs: Distanz, Schwierigkeit
- Visuelles Hervorheben: empfohlene Route mit grünem Rahmen und "Empfohlen"-Badge, Hochrisiko-Route mit rotem Rahmen und "Hohe Gefahr"-Badge

**Zweck:** Frodo soll nicht rechnen oder interpretieren müssen — die UI macht die Unterschiede zwischen den drei Routen sofort sichtbar. Die sicherste Option ist die erste und hervorgehobene.

### 4. Gefahren-Warnung (Bewusste Bestätigung)

Wählt der Nutzer die Route "Durch das Nebelmoor" (hohe Gefahr), erscheint ein Bottom Sheet über einem gedimmten Echo der Routenliste. Das Sheet enthält:

- Roten Warn-Icon mit animiertem Glow
- Titel: "Hohe Gefahr — Route bestätigen?"
- Drei konkrete Gefahrendetails: Anzahl Nazgûl-Sichtungen, Zeitstempel der letzten Sichtung, Terrain-Warnung
- Zwei gleichwertige Buttons: **"← Andere Route"** und **"Trotzdem nehmen"**

**Zweck:** Die Entscheidung wird bewusst gemacht — nicht einfach auswählen, sondern aktiv bestätigen. Die Buttons sind absichtlich gleichwertig (kein Primär/Sekundär), damit Frodo die Verantwortung spürt.

---

## Design Rationale

### Bezug zu Artifact 2

Der implementierte Flow entspricht direkt den Schritten aus dem Mermaid-Diagram in Artifact 2:

> **L** → Routenvergleich: Liste mit Distanz, Schwierigkeit, Gefahrenstufe  
> **M** → Nutzer ändert Sortierung  
> **N** → Nutzer wählt Route  
> **O/P** → Gefahrenstufe hoch? → Warnung anzeigen  
> **Q** → Nutzer bestätigt trotz Gefahr?

Aus dem Flow wurden bewusst einige Schritte **nicht** als eigene Screens implementiert:

- Kein interaktiver Zielpunkt auf der Karte (G/H/I im Flow)
- Kein "Kein begehbarer Weg"-Screen (K im Flow)
- Kein Gruppen-Routenupdate (T im Flow)

Diese Reduktion entspricht dem Assignment-Ziel: **ein klarer Capability-Slice statt ein komplettes System**.

---

### Entscheidung: Kartenansicht als Kontext, nicht als Kernfunktion

Die Karte ist implementiert, aber nicht interaktiv. Man kann nicht auf ihr tippen, um ein Ziel zu setzen. Stattdessen ist die Karte ein visueller Kontext-Screen vor dem eigentlichen Entscheidungsmoment.

**Warum?**

- Technische Einschränkung: nur HTML/CSS/minimales JS
- Fokus liegt auf der Entscheidungslogik, nicht auf der Navigation
- Die Routenliste ist besser geeignet für strukturierten Vergleich

**Trade-off:** Weniger Immersion — dafür klarere Entscheidungsstruktur.

---

### Entscheidung: Visuelle Hierarchie statt Text

Die UI nutzt unterschiedliche Größen, Abstände und Farbkodierung, um wichtige Informationen hervorzuheben. Die empfohlene Route ist größer wahrnehmbar als die gesperrten Module; die Gefahrenstufe ist ein farbiger Balken, nicht nur Text.

**Warum?** In Stresssituationen — Nazgûl in der Nähe, Zeitdruck — lesen Nutzer keine langen Texte. Sie scannen. Die UI muss Unterschiede sofort sichtbar machen.

---

### Entscheidung: Farbe als Bedeutungsträger

Farben sind nicht dekorativ, sondern funktional:

- **Grün** → sicher ("Grüne Auen Straße", "Empfohlen"-Badge)
- **Bernstein** → mittel ("Über die Südhügel", "Mittel"-Badge)
- **Rot** → gefährlich ("Durch das Nebelmoor", "Hohe Gefahr"-Badge, Warning-Sheet)

**Warum?** Schnelle Interpretation ohne Lesen. Frodo als Low-Tech-Nutzer (Persona aus Artifact 1) soll nicht durch Text navigieren müssen.

---

### Entscheidung: Jede Route hat ihren eigenen Call-to-Action

Jede Routenkarte ist ein eigener Button statt einer globalen Auswahl.

**Warum?**

- verhindert Verwechslung zwischen Route und Aktion
- die Entscheidung ist direkt mit der Option verbunden
- reduziert kognitive Last

Bei der Hochrisiko-Route führt der Button nicht direkt zur Bestätigung, sondern zur Gefahren-Warnung — ein zusätzlicher Schritt, der die Konsequenz bewusst macht.

---

## Annahmen (Assumptions)

1. **Nutzer kennt grundlegende UI-Muster** — Buttons, Listen, visuelle Hierarchie. Frodo mag Low-Tech sein, aber das App-Muster ist intuitiv genug.

2. **Routendaten sind bereits berechnet** — Die UI zeigt nur Ergebnisse. Die Berechnung von Distanz, Geländeschwierigkeit und Gefahrenstufe passiert im Hintergrund durch die "Gefahrenerkennung"-Capability (Artifact 1).

3. **Gefahrenbewertung ist verlässlich genug** — Die "Zuletzt gesichtet"-Zeitstempel machen die Unsicherheit der Daten explizit. Frodo weiss: "vor 2h" bedeutet nicht "aktuell sicher", sondern "zuletzt gesehen vor 2h — könnte sich bewegt haben".

4. **Nutzung erfolgt in ruhigen Momenten** — Routenwahl ist keine Echtzeit-Interaktion. Die Gruppe hält kurz an und plant. Kein Scrolling unter Beschuss.

5. **Gerät ist mobil oder touch-zugänglich** — Layout ist Mobile-First (`max-width: 430px`), Tap-Targets nach Fitts' Law dimensioniert. Funktioniert auch auf Desktop als zentriertes Phone-Frame.
