```mermaid
flowchart TD
    A[Hauptmenü: Launcher] --> B[Nutzer wählt Modul 'Lexikon']
    B --> C[Lexikon-Liste: alle Wissens-Einträge]
    C --> D[Nutzer tippt '+ Eintrag hinzufügen']
    D --> E[Formular: Name, Kategorie, Kurzbeschreibung, Beschreibung]
    E --> F{Pflichtfelder * ausgefüllt?}

    F -- Nein --> K[Hinweis: Pflichtfelder fehlen]
    K --> E

    F -- Ja --> G[Nutzer tippt 'Eintrag speichern']
    G --> H[Eintrag wird in LocalStorage gespeichert]
    H --> I[Lexikon-Liste wird neu geladen]
    I --> J[Neuer Eintrag erscheint mit Tag 'Eigener Eintrag']
```

**Lesart:** Der Flow zeigt den vollständigen Weg eines Nutzers vom Hauptmenü bis zum selbst angelegten Lexikon-Eintrag — den einzigen Schreibzugriff im gesamten System. Die einzige Verzweigung ist die Formularvalidierung (Name + Beschreibung sind mit * markierte Pflichtfelder); bei fehlenden Angaben bekommt der Nutzer erst einen Hinweis, statt direkt und ohne Feedback ins Formular zurückgeschickt zu werden. Nach dem Speichern landet der Nutzer wieder auf der Lexikon-Liste, in der der neue Eintrag dank "Eigener Eintrag"-Tag von den mitgelieferten Einträgen unterscheidbar ist.
