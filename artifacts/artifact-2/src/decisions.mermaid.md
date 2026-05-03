flowchart TD
    A[Nutzer öffnet App] --> B[Launcher: Modulübersicht]
    B --> C[Nutzer wählt Modul 'Karte']
    C --> D[2.5D-Kartenansicht wird geladen]
    D --> E[Karte zeigt eigenen Charakter, Gruppe, Nazgûl-Sichtungen]
    E --> F[Nutzer tippt auf Zielpunkt auf der Karte]
    F --> G{Zielpunkt in bekanntem Terrain?}
 
    G -- Nein --> H[Hinweis: Gebiet nicht kartiert - kein Routenvorschlag möglich]
    H --> E
 
    G -- Ja --> I[System berechnet mögliche Routen]
    I --> J{Routen gefunden?}
 
    J -- Nein --> K[Hinweis: Kein begehbarer Weg bekannt]
    K --> E
 
    J -- Ja --> L[Routenvergleich: Liste mit Distanz, Schwierigkeit, Gefahrenstufe]
    L --> M[Nutzer kann Sortierung ändern: Gefahr / Distanz / Schwierigkeit]
    M --> N[Nutzer wählt eine Route]
    N --> O{Gefahrenstufe hoch?}
 
    O -- Ja --> P[Warnung: Gefahrendetails anzeigen]
    P --> Q{Nutzer bestätigt Route trotz Gefahr?}
    Q -- Nein --> L
    Q -- Ja --> R[Route wird als aktive Route gesetzt]
 
    O -- Nein --> R
 
    R --> S[Karte zeigt gewählte Route mit Wegpunkten]
    S --> T[Gruppenmitglieder erhalten Routenupdate]