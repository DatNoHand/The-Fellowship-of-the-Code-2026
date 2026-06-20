# Automatisierung (Low-Code / No-Code Side Quest)

## Beschreibung meines Automation-Workflows

Um zu testen, was außerhalb von klassischem, handgeschriebenem Code möglich ist, habe ich einen automatisierten Workflow auf der Microsoft Power Automate Plattform gebaut. Mein Ziel war es, ein System zu erstellen, das vollautomatisch auf ein externes Ereignis reagiert und eine passende Antwort im Der Herr der Ringe-Stil ausgibt.

Wie in meinem Screenshot zu sehen ist, ist der Flow wie folgt aufgebaut:

![Power Automate 1](Power%20Automate%202.png)

![Power Automate 2](Power%20Automate%201.png)

### Trigger („Wenn ich erwähnt (@mentioned) werde")

Das System läuft komplett im Hintergrund und überwacht die eingehenden Microsoft Teams in unserem Application Gruppenchat. Sobald mich jemand in einem Chat erwähnt, wird der Workflow automatisch gestartet.

---

### Kontrollstruktur („For each")

Power Automate bettet die nachfolgende Aktion automatisch in eine Schleife ein, um die Metadaten des Triggers sicher zu verarbeiten.

---

### Aktion („Nachricht in einem Chat oder Kanal veröffentlichen")

Der Flow greift sich die dynamische Konversations-ID des ursprünglichen Chats ab und postet vollautomatisch eine Antwort genau in diesen Chat zurück.

---

## Thematische Umsetzung (Herr der Ringe)

Wenn mich jemand im Chat erwähnt, reagiert mein Bot im Stil von Gandalf dem Grauen mit folgender englischer Nachricht:

„I have heard your summons, traveller from afar. Tell me: is this matter of grave importance to the fate of Middle-earth, or do you merely seek cheap fireworks?"

---

## Fazit

Der Flow läuft nach dem Setup komplett von allein, hat einen klaren Auslöser (die Erwähnung) mit einem klaren Ergebnis (die Antwort) und bringt den gewünschten LotR-Vibe mit rein. Es war echt cool zu sehen, wie schnell man so eine funktionierende Integration ohne eine einzige Zeile Code zusammenklicken kann!
