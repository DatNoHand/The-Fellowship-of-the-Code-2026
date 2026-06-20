# The Red Book of Westmarch - Chapter 5: The Fellowship, Complete

*`„Nicht alle, die wandern, sind verloren." ~J.R.R. Tolkien`*

**Table of Contents**

- [The Red Book of Westmarch - Chapter 5: The Fellowship, Complete](#the-red-book-of-westmarch---chapter-5-the-fellowship-complete)
  - [Summary](#summary)
  - [Artifact](#artifact)
  - [AI Assistance](#ai-assistance)
  - [Lessons Learned](#lessons-learned)
  - [Reflection — How Understanding, Scope and Decisions Evolved](#reflection--how-understanding-scope-and-decisions-evolved)

---

## Summary

Dieses Kapitel schließt die erste Iteration des Fellowship Companion ab. Statt eine weitere Facette der Navigation zu vertiefen, wird eine zweite Capability aus Artifact 1 — die **Wissensressource** — tatsächlich gebaut: Das "Lexikon", das seit Artifact 3 als gesperrte Modul-Kachel im Launcher angekündigt war, wird in Artifact 5 eingelöst. Zusätzlich bekommt das System seine erste Verbindung nach außen: eine echte Wetter-API beeinflusst, welche Gefahrenstufe angezeigt und welcher Lexikon-Eintrag empfohlen wird.

**Learning Outcomes**

System-Integration: Erkenntnis, dass "Integration" hier nicht heißt, alles auf einmal zu bauen, sondern gezielt zu zeigen, wie ein neues Stück an bestehende Stücke andockt (Launcher-Muster wiederverwendet, Cross-Link aus der Gefahren-Warnung).

Externe Abhängigkeit: Erste Begegnung mit einem System-Teil, dessen Zustand nicht selbst kontrolliert wird — inklusive des einzigen bewusst geschriebenen Fehlerfalls im gesamten Projekt (Netzwerk-Fehler beim Wetter-Fetch).

Kontrollierte Erweiterung: Eine Extension zu wählen, die Bedeutung statt Optik verändert, zwingt dazu, genau zu benennen, *welches* Verhalten sich *wie* ändert — nicht nur "es sieht moderner aus".

---

## Artifact

**Dokumentation:** [Artifact 5 — System-Integration & Extension](../artifacts/artifact-5/artifact-5-integration-extension.md)

**Interface:** [artifacts/artifact-5/src/interface.html](../artifacts/artifact-5/src/interface.html)

**Styles:** [artifacts/artifact-5/src/style.css](../artifacts/artifact-5/src/style.css)

**Logic:** [artifacts/artifact-5/src/logic.js](../artifacts/artifact-5/src/logic.js)

**System Flow:** [artifacts/artifact-5/src/flowchart-system.mermaid.md](../artifacts/artifact-5/src/flowchart-system.mermaid.md)

**Wireframe:** [artifacts/artifact-5/src/wireframe-system.png](../artifacts/artifact-5/src/wireframe-system.png)

Die Lexikon-Kachel im Launcher wechselt von `locked` zu `active` und nutzt dasselbe Button-Markup wie die Karte-Kachel. Zwei neue Screens (`screen-lexikon`, `screen-lexikon-detail`) folgen demselben Single-State-Pattern wie alle bisherigen Screens. Die Wetter-Extension besteht aus einem einzigen `fetch()`-Aufruf gegen Open-Meteo, dessen Ergebnis zwei bestehende Screens beeinflusst, statt einen neuen Modul-Pfad zu öffnen.

**Focus:**

Der Fokus liegt auf Nachvollziehbarkeit der Verbindungen, nicht auf der Menge des neuen Codes. Jede neue Verbindung — Launcher→Lexikon, Warnung→Lexikon, Wetter→Navigation, Wetter→Lexikon — ist einzeln im System-Flow und in der Design Rationale benannt und begründet.

---

## AI Assistance

Die KI hat in diesem Kapitel eine andere Rolle als zuvor: nicht mehr "wie baue ich diesen einen Screen", sondern "wie zeige ich, dass ein bestehendes System um genau ein Stück erweiterbar ist, ohne es umzubauen". Das verlangte zuerst, den aktuellen Stand (Artifact 1, 2, 4) korrekt zu rekonstruieren, bevor überhaupt etwas neues entworfen wurde.

Vorgehensweise: Die KI hat zunächst die bestehenden Artefakte und den aktuellen Interface-Code gelesen, um die bereits angelegte, aber gesperrte Lexikon-Kachel zu finden — diese Beobachtung hat die Wahl der Capability bestätigt, statt sie zu erfinden.

Erfahrung: Bei der Wahl der Extension hat die KI explizit gegen reine Optik-Bibliotheken argumentiert (z. B. Bootstrap) und für eine echte, schlüssellose API, weil die Aufgabenstellung eine Verhaltens- statt Erscheinungsänderung fordert. Das hat die Anforderung selbst greifbarer gemacht.

Entscheidung: Die Entscheidung, Oxford (Tolkiens realer Wohnort) als Koordinate für die Wetterdaten zu nutzen, kam von der KI als erklärbare, nicht-arbiträre Wahl — wurde aber bewusst übernommen, weil sie sich in der Design Rationale stimmig begründen lässt.

---

## Lessons Learned

Locked-Module sind Commitments: Eine als "Bald verfügbar" markierte Kachel ist kein beiläufiges UI-Detail — sie ist ein sichtbares Versprechen an das eigene System, das später eingelöst werden muss. Das hat die Auswahl der Capability für Artifact 5 stark vereinfacht.

Extensions brauchen einen Verhaltens-Test: Bevor eine Extension als "meaningful" zählt, muss man konkret sagen können, welcher Screen sich *wie* anders verhält. Reine Lookup-Anreicherung (nur Text anzeigen) hätte diesen Test nicht bestanden — die Routendarstellung musste sich sichtbar ändern.

Fehlerbehandlung ist kein Standard, sondern eine Entscheidung: Im gesamten PoC gibt es genau eine Stelle mit Error-Handling — den Wetter-Fetch. Das ist beabsichtigt: Validierung gehört an Systemgrenzen, nicht überall.

---

## Reflection — How Understanding, Scope and Decisions Evolved

**Phase 1 vs. jetzt:** In Artifact 1 war "Wissensressource" eine von vier gleichrangigen, abstrakten Capabilities auf einer Liste — keine davon hatte Vorrang oder eine konkrete Form. Heute ist sie der zweite tatsächlich gebaute Slice eines Systems, das erkennbar nach demselben Muster wächst: ein Modul wird zuerst als Versprechen im Launcher sichtbar, später eingelöst. Das war zu Beginn nicht geplant — es hat sich aus der wiederholten Anwendung des gleichen PoC-Patterns über drei Artefakte hinweg ergeben.

**Scope:** Der Scope ist über die Phasen hinweg eher geschrumpft als gewachsen — und das war richtig. Jedes Artefakt hat sich auf eine einzige Capability bzw. einen einzigen Erweiterungsschritt konzentriert, statt mehrere gleichzeitig zu verfolgen. Artifact 5 hätte versuchen können, alle vier Capabilities zu "vervollständigen" — die bewusste Beschränkung auf eine kontrollierte Erweiterung plus eine externe Verbindung hat stattdessen erzwungen, genau zu erklären, *warum* nicht mehr gebaut wurde, was am Ende aussagekräftiger ist als mehr unbegründeter Code.

**Entscheidungen:** Die wichtigste Verschiebung: in frühen Phasen wurden Entscheidungen vor allem mit interner Konsistenz begründet ("passt zum Theme", "entspricht Artifact 2"). In Artifact 5 kam erstmals eine externe, nicht kontrollierte Größe ins System — und Entscheidungen mussten zusätzlich gegen reale Unsicherheit abgewogen werden (Was, wenn die API nicht antwortet? Was, wenn die Koordinate nicht "echtes" Mittelerde ist?). Das ist der Punkt, an dem sich "eine App bauen" am deutlichsten von "ein System integrieren" unterscheidet: Integration bedeutet, Verantwortung für Dinge zu übernehmen, die man nicht selbst kontrolliert.

**Was das für die nächste Iteration bedeutet:** Gefahrenerkennung und Gruppenkoordination bleiben bewusst offen. Würde man sie als Nächstes bauen, ist jetzt ein Muster etabliert, dem man folgen kann: zuerst die Capability isoliert demonstrieren (wie Artifact 3/4 für Navigation, jetzt für Wissensressource), dann erst über eine kontrollierte Erweiterung querverbinden — nicht andersrum.
