(function() {
    /**
     * ==================================================
     *  0. HELPER VARIABLES, FUNCTIONS & FORCE OVERRIDES
     * ==================================================
     */
    let isWidgetOpen = false; // tracks panel open/close state
    let currentFontScaleClass = ""; // track which font-scale class is active
    let speechSynthesisUtterance = null;
    const synth = window.speechSynthesis;
  
    // Remove all forced classes from <body>
    function resetAllClasses() {
      document.body.classList.remove(
        // Text sizes
        "force-font-scale-100",
        "force-font-scale-125",
        "force-font-scale-150",
        "force-font-scale-175",
        "force-font-scale-200",
        // Color modes
        "force-dark-mode",
        "force-high-contrast",
        "force-light-mode",
        "force-hide-images",
        "force-monochrome",
        // Additional overrides
        "force-reduce-motion",
        "force-text-color-black",
        "force-text-color-red",
        "force-text-color-blue",
        "force-text-color-white",
        "force-bg-color-black",
        "force-bg-color-white",
        "force-bg-color-gray",
        "force-bg-color-red",
        "force-bg-color-blue"
      );
      // Also clear inline color or background from previous user picks
      document.body.style.setProperty("color", "");
      document.body.style.setProperty("background-color", "");
      currentFontScaleClass = "";
    }
  
    // Force a specific text-size override (remove old, add new)
    function setFontScale(scaleClass) {
      if (currentFontScaleClass) {
        document.body.classList.remove(currentFontScaleClass);
      }
      if (scaleClass) {
        document.body.classList.add(scaleClass);
        currentFontScaleClass = scaleClass;
      } else {
        currentFontScaleClass = "";
      }
    }
  
    // Start reading entire page text
    function startReading() {
      if (synth.speaking) return;
      const text = document.body.innerText;
      speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
      speechSynthesisUtterance.rate = 1;
      speechSynthesisUtterance.pitch = 1;
      synth.speak(speechSynthesisUtterance);
    }
    // Stop reading
    function stopReading() {
      if (synth.speaking) {
        synth.cancel();
      }
    }
  
    // Insert a <style> block with !important overrides
    const styleEl = document.createElement("style");
    styleEl.id = "my-accessibility-forced-styles";
    styleEl.innerHTML = `
    /* ========================================================
       1) FORCE OVERRIDES WITH !important
       ======================================================== */
    /* A) Font-Scaling (discrete steps) */
    body.force-font-scale-100 * {
      font-size: 100% !important;
      line-height: 1.4 !important;
    }
    body.force-font-scale-125 * {
      font-size: 125% !important;
      line-height: 1.4 !important;
    }
    body.force-font-scale-150 * {
      font-size: 150% !important;
      line-height: 1.4 !important;
    }
    body.force-font-scale-175 * {
      font-size: 175% !important;
      line-height: 1.4 !important;
    }
    body.force-font-scale-200 * {
      font-size: 200% !important;
      line-height: 1.4 !important;
    }
  
    /* B) Dark Mode (forced) */
    body.force-dark-mode * {
      background-color: #000 !important;
      color: #fff !important;
    }
  
    /* C) High Contrast (forced) */
    body.force-high-contrast * {
      background-color: #000 !important;
      color: #fff !important;
      filter: contrast(150%) !important;
    }
  
    /* D) Light Mode (forced) */
    body.force-light-mode * {
      background-color: #fff !important;
      color: #000 !important;
    }
  
    /* E) Hide Images */
    body.force-hide-images img,
    body.force-hide-images picture,
    body.force-hide-images figure {
      display: none !important;
    }
  
    /* F) Monochrome (grayscale) */
    body.force-monochrome * {
      filter: grayscale(100%) !important;
    }
  
    /* G) Reduce Motion (disable transitions/animations) */
    body.force-reduce-motion * {
      animation: none !important;
      transition: none !important;
    }
  
    /* H) Specific forced text color classes */
    body.force-text-color-black * { color: #000 !important; }
    body.force-text-color-red * { color: #f00 !important; }
    body.force-text-color-blue * { color: #00f !important; }
    body.force-text-color-white * { color: #fff !important; }
  
    /* I) Specific forced background color classes */
    body.force-bg-color-black * { background-color: #000 !important; }
    body.force-bg-color-white * { background-color: #fff !important; }
    body.force-bg-color-gray * { background-color: #ccc !important; }
    body.force-bg-color-red * { background-color: #f00 !important; }
    body.force-bg-color-blue * { background-color: #00f !important; }
  
    /* ========================================================
       2) WIDGET UI STYLING (scoped to .my-acc-widget)
       ======================================================== */
    .my-acc-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: Arial, sans-serif;
    }
    .my-acc-widget button,
    .my-acc-widget select {
      font-family: inherit;
    }
  
    /* Toggle button */
    .my-acc-widget .acc-toggle-btn {
      width: 60px;
      height: 60px;
      border: none;
      border-radius: 50%;
      background-color: #0057b8;
      color: #fff;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    /* Panel container */
    .my-acc-widget .acc-panel {
      position: absolute;
      bottom: 70px;
      right: 0;
      width: 360px;
      max-height: 80vh;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.3);
      display: none; /* hidden by default */
      flex-direction: column;
      overflow: hidden;
    }
    .my-acc-widget.open .acc-panel {
      display: flex;
    }
  
    /* Panel header */
    .my-acc-widget .acc-panel-header {
      background-color: #f2f2f2;
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .my-acc-widget .acc-panel-header button {
      background-color: #eee;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 13px;
      cursor: pointer;
    }
    .my-acc-widget .acc-panel-header button:hover {
      background-color: #ddd;
    }
  
    /* Panel content (scrollable) */
    .my-acc-widget .acc-panel-content {
      padding: 10px;
      overflow-y: auto;
      flex: 1;
    }
  
    /* Each feature row */
    .my-acc-widget .feature-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
    .my-acc-widget .feature-row:last-child {
      border-bottom: none;
    }
    .my-acc-widget .feature-label {
      font-size: 14px;
      color: #333;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .my-acc-widget .feature-label i {
      color: #0057b8;
      font-size: 16px;
    }
  
    /* Toggle switch */
    .my-acc-widget .toggle-switch {
      position: relative;
      width: 45px;
      height: 24px;
    }
    .my-acc-widget .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .my-acc-widget .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 24px;
    }
    .my-acc-widget .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    .my-acc-widget .toggle-switch input:checked + .slider {
      background-color: #0057b8;
    }
    .my-acc-widget .toggle-switch input:checked + .slider:before {
      transform: translateX(21px);
    }
  
    /* Simple dropdown row styling */
    .my-acc-widget .dropdown-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .my-acc-widget .dropdown-row select {
      flex: 1;
      padding: 4px;
      font-size: 14px;
    }
  
    /* Color swatches container */
    .my-acc-widget .swatches {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
    .my-acc-widget .swatch {
      width: 20px;
      height: 20px;
      border-radius: 3px;
      cursor: pointer;
      border: 1px solid #ccc;
    }
    `;
    document.head.appendChild(styleEl);
  
    /**
     * ===============================
     *  1. CREATE THE WIDGET ELEMENTS
     * ===============================
     */
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "my-acc-widget";
  
    // A) Toggle Button
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "acc-toggle-btn";
    toggleBtn.innerHTML = `<i class="fas fa-universal-access"></i>`;
    toggleBtn.title = "Open Accessibility Options";
    toggleBtn.addEventListener("click", () => {
      isWidgetOpen = !isWidgetOpen;
      if (isWidgetOpen) {
        widgetContainer.classList.add("open");
      } else {
        widgetContainer.classList.remove("open");
      }
    });
  
    widgetContainer.appendChild(toggleBtn);
  
    // B) Panel
    const panel = document.createElement("div");
    panel.className = "acc-panel";
    widgetContainer.appendChild(panel);
  
    // B1) Panel Header
    const panelHeader = document.createElement("div");
    panelHeader.className = "acc-panel-header";
    panel.appendChild(panelHeader);
  
    // -- Reset Button
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset";
    resetBtn.title = "Reset all overrides";
    resetBtn.addEventListener("click", () => {
      resetAllClasses();
      // Also uncheck toggles or reset dropdowns
      panel.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });
      panel.querySelectorAll('select').forEach(sel => {
        sel.value = "";
      });
    });
    panelHeader.appendChild(resetBtn);
  
    // -- Hide Widget Button
    const hideBtn = document.createElement("button");
    hideBtn.textContent = "Hide Widget";
    hideBtn.title = "Hide the accessibility widget interface";
    hideBtn.addEventListener("click", () => {
      widgetContainer.style.display = "none";
    });
    panelHeader.appendChild(hideBtn);
  
    // B2) Panel Content
    const panelContent = document.createElement("div");
    panelContent.className = "acc-panel-content";
    panel.appendChild(panelContent);
  
    /**
     * ==========================
     *  2. BUILD FEATURE ROWS
     * ==========================
     * We'll group them logically:
     * A) Font Scale
     * B) Color / Contrast
     * C) Hide Images / Reduce Motion
     * D) TTS (Screen Reader)
     * E) Additional toggles...
     */
  
    // Helper to create a toggle row with a switch
    function createToggleRow(iconClass, labelText, onToggle) {
      const row = document.createElement("div");
      row.className = "feature-row";
  
      const label = document.createElement("div");
      label.className = "feature-label";
      label.innerHTML = `<i class="${iconClass}"></i> <span>${labelText}</span>`;
  
      const toggleWrap = document.createElement("label");
      toggleWrap.className = "toggle-switch";
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      const slider = document.createElement("span");
      slider.className = "slider";
  
      checkbox.addEventListener("change", (e) => {
        onToggle(e.target.checked);
      });
  
      toggleWrap.appendChild(checkbox);
      toggleWrap.appendChild(slider);
      row.appendChild(label);
      row.appendChild(toggleWrap);
  
      return row;
    }
  
    // A) Font Scale (Discrete)
    const fontScaleRow = document.createElement("div");
    fontScaleRow.className = "feature-row dropdown-row";
    fontScaleRow.innerHTML = `
      <div class="feature-label">
        <i class="fas fa-text-height"></i>
        <span>Text Size</span>
      </div>
    `;
    const fontSelect = document.createElement("select");
    // Options: 100%, 125%, 150%, 175%, 200%
    const fontOptions = [
      { value: "", label: "Default (100%)" },
      { value: "force-font-scale-125", label: "125%" },
      { value: "force-font-scale-150", label: "150%" },
      { value: "force-font-scale-175", label: "175%" },
      { value: "force-font-scale-200", label: "200%" }
    ];
    fontOptions.forEach(opt => {
      const optionEl = document.createElement("option");
      optionEl.value = opt.value;
      optionEl.textContent = opt.label;
      fontSelect.appendChild(optionEl);
    });
    fontSelect.addEventListener("change", () => {
      setFontScale(fontSelect.value);
    });
    fontScaleRow.appendChild(fontSelect);
  
    panelContent.appendChild(fontScaleRow);
  
    // B) Dark Mode
    panelContent.appendChild(createToggleRow("fas fa-moon", "Dark Mode", (checked) => {
      document.body.classList.toggle("force-dark-mode", checked);
    }));
  
    // C) High Contrast
    panelContent.appendChild(createToggleRow("fas fa-adjust", "High Contrast", (checked) => {
      document.body.classList.toggle("force-high-contrast", checked);
    }));
  
    // D) Light Mode
    panelContent.appendChild(createToggleRow("fas fa-sun", "Light Mode", (checked) => {
      document.body.classList.toggle("force-light-mode", checked);
    }));
  
    // E) Hide Images
    panelContent.appendChild(createToggleRow("far fa-image", "Hide Images", (checked) => {
      document.body.classList.toggle("force-hide-images", checked);
    }));
  
    // F) Monochrome
    panelContent.appendChild(createToggleRow("fas fa-tint-slash", "Monochrome", (checked) => {
      document.body.classList.toggle("force-monochrome", checked);
    }));
  
    // G) Reduce Motion
    panelContent.appendChild(createToggleRow("fas fa-wave-square", "Reduce Motion", (checked) => {
      document.body.classList.toggle("force-reduce-motion", checked);
    }));
  
    // H) Forced Text Color Swatches
    const textColorRow = document.createElement("div");
    textColorRow.className = "feature-row";
    const textColorLabel = document.createElement("div");
    textColorLabel.className = "feature-label";
    textColorLabel.innerHTML = `<i class="fas fa-palette"></i> <span>Text Color</span>`;
  
    const textColorSwatches = document.createElement("div");
    textColorSwatches.className = "swatches";
  
    // We'll provide black, red, blue, white
    const textColors = [
      { colorClass: "force-text-color-black", colorName: "Black", colorValue: "#000" },
      { colorClass: "force-text-color-red", colorName: "Red", colorValue: "#f00" },
      { colorClass: "force-text-color-blue", colorName: "Blue", colorValue: "#00f" },
      { colorClass: "force-text-color-white", colorName: "White", colorValue: "#fff" }
    ];
  
    textColors.forEach(tc => {
      const swatch = document.createElement("div");
      swatch.className = "swatch";
      swatch.style.backgroundColor = tc.colorValue;
      swatch.title = tc.colorName;
      swatch.addEventListener("click", () => {
        // Remove any text color overrides
        document.body.classList.remove("force-text-color-black", "force-text-color-red", "force-text-color-blue", "force-text-color-white");
        document.body.classList.add(tc.colorClass);
      });
      textColorSwatches.appendChild(swatch);
    });
  
    // A button to revert text color
    const resetTextColorBtn = document.createElement("button");
    resetTextColorBtn.textContent = "Reset";
    resetTextColorBtn.style.fontSize = "12px";
    resetTextColorBtn.addEventListener("click", () => {
      document.body.classList.remove("force-text-color-black", "force-text-color-red", "force-text-color-blue", "force-text-color-white");
      // Also clear inline color
      document.body.style.setProperty("color", "");
    });
    textColorSwatches.appendChild(resetTextColorBtn);
  
    textColorRow.appendChild(textColorLabel);
    textColorRow.appendChild(textColorSwatches);
    panelContent.appendChild(textColorRow);
  
    // I) Forced Background Color Swatches
    const bgColorRow = document.createElement("div");
    bgColorRow.className = "feature-row";
    const bgColorLabel = document.createElement("div");
    bgColorLabel.className = "feature-label";
    bgColorLabel.innerHTML = `<i class="fas fa-fill-drip"></i> <span>Background</span>`;
  
    const bgColorSwatches = document.createElement("div");
    bgColorSwatches.className = "swatches";
  
    // We'll provide black, white, gray, red, blue
    const bgColors = [
      { colorClass: "force-bg-color-black", colorName: "Black", colorValue: "#000" },
      { colorClass: "force-bg-color-white", colorName: "White", colorValue: "#fff" },
      { colorClass: "force-bg-color-gray", colorName: "Gray", colorValue: "#ccc" },
      { colorClass: "force-bg-color-red", colorName: "Red", colorValue: "#f00" },
      { colorClass: "force-bg-color-blue", colorName: "Blue", colorValue: "#00f" }
    ];
  
    bgColors.forEach(bgc => {
      const swatch = document.createElement("div");
      swatch.className = "swatch";
      swatch.style.backgroundColor = bgc.colorValue;
      swatch.title = bgc.colorName;
      swatch.addEventListener("click", () => {
        // Remove any background color overrides
        document.body.classList.remove("force-bg-color-black", "force-bg-color-white", "force-bg-color-gray", "force-bg-color-red", "force-bg-color-blue");
        document.body.classList.add(bgc.colorClass);
      });
      bgColorSwatches.appendChild(swatch);
    });
  
    // A button to revert background color
    const resetBgColorBtn = document.createElement("button");
    resetBgColorBtn.textContent = "Reset";
    resetBgColorBtn.style.fontSize = "12px";
    resetBgColorBtn.addEventListener("click", () => {
      document.body.classList.remove("force-bg-color-black", "force-bg-color-white", "force-bg-color-gray", "force-bg-color-red", "force-bg-color-blue");
      // Also clear inline background
      document.body.style.setProperty("background-color", "");
    });
    bgColorSwatches.appendChild(resetBgColorBtn);
  
    bgColorRow.appendChild(bgColorLabel);
    bgColorRow.appendChild(bgColorSwatches);
    panelContent.appendChild(bgColorRow);
  
    // J) Screen Reader (Text-to-Speech)
    //    1) Read Aloud, 2) Stop Reading
    const screenReaderRow = document.createElement("div");
    screenReaderRow.className = "feature-row";
    screenReaderRow.innerHTML = `
      <div class="feature-label">
        <i class="fas fa-volume-up"></i>
        <span>Screen Reader</span>
      </div>
    `;
    const srButtons = document.createElement("div");
    srButtons.style.display = "flex";
    srButtons.style.gap = "5px";
  
    const readBtn = document.createElement("button");
    readBtn.textContent = "Read Aloud";
    readBtn.style.fontSize = "12px";
    readBtn.addEventListener("click", startReading);
    srButtons.appendChild(readBtn);
  
    const stopBtn = document.createElement("button");
    stopBtn.textContent = "Stop";
    stopBtn.style.fontSize = "12px";
    stopBtn.addEventListener("click", stopReading);
    srButtons.appendChild(stopBtn);
  
    screenReaderRow.appendChild(srButtons);
    panelContent.appendChild(screenReaderRow);
  
    /**
     * ==============================
     *  3. ATTACH THE WIDGET TO BODY
     * ==============================
     */
    document.body.appendChild(widgetContainer);
  })();
  