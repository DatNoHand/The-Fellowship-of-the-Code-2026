document.addEventListener("DOMContentLoaded", () => {
  // 1. Elemente aus dem DOM holen
  const mapSvg = document.querySelector(".map-svg");
  const tapHint = document.querySelector(".map-tap-hint");
  const alertText = document.querySelector(".nazgul-text span");
  const alertContainer = document.querySelector(".nazgul-alert");
  const ctaSub = document.querySelector(".map-cta-sub");

  // 2. Event-Listener für die gesamte SVG-Karte
  mapSvg.addEventListener("click", (e) => {
    // Klick-Ziel bestimmen
    const target = e.target;
    
    // Standard-Text für den Tipp-Hinweis zurücksetzen
    tapHint.textContent = `Koordinaten getippt: X=${Math.round(e.offsetX)}, Y=${Math.round(e.offsetY)}`;

    // FALL A: Klick auf das Ziel (BREE)
    if (target.closest('text') && target.textContent.includes("BREE") || target.closest('rect[fill="#1a2a10"]')) {
      ctaSub.textContent = "Route nach Bree wird berechnet... Sichersten Pfad wählen!";
      ctaSub.style.color = "#5ec994";
      return; // Funktion hier abbrechen
    }

    // FALL B: Klick auf eine Nazgûl-Gefahrenzone
    if (target.classList.contains("danger-blink") || target.getAttribute("fill") === "#c0352a") {
      // Visuelles Highlight für die Warnung unten
      alertContainer.style.background = "rgba(139, 26, 26, 0.4)";
      alertText.innerHTML = "<strong>Achtung!</strong> Suchtrupp der Nazgûl kreuzt die Hauptstraße. Weiche nach Süden aus!";
      setTimeout(() => alertContainer.style.background = "", 1000);
      return;
    }

    // FALL C: Klick auf Frodo (User Position)
    if (target.closest('text') && target.textContent.includes("FRODO") || target.getAttribute("fill") === "#f0c060") {
      ctaSub.textContent = "Frodo trägt den Ring. Bedrohung steigt!";
      ctaSub.style.color = "#f0c060";
      return;
    }

    // FALL D: Klick auf Samweis
    if (target.closest('g') || target.textContent.includes("Samweis")) {
      const isSam = target.textContent.includes("Samweis") || target.textContent === "S";
      if (isSam) {
        tapHint.textContent = "Samweis: 'Ich verlasse Frodo nicht, Herr!'";
        return;
      }
    }
  });
});
