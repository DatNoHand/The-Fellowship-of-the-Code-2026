# The Red Book of Westmarch - Chapter 4: When things react

*`„Nicht alle, die wandern, sind verloren." ~J.R.R. Tolkien`*

**Table of Contents**

- [The Red Book of Westmarch - Chapter 4: When things react](#the-red-book-of-westmarch---chapter-4-when-things-react)
  - [Summary](#summary)
  - [Artifact](#artifact)
  - [AI Assistance](#ai-assistance)
  - [Lessons Learned](#lessons-learned)

---

## Summary

Dieses Kapitel überführt die statische Repräsentation aus Kapitel 3 in eine interaktive, zustandsbehaftete Anwendung. Die vier Screens — Launcher, Karte, Routenliste, Gefahren-Warnung — existieren nun in einem einzigen HTML-Dokument und reagieren auf Nutzeraktionen. Die Karte ist klickbar, das Ziel muss bewusst ausgewählt werden, und je nach Routenwahl erscheint eine kontextabhängige Warnung. Der gesamte Zustand der Anwendung wird durch CSS-Klassen im DOM verwaltet — kein Framework, kein Build-Step.

**Learning Outcomes**

Zustandsmodell: Erkenntnis, dass "Zustand" für einen PoC kein eigenes State-Objekt braucht — der DOM selbst ist der Zustandsspeicher.

Flow-Implementierung: Die direkte Überführung eines Mermaid-Diagramms (Artifact 2) in JavaScript-Funktionen — jede Funktion entspricht einem oder mehreren Flow-Schritten.

Intentionales Weglassen: Die bewusste Entscheidung, Features *nicht* zu implementieren (z.B. echte Sortierung), ist genauso wichtig wie das, was implementiert wird.

---

## Artifact

**Dokumentation:** [Artifact 4 — Logic & State](../artifacts/artifact-4/artifact-4-logic-and-state.md)

**Build:**

**Interface:** [artifacts/artifact-4/src/interface.html](../artifacts/artifact-4/src/interface.html)

**Styles:** [artifacts/artifact-4/src/style.css](../artifacts/artifact-4/src/style.css)

**Logic:** [artifacts/artifact-4/src/logic.js](../artifacts/artifact-4/src/logic.js)

Die technische Umsetzung konsolidiert die vier separaten HTML-Seiten aus Artifact 3 in eine Single-Page Application. `showScreen(id)` ist die einzige Funktion, die Screen-Übergänge steuert. `selectTarget()` implementiert den Zwei-Schritt-Flow aus Artifact 2 (Schritte G → H → I): erst Ziel wählen, dann Routen berechnen. Die SVG-Karte hat klickbare Bereiche mit transparenten Hit-Areas für zuverlässige Touch-Interaktion.

**Focus:**

Der Fokus liegt auf der Nachvollziehbarkeit von Zustandsübergängen. Jeder Screen-Wechsel ist eine bewusste Nutzeraktion — die App zeigt keine Information automatisch. Die Gefahren-Warnung erscheint nur bei der Hochrisiko-Route (Nebelmoor) oder bei direktem Tap auf eine Gefahrenzone — kein Alarm-Flooding.

---

## AI Assistance

Die KI hat in diesem Kapitel eine stärker beratende Rolle übernommen als in Kapitel 3. Wir haben nicht nur Code generiert, sondern auch Architekturentscheidungen gemeinsam durchdacht.

Vorgehensweise: Wir haben der KI den bestehenden Flow (Artifact 2) und die bestehenden Screens (Artifact 3) als Kontext gegeben und gefragt, wie man mit minimalem JavaScript einen navigierbaren Zustand aufbaut.

Erfahrung: Die KI hat die Entscheidung für DOM-als-Zustand (CSS-Klassen statt State-Objekt) begründet und erklärt, wann man zu einem echten State-Management wechseln würde — das hat unser konzeptionelles Verständnis vertieft.

Entscheidung: Wir haben explizit auf ein Framework verzichtet und die KI gebeten, nur Vanilla JS zu verwenden. Das zwang uns, die Logik selbst zu verstehen, statt sie hinter Abstraktionen zu verbergen.

---

## Lessons Learned

DOM als Zustandsspeicher: Für einen PoC reicht es, den Zustand direkt in CSS-Klassen zu speichern. Eine separate State-Variable wäre Overengineering — sie würde erst dann Sinn ergeben, wenn mehrere unabhängige UI-Teile auf denselben Zustand reagieren müssen.

Single-Page statt Multi-Page: Die Konsolidierung von vier HTML-Dateien in eine hat den Demo-Flow entscheidend verbessert. Kein Page-Reload unterbricht die Präsentation — `showScreen()` ist deterministisch und leicht erklärbar.

Bewusstes Weglassen: Kein echtes Sortieren, keine Screen-Transitions, kein persistenter Zustand. Jede dieser Entscheidungen ist begründet — nicht aus Faulheit, sondern weil ein PoC nur zeigen muss, dass das Konzept funktioniert, nicht dass die Implementierung produktionsreif ist.
