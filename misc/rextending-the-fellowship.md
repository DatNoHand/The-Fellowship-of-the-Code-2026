# Automatisierung (Low-Code / No-Code Side Quest)

## Beschreibung unseres Automation-Workflows

Um zu testen, was außerhalb von klassischem, handgeschriebenem Code möglich ist, haben wir einen automatisierten Workflow auf der Microsoft Power Automate Plattform gebaut. Unser Ziel war es, ein System zu erstellen, das vollautomatisch auf ein externes Ereignis reagiert und eine passende Antwort im Der Herr der Ringe-Stil ausgibt.

Wie in unseren Screenshots zu sehen ist, ist der Flow wie folgt aufgebaut:

![Power Automate 1](Power%20Automate%202.png)

![Power Automate 2](Power%20Automate%201.png)

### Trigger („Wenn man erwähnt (@mentioned) wird")

Das System läuft komplett im Hintergrund und überwacht die eingehenden Microsoft Teams in unserem Application Gruppenchat. Sobald jemand in einem Chat erwähnt wird, wird der Workflow automatisch gestartet.

---

### Kontrollstruktur („For each")

Power Automate bettet die nachfolgende Aktion automatisch in eine Schleife ein, um die Metadaten des Triggers sicher zu verarbeiten.

---

### Aktion („Nachricht in einem Chat oder Kanal veröffentlichen")

Der Flow greift sich die dynamische Konversations-ID des ursprünglichen Chats ab und postet vollautomatisch eine Antwort genau in diesen Chat zurück.

---

## Thematische Umsetzung (Herr der Ringe)

Wenn jemand im Chat erwähnt wird, reagiert unser Bot im Stil von Gandalf dem Grauen mit folgender englischer Nachricht:

„I have heard your summons, traveller from afar. Tell me: is this matter of grave importance to the fate of Middle-earth, or do you merely seek cheap fireworks?"

---

## Fazit

Der Flow läuft nach dem Setup komplett von allein, hat einen klaren Auslöser (die Erwähnung) mit einem klaren Ergebnis (die Antwort) und bringt den gewünschten LotR-Vibe mit rein. Es war echt cool zu sehen, wie schnell man so eine funktionierende Integration ohne eine einzige Zeile Code zusammenklicken kann!

---

# Low-Code Game (Microsoft MakeCode Arcade)

## Beschreibung des Spiels

Als Low-Code-Game haben wir einen Gimli-Biersimulator auf der Microsoft MakeCode Arcade Plattform gebaut. Der Spieler tritt gegen Gimli an – den legendären Zwerg der Gefährten, bekannt für seine Unverwüstlichkeit und seinen Durst. Ziel ist es, Gimli im Trinkwettbewerb zu besiegen, bevor man selbst das Bewusstsein verliert.

**Link zum Spiel:** [Gimli-Biersimulator](https://arcade.makecode.com/S70219-14902-88654-60086)

## Thematische Umsetzung (Herr der Ringe)

Die LotR-Inspiration ist direkt: Gimli ist als Charakter fest im Kanon verankert und sein Trinkduell mit Legolas in den Filmen ist eine der bekanntesten Szenen. Das Spiel greift genau diesen Moment auf und macht ihn interaktiv spielbar – mit minimalen Mitteln, aber erkennbarem Thema.

## Reflexion

**Was war das Ziel?**

Erkunden, was mit einer Low-Code-Plattform ohne klassisches Programmieren möglich ist, und dabei trotzdem etwas Funktionierendes und LotR-Inspiriertes zu bauen.

**Was hat funktioniert?**

MakeCode Arcade hat einen sehr niedrigen Einstieg: Ohne tiefes Programmierwissen lässt sich schnell ein lauffähiges Spiel zusammenbauen. Der visuelle Editor macht es möglich, Spiellogik per Drag-and-drop zu definieren.

**Was haben wir gelernt?**

Auch „No-Code" ist eine Form von Software-Engineering. Die Plattform abstrahiert die technischen Details, aber das Denken in Zuständen, Triggern und Reaktionen bleibt dasselbe wie bei handgeschriebenem Code – nur auf einem höheren Level.
