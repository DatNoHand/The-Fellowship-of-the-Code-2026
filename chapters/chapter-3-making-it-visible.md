# The Red Book of Westmarch - Chapter 3: Making it visible

*`„Möge es dir ein Licht sein an dunklen Orten, wenn alle anderen Lichter ausgehen.“ ~Galadriel`*

**Table of Contents**

- [The Red Book of Westmarch - Chapter 3: Making it visible](#the-red-book-of-westmarch---chapter-3-making-it-visible)
  - [Summary](#summary)
  - [Artifact](#artifact)
  - [AI Assistance](#ai-assistance)
  - [Lessons Learned](#lessons-learned)

---

## Summary

Dieses Kapitel konzentriert sich auf die Konzeptionsphase und das UI-Design des Fellowship Companions.
Bevor der erste Stein gemauert wurde (Code), mussten wir die Pfade kartografieren und uns in die Köpfe unserer Gefährten begeben. Es zeigt, wie wir durch Flowcharts und Wireframes festgelegt haben, welche Wege ein Nutzer gehen kann und wie die Gefährten-App optisch Gestalt annimmt.

**Learning Outcomes**

Georg: Verstehen, wie unser Feature visuell aufgebaut sein soll und welcher konkrete Use-Case dahintersteckt.

Methodik: Anwendung von Mermaid.ai für die Logik; KI inkl. Gandalf AI für die Wireframes und als strategischer Ratgeber.

Reflexion: Erkenntnis über die enge Verzahnung von Logik (Flowchart) und Interface (Wireframe).

---

## Artifact

**Dokumentation:** [Artifact 3 — Representation](../artifacts/artifact-3/artifact-3-representation.md)

**Interface:** [interface.html](../artifacts/artifact-3/src/interface.html) · [style.css](../artifacts/artifact-3/src/style.css)

**Build:**

Statische Single-Page-App in HTML/CSS mit JavaScript-Navigation zwischen vier Screens: Launcher, Kartenansicht (isometrische SVG-Karte), Routenvergleich und Gefahren-Warnung als Bottom Sheet.

**Focus:**

Der Fokus dieses Slices liegt auf der bewussten Entscheidungsfindung des Nutzers in einer feindseligen Umgebung. Es geht nicht nur darum, von Punkt A nach Punkt B zu kommen, sondern die Abwägung zwischen Effizienz (Distanz) und Sicherheit (Gefahrenvermeidung) systemseitig zu unterstützen.

---

## AI Assistance

Die KI hat uns am Anfang echt eine gute Grundlage geboten, um überhaupt erst mal einen Startpunkt für den Flowchart und das Wireframe zu haben. Ohne die Hilfe hätten wir wahrscheinlich ewig gebraucht, um die Capability in ein logisches Feature zu übersetzen. Aber wir haben schnell gemerkt, dass wir das nicht einfach so stehen lassen konnten: Wir mussten an extrem vielen Stellen unseren eigenen Feinschliff einbauen, weil die KI oft zu kompliziert gedacht hat oder das Design nicht zur Logik passte. Wir haben dann bewusst viele Sachen wieder rausgeworfen oder angepasst, damit jeder Button im Wireframe auch wirklich eine Entsprechung im Flowchart hat. Diese Abstimmung zwischen dem visuellen Entwurf und dem tatsächlichen Ablauf mussten wir am Ende komplett selbst machen, damit das Ganze für unser Projekt auch wirklich Sinn ergibt.

---

## Lessons Learned

Die Erstellung von Flowcharts und Wireframes mit KI-Unterstützung war für uns eine extrem steile Lernkurve. Zu Beginn war es ein echter Schock, wie viel man eigentlich dokumentieren und durchdenken muss, noch bevor man überhaupt mit dem eigentlichen Coden anfängt. Die größte Challenge war dabei das Alignment: Wir haben schmerzhaft gelernt, dass Flowchart und Wireframe exakt zusammenpassen müssen – jeder noch so kleine „Extra-Button“, den die KI uns in das Wireframe gebastelt hat, bedeutete sofort einen weiteren Pfad im Flowchart, den wir logisch abdecken mussten. Das hat die Dokumentation schnell aufgebläht. Unsere wichtigste Erkenntnis ist daher, dass man sich im Team viel früher und präziser absprechen muss, wie ein Feature am Ende wirklich aussehen soll. Wir haben gelernt, dass die KI zwar eine super Grundlage liefert, man aber ständig selbst den Feinschliff übernehmen muss, um nicht den Fokus zu verlieren und die Logik konsistent zu halten.