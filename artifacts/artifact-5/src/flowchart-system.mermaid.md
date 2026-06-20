```mermaid
flowchart TD
    L[Launcher: Modulübersicht]

    L --> NAV[Karte & Navigation]
    L --> GEF[Gefahrenerkennung<br/><i>Bald verfügbar</i>]
    L --> GRP[Gruppenkoordination<br/><i>Bald verfügbar</i>]
    L --> LEX[Lexikon — Wissensressource]

    NAV --> ROUTEN[Routenvergleich]
    ROUTEN --> WARNUNG[Gefahren-Warnung]
    WARNUNG -- "Mehr im Lexikon" --> LEX

    LEX --> LEXDETAIL[Lexikon-Detail]
    LEX --> LEXNEU[Lexikon — Neuer Eintrag]
    LEXNEU --> LEX

    WETTER[("Externe Wetter-API<br/>Open-Meteo, Oxford")]
    WETTER -. "Gefahrenstufe-Annotation" .-> ROUTEN
    WETTER -. "Empfehlung heute" .-> LEX

    style WETTER fill:#1a2a10,stroke:#5ec994,color:#5ec994
    style LEX fill:#1a2a10,stroke:#5ec994,color:#5ec994
    style GEF stroke-dasharray: 4 3
    style GRP stroke-dasharray: 4 3
```

**Lesart:** Vier Module hängen am Launcher als gemeinsamem Einstiegspunkt. Navigation und Lexikon sind implementiert (Artifact 5), Gefahrenerkennung und Gruppenkoordination bleiben angekündigte, noch nicht gebaute Module (gestrichelt). Die Gefahren-Warnung — Teil der Navigation — verweist gezielt in das Lexikon, statt die beiden Capabilities isoliert zu lassen. Innerhalb des Lexikons führt der Eintrag "Neuer Eintrag" zurück in die Lexikon-Liste, nicht zu einem neuen Modul — er ist eine Erweiterung der bestehenden Capability, kein eigener Knoten. Die externe Wetter-API ist kein eigenes Modul, sondern ein Signal, das in zwei bestehende Capabilities einspeist (Routenanzeige, Lexikon-Empfehlung) — dargestellt als externer Knoten mit gepunkteten Einfluss-Kanten statt einer eigenen Navigationskante.
