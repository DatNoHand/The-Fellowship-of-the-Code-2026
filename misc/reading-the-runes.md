# Reading the Runes – Code Analysis

## Systembeschreibung

Das Mini-Modul soll als einfache Anzeige- und Tracking-Schnittstelle für Essensrationen fungieren (im Grunde eine spezialisierte Taschenrechner-Logik). Nutzer können in einem Eingabefeld eine Menge eingeben und diese über den Button „Add Rations“ zum Gesamtbestand hinzufügen oder über „Eat Rations“ abziehen. Eine Statuszeile zeigt dynamisch den aktuellen Bestand an. Zudem gibt es eine Validierung: Es darf nicht mehr gegessen werden, als aktuell da ist.

Verbesserung: [reading_the_runes.html](reading-the-runes.html)

## Identifizierte Probleme & Erklärung

### Problem 1: Falscher Datentyp (Textverkettung statt Addition)

**Wo es auftritt:** 
Bei der initialen Definition der Variable (let rations = "10";) und der Verarbeitung des Eingabewerts (const value = amountInput.value;).
**Soll-Verhalten:** 
Die Anwendung muss sowohl den Startwert als auch die Eingabe als Zahlen behandeln, damit $10 + 2 = 12$ ergibt.
**Ist-Verhalten:** 
Da JavaScript den Wert aus dem Eingabefeld standardmäßig als Text (String) liest, bewirkt das +-Zeichen eine Textaneinanderreihung statt einer mathematischen Addition. Aus „10“ und „2“ wird der Text "102". Das Subtrahieren („Eat Rations“) funktionierte nur deshalb fehlerhaft, weil JavaScript bei einem --Zeichen versucht, den Text automatisch in eine Zahl umzuwandeln. Das sorgt für eine völlig inkonsistente Datenstruktur.

---

### Problem 2: Falsche Reihenfolge in der Programmlogik (State Management)

**Wo es auftritt:** 
Innerhalb des Event-Listeners für den eatButton.

**Soll-Verhalten:** 
Die Statusanzeige im UI darf erst aktualisiert werden, nachdem geprüft wurde, ob genug Rationen da sind, und nachdem die Subtraktion durchgeführt wurde.

**Ist-Verhalten:** 
Die Funktion updateStatus() wurde aufgerufen, bevor die Validierung und die eigentliche Berechnung (rations = rations - value;) stattfanden.

---

### Problem 3: Inkonsistente UI-Initialisierung (Statisches HTML vs. Dynamischer Zustand)

**Wo es auftritt:** 
Im HTML-Code war die Zeile hartcodiert: Rations available: 10

**Soll-Verhalten:** 
Das UI sollte immer exakt das widerspiegeln, was im JavaScript-Code als Zustand hinterlegt ist.

**Ist-Verhalten:** 
Beim Neuladen der Seite wurde starr die „10“ angezeigt. Würde man den Startwert im JavaScript ändern, würde die Anzeige dem Nutzer so lange falsche Daten anzeigen, bis er das erste Mal auf einen Button klickt.

---

### Warum die Probleme wichtig sind (Auswirkungen auf System & UX)

**Zerstörung des Nutzervertrauens (UX):** 
Wenn eine App anzeigt, dass aus 10 Rationen plötzlich "102" werden, wirkt das System für den Nutzer sofort kaputt oder fehlerhaft.

**Sicherheits- und Logikrisiken in größeren Systemen:** 
In einem echten Projekt (z. B. einem Warenwirtschaftssystem oder einer Banking-App) sind solche Reihenfolge-Fehler kritisch. Wenn das UI aktualisiert wird, bevor die Validierung abgeschlossen ist, kann das zu schwerwiegenden Logikfehlern oder Exploits (z. B. unberechtigten Abbuchungen) führen.

**Schlechte Wartbarkeit (Technical Debt):** 
Generische Variablennamen wie const value in mehreren Funktionen machen den Code für neue Entwickler schwer lesbar. Zudem sorgt das harte Reinschreiben von Werten ins HTML für eine starre Kopplung: Ändert sich die Logik, muss man HTML und JS anfassen – eine klassische Fehlerquelle.

---

### Beschreibung der Änderungen (Lösungen)

**Explizite Typumwandlung:** 
Der Startwert wurde als echte Zahl definiert (let rations = 10;) und das Eingabefeld im HTML auf type="number" umgestellt. Im Code wird die Eingabe nun mit Number() explizit konvertiert:

const addRations = Number(amountInput.value);

const eatRations = Number(amountInput.value);

**Sprechende Variablennamen:** 
Das ungenaue value wurde durch addRations bzw. eatRations ersetzt, um die Lesbarkeit des Codes zu erhöhen.

**Korrektur der Reihenfolge:** 
updateStatus() wurde im eatButton-Handler ganz nach unten verschoben, sodass die Anzeige erst aktualisiert wird, wenn die Berechnung erfolgreich war.

**Dynamisches UI:** 
Der statische Text wurde aus dem HTML-Tag <p id="status"></p> entfernt. Stattdessen wird updateStatus() direkt beim Laden der Seite über JavaScript aufgerufen, um die UI dynamisch und fehlerfrei zu initialisieren.

---

### KI-Reflexion (AI Assistance Reflection)

**Was wurde die KI gefragt?:** 
Wir haben die KI genutzt, um zu analysieren, warum das Eingabefeld die Zahlen als Text aneinanderhängt ("102") und warum bei der Subtraktion die Anzeige immer einen Schritt hinterherhinkte.

**Was war hilfreich?:** 
Die KI hat sofort erkannt, dass JavaScript Eingabewerte standardmäßig als Strings interpretiert, und hat uns präzise auf den chronologischen Fehler bei der Platzierung von updateStatus() hingewiesen.

**Was fehlte / Was haben wir selbst entschieden?:** 
Die KI schlägt oft nur den schnellsten syntaktischen Fix vor. Wir mussten selbst entscheiden, die Variablen sinnvoll umzubenennen (addRations, eatRations), um sauberen Code zu schreiben. Auch das Bereinigen des statischen HTML-Texts und die saubere Trennung von Logik und UI haben wir eigenständig umgesetzt, um eine saubere Software-Architektur zu gewährleisten.
