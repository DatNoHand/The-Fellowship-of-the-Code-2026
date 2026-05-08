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
Dieses Kapitel konzentriert sich auf die visuelle Repräsentation und strukturelle Implementierung der 2.5D-Karte. Nachdem die Logik im Wireframe festgelegt wurde, ging es nun darum, die Benutzeroberfläche in konkreten, semantischen Code zu übersetzen. Es zeigt, wie wir durch HTML und CSS eine räumliche Tiefe erzeugt haben, um die Navigation der Gefährten intuitiv und sicher zu gestalten.

**Learning Outcomes**
Semantik: Verständnis dafür, wie HTML-Struktur (Header, Main, Section) die Hierarchie des Interfaces ohne visuelle Dekoration ausdrückt.

Layout-Logik: Anwendung von CSS (Flexbox, Gradients und SVG) zur Erzeugung einer isometrischen 2.5D-Perspektive.

Intentional Design: Die Erkenntnis, dass jedes visuelle Element (z. B. der Nazgûl-Alert) direkt den System-Nutzen der Gefahrenvermeidung unterstützen muss.

---

## Artifact

**Dokumentation:** [Artifact 3 — Representation](../artifacts/artifact-3/artifact-3-representation.md)

**Interface:** [interface.html](../artifacts/artifact-3/src/interface.html) · [style.css](../artifacts/artifact-3/src/style.css)

**Build:**
Statische Single-Page-App in HTML/CSS mit JavaScript-Navigation zwischen vier Screens: Launcher, Kartenansicht (isometrische SVG-Karte), Routenvergleich und Gefahren-Warnung als Bottom Sheet.

**Focus:**
Hier ist der überarbeitete Entwurf für dein Red Book, exakt im Format des von dir bereitgestellten Templates und angepasst an eure spezifische Capability (2.5D Karte) sowie eure Gruppe IsengardInnovations.

---

## AI Assistance
Wir haben bei diesem Meilenstein fast den gesamten Code über die KI generieren lassen. Dabei haben wir gelernt, dass die Qualität des Ergebnisses extrem davon abhängt, wie präzise man die Anweisungen gibt.

Vorgehensweise: Wir mussten der KI ganz genau sagen, was wir wollen – von der Struktur der SVG-Elemente bis hin zu den spezifischen CSS-Farben aus unserem Design-Konzept.

Erfahrung: Wenn unsere Prompts detailliert genug waren, konnte die KI die komplexe 2.5D-Logik und die Animationen (wie das Blinken der Gefahrenmarker) fehlerfrei umsetzen.

Entscheidung: Wir haben die Rolle der "Architekten" übernommen, die das Ziel vorgeben, während die KI die Rolle des "Maurers" übernahm, der den eigentlichen Code schreibt.

---

## Lessons Learned
Präzision führt zum Ziel: Die größte Lerneffekt war, dass man keine Programmier-Experten sein muss, um gute Ergebnisse zu erzielen, solange man der KI extrem präzise Anweisungen geben kann.

Struktur vor Code: Ohne unser fertiges Wireframe hätten wir der KI nicht sagen können, was sie bauen soll. Die konzeptionelle Vorarbeit war also der wichtigste Schritt.

Alignment im Team: In unserer Gruppe IsengardInnovations haben wir gelernt, dass wir uns erst über das "Was" einig sein müssen, bevor wir die KI das "Wie" (den Code) erledigen lassen.
