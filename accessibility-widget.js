(function() {
    /**
     * ==============================
     *  0. HELPER FUNCTIONS & STATE
     * ==============================
     */
    let isWidgetOpen = false;
  
    // Utility: Toggle any CSS class on <body>
    function toggleBodyClass(className) {
      document.body.classList.toggle(className);
    }
  
    // Utility: Remove all accessibility classes from <body>
    function resetAllClasses() {
      const classesToRemove = [
        "seizure-safe-profile", "vision-impaired-profile", "adhd-friendly-profile",
        "cognitive-profile", "keyboard-navigation", "screen-reader-enabled",
        "content-scaling", "readable-font", "highlight-titles", "highlight-links",
        "text-magnifier", "bigger-text", "line-height-2", "line-height-3",
        "letter-spacing-2", "letter-spacing-3", "align-left", "align-center", "align-right",
        "dark-contrast", "light-contrast", "high-contrast", "high-saturation",
        "low-saturation", "monochrome", "mute-sounds", "hide-images", "read-mode",
        "reading-guide", "stop-animations", "reading-mask", "highlight-hover",
        "highlight-focus", "big-black-cursor", "big-white-cursor"
        // Add more if needed
      ];
      classesToRemove.forEach((cls) => document.body.classList.remove(cls));
    }
  
    // Utility: Hide the entire widget
    function hideWidgetInterface() {
      widgetContainer.style.display = "none";
    }
  
    // Dictionary search placeholder (you can integrate a real dictionary API)
    function dictionarySearch(query) {
      if (!query) return;
      alert(`Searching for definition of: "${query}" (placeholder).`);
    }
  
    /**
     * ===========================
     *  1. CREATE MAIN CONTAINER
     * ===========================
     */
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "my-accessibility-widget";
  
    // We'll inject <style> to keep everything scoped
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      /* -------------------------------------------------
         A) Base Container & Toggle Button
      -------------------------------------------------- */
      .my-accessibility-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        font-family: Arial, sans-serif;
        transition: all 0.3s ease;
      }
      .my-accessibility-widget button,
      .my-accessibility-widget select {
        font-family: inherit;
      }
      /* Floating button to open/close the panel */
      .my-accessibility-widget .widget-toggle-btn {
        width: 60px;
        height: 60px;
        border: none;
        border-radius: 50%;
        background-color: #0057b8;
        color: #fff;
        font-size: 26px;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      /* -------------------------------------------------
         B) The Panel
      -------------------------------------------------- */
      .my-accessibility-widget .widget-panel {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 380px;
        max-height: 80vh;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        display: none; /* Hidden by default */
        flex-direction: column;
        overflow: hidden;
      }
      .my-accessibility-widget.open .widget-panel {
        display: flex;
      }
  
      /* -------------------------------------------------
         C) Top Bar (Reset, Statement, Hide, Search)
      -------------------------------------------------- */
      .my-accessibility-widget .panel-top-bar {
        background-color: #f2f2f2;
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .my-accessibility-widget .panel-top-bar button {
        background-color: #eee;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 13px;
        cursor: pointer;
      }
      .my-accessibility-widget .panel-top-bar button:hover {
        background-color: #ddd;
      }
      .my-accessibility-widget .panel-top-bar input[type="text"] {
        flex: 1;
        padding: 6px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 13px;
      }
  
      /* -------------------------------------------------
         D) Tabs (Profiles, Content, Color, Orientation)
      -------------------------------------------------- */
      .my-accessibility-widget .tabs {
        display: flex;
        background-color: #f9f9f9;
        border-bottom: 1px solid #ccc;
      }
      .my-accessibility-widget .tab-btn {
        flex: 1;
        text-align: center;
        padding: 10px;
        cursor: pointer;
        border: none;
        background-color: #f9f9f9;
        font-size: 14px;
        border-right: 1px solid #ccc;
      }
      .my-accessibility-widget .tab-btn:last-child {
        border-right: none;
      }
      .my-accessibility-widget .tab-btn.active {
        background-color: #fff;
        font-weight: bold;
        border-bottom: 2px solid #0057b8;
      }
  
      /* -------------------------------------------------
         E) Tab Content
      -------------------------------------------------- */
      .my-accessibility-widget .tab-content {
        display: none;
        padding: 10px;
        overflow-y: auto;
        flex: 1;
      }
      .my-accessibility-widget .tab-content.active {
        display: block;
      }
  
      /* Each item row with ON/OFF toggle or other controls */
      .my-accessibility-widget .item-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #eee;
      }
      .my-accessibility-widget .item-row:last-child {
        border-bottom: none;
      }
      .my-accessibility-widget .item-label {
        font-size: 14px;
        color: #333;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .my-accessibility-widget .item-label i {
        color: #0057b8;
      }
  
      /* Toggle switch style */
      .my-accessibility-widget .toggle-switch {
        position: relative;
        width: 45px;
        height: 24px;
      }
      .my-accessibility-widget .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .my-accessibility-widget .slider {
        position: absolute;
        cursor: pointer;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 24px;
      }
      .my-accessibility-widget .slider:before {
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
      .my-accessibility-widget .toggle-switch input:checked + .slider {
        background-color: #0057b8;
      }
      .my-accessibility-widget .toggle-switch input:checked + .slider:before {
        transform: translateX(21px);
      }
  
      /* Simple color swatches */
      .my-accessibility-widget .color-swatches {
        display: flex;
        gap: 5px;
      }
      .my-accessibility-widget .color-swatch {
        width: 20px;
        height: 20px;
        border-radius: 3px;
        cursor: pointer;
        border: 1px solid #ccc;
      }
  
      /* -------------------------------------------------
         F) Example Classes for Accessibility Features
         (You can expand or refine these)
      -------------------------------------------------- */
      /* 1) Profiles (example placeholders) */
      body.seizure-safe-profile { /* e.g. reduce flashy elements */ }
      body.vision-impaired-profile { /* e.g. bigger fonts, higher contrast */ }
      body.adhd-friendly-profile { /* e.g. reduced distractions */ }
      body.cognitive-profile { /* e.g. simpler UI, maybe highlight focus */ }
      body.keyboard-navigation { outline: 2px dashed #0057b8 !important; }
      body.screen-reader-enabled { /* e.g. start TTS or focus announcements */ }
  
      /* 2) Content Adjustments */
      body.content-scaling { /* e.g. scale content by 110% */ transform: scale(1.1); transform-origin: 0 0; }
      body.readable-font { font-family: "OpenDyslexic", Arial, sans-serif !important; }
      body.highlight-titles h1, 
      body.highlight-titles h2, 
      body.highlight-titles h3, 
      body.highlight-titles h4, 
      body.highlight-titles h5 { outline: 2px solid orange; }
      body.highlight-links a { outline: 2px dotted red; }
      body.text-magnifier { /* placeholder for text magnifier logic */ }
      body.bigger-text * { font-size: 120% !important; line-height: 1.4 !important; }
      body.line-height-2 * { line-height: 1.8 !important; }
      body.line-height-3 * { line-height: 2 !important; }
      body.letter-spacing-2 * { letter-spacing: 1px !important; }
      body.letter-spacing-3 * { letter-spacing: 2px !important; }
      body.align-left { text-align: left !important; }
      body.align-center { text-align: center !important; }
      body.align-right { text-align: right !important; }
  
      /* 3) Color Adjustments */
      body.dark-contrast { background-color: #111 !important; color: #eee !important; }
      body.light-contrast { background-color: #fff !important; color: #000 !important; }
      body.high-contrast { filter: contrast(150%) !important; }
      body.high-saturation { filter: saturate(150%) !important; }
      body.low-saturation { filter: saturate(50%) !important; }
      body.monochrome { filter: grayscale(100%) !important; }
  
      /* 4) Orientation Adjustments */
      body.mute-sounds { /* e.g. mute audio/video tags via JS */ }
      body.hide-images img, 
      body.hide-images picture, 
      body.hide-images figure { display: none !important; }
      body.read-mode { /* e.g. show only main text, hide sidebars? */ }
      body.reading-guide { /* e.g. highlight a single line or region? */ }
      body.stop-animations * { animation: none !important; transition: none !important; }
      body.reading-mask { /* e.g. dark overlay except for line of text? */ }
      body.highlight-hover *:hover { outline: 2px solid #0057b8; }
      body.highlight-focus *:focus { outline: 2px solid #ff9900; }
      body.big-black-cursor { cursor: url('https://cdn-icons-png.flaticon.com/512/892/892693.png'), auto; }
      body.big-white-cursor { cursor: url('https://cdn-icons-png.flaticon.com/512/892/892709.png'), auto; }
    `;
    document.head.appendChild(styleEl);
  
    /**
     * ===========================
     *  2. CREATE THE TOGGLE BUTTON
     * ===========================
     */
    const toggleButton = document.createElement("button");
    toggleButton.className = "widget-toggle-btn";
    toggleButton.innerHTML = `<i class="fas fa-universal-access"></i>`;
    toggleButton.title = "Open Accessibility Options";
  
    toggleButton.addEventListener("click", () => {
      isWidgetOpen = !isWidgetOpen;
      if (isWidgetOpen) {
        widgetContainer.classList.add("open");
      } else {
        widgetContainer.classList.remove("open");
      }
    });
  
    widgetContainer.appendChild(toggleButton);
  
    /**
     * ===========================
     *  3. CREATE THE PANEL
     * ===========================
     */
    const widgetPanel = document.createElement("div");
    widgetPanel.className = "widget-panel";
    widgetContainer.appendChild(widgetPanel);
  
    /**
     *  3A. Top Bar with Reset, Statement, Hide, Search
     */
    const topBar = document.createElement("div");
    topBar.className = "panel-top-bar";
    widgetPanel.appendChild(topBar);
  
    // Reset Button
    const resetBtn = document.createElement("button");
    resetBtn.innerText = "Reset Settings";
    resetBtn.addEventListener("click", () => {
      resetAllClasses();
      // Also uncheck all toggles
      widgetPanel.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });
    });
    topBar.appendChild(resetBtn);
  
    // Accessibility Statement (placeholder)
    const statementBtn = document.createElement("button");
    statementBtn.innerText = "Statement";
    statementBtn.addEventListener("click", () => {
      alert("Open Accessibility Statement (placeholder).");
    });
    topBar.appendChild(statementBtn);
  
    // Hide Interface
    const hideBtn = document.createElement("button");
    hideBtn.innerText = "Hide Interface";
    hideBtn.addEventListener("click", hideWidgetInterface);
    topBar.appendChild(hideBtn);
  
    // Dictionary Search
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search in dictionary...";
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        dictionarySearch(searchInput.value);
      }
    });
    topBar.appendChild(searchInput);
  
    /**
     *  3B. Tabs (Profiles, Content, Color, Orientation)
     */
    const tabsContainer = document.createElement("div");
    tabsContainer.className = "tabs";
    widgetPanel.appendChild(tabsContainer);
  
    const tabNames = ["Profiles", "Content", "Color", "Orientation"];
    const tabButtons = [];
    const tabContents = [];
  
    function createTab(name) {
      const btn = document.createElement("button");
      btn.className = "tab-btn";
      btn.innerText = name;
      tabsContainer.appendChild(btn);
  
      const content = document.createElement("div");
      content.className = "tab-content";
      widgetPanel.appendChild(content);
  
      tabButtons.push(btn);
      tabContents.push(content);
  
      btn.addEventListener("click", () => {
        // Activate this tab
        tabButtons.forEach((b, i) => {
          b.classList.remove("active");
          tabContents[i].classList.remove("active");
        });
        btn.classList.add("active");
        content.classList.add("active");
      });
    }
  
    tabNames.forEach(createTab);
  
    // Activate the first tab by default
    tabButtons[0].classList.add("active");
    tabContents[0].classList.add("active");
  
    /**
     *  3C. Populate each tab with items
     */
    // Helper to create a toggle row: label + ON/OFF
    function createToggleRow(icon, labelText, onToggle) {
      const row = document.createElement("div");
      row.className = "item-row";
  
      const label = document.createElement("div");
      label.className = "item-label";
      label.innerHTML = `<i class="${icon}"></i> <span>${labelText}</span>`;
  
      const toggleWrap = document.createElement("label");
      toggleWrap.className = "toggle-switch";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      const slider = document.createElement("span");
      slider.className = "slider";
  
      toggleWrap.appendChild(checkbox);
      toggleWrap.appendChild(slider);
  
      checkbox.addEventListener("change", (e) => {
        onToggle(e.target.checked);
      });
  
      row.appendChild(label);
      row.appendChild(toggleWrap);
  
      return row;
    }
  
    /**
     * ========== TAB 1: Profiles ==========
     */
    const profilesTab = tabContents[0];
  
    profilesTab.appendChild(createToggleRow("fas fa-bolt", "Seizure Safe Profile", (checked) => {
      toggleBodyClass("seizure-safe-profile");
    }));
    profilesTab.appendChild(createToggleRow("fas fa-eye", "Vision Impaired Profile", (checked) => {
      toggleBodyClass("vision-impaired-profile");
    }));
    profilesTab.appendChild(createToggleRow("fas fa-brain", "ADHD Friendly Profile", (checked) => {
      toggleBodyClass("adhd-friendly-profile");
    }));
    profilesTab.appendChild(createToggleRow("fas fa-user-graduate", "Cognitive Disability Profile", (checked) => {
      toggleBodyClass("cognitive-profile");
    }));
    profilesTab.appendChild(createToggleRow("fas fa-keyboard", "Keyboard Navigation (Motor)", (checked) => {
      toggleBodyClass("keyboard-navigation");
    }));
    profilesTab.appendChild(createToggleRow("fas fa-blind", "Blind Users (Screen Reader)", (checked) => {
      toggleBodyClass("screen-reader-enabled");
    }));
  
    /**
     * ========== TAB 2: Content Adjustments ==========
     */
    const contentTab = tabContents[1];
  
    contentTab.appendChild(createToggleRow("fas fa-expand", "Content Scaling", (checked) => {
      toggleBodyClass("content-scaling");
    }));
    contentTab.appendChild(createToggleRow("fas fa-font", "Readable Font", (checked) => {
      toggleBodyClass("readable-font");
    }));
    contentTab.appendChild(createToggleRow("fas fa-heading", "Highlight Titles", (checked) => {
      toggleBodyClass("highlight-titles");
    }));
    contentTab.appendChild(createToggleRow("fas fa-link", "Highlight Links", (checked) => {
      toggleBodyClass("highlight-links");
    }));
    contentTab.appendChild(createToggleRow("fas fa-search-plus", "Text Magnifier", (checked) => {
      toggleBodyClass("text-magnifier");
    }));
    contentTab.appendChild(createToggleRow("fas fa-text-height", "Bigger Text", (checked) => {
      toggleBodyClass("bigger-text");
    }));
  
    // Example: Adjust line height with a simple dropdown
    const lineHeightRow = document.createElement("div");
    lineHeightRow.className = "item-row";
    lineHeightRow.innerHTML = `
      <div class="item-label">
        <i class="fas fa-text-height"></i>
        <span>Adjust Line Height</span>
      </div>
    `;
    const lineHeightSelect = document.createElement("select");
    const lhOptions = [
      { value: "", label: "Default" },
      { value: "line-height-2", label: "Line Height 1.8" },
      { value: "line-height-3", label: "Line Height 2.0" }
    ];
    lhOptions.forEach(opt => {
      const optionEl = document.createElement("option");
      optionEl.value = opt.value;
      optionEl.textContent = opt.label;
      lineHeightSelect.appendChild(optionEl);
    });
    lineHeightSelect.addEventListener("change", () => {
      // Remove any existing line-height classes
      document.body.classList.remove("line-height-2", "line-height-3");
      if (lineHeightSelect.value) {
        document.body.classList.add(lineHeightSelect.value);
      }
    });
    lineHeightRow.appendChild(lineHeightSelect);
    contentTab.appendChild(lineHeightRow);
  
    // Adjust letter spacing
    const letterSpacingRow = document.createElement("div");
    letterSpacingRow.className = "item-row";
    letterSpacingRow.innerHTML = `
      <div class="item-label">
        <i class="fas fa-arrows-alt-h"></i>
        <span>Adjust Letter Spacing</span>
      </div>
    `;
    const letterSpacingSelect = document.createElement("select");
    const lsOptions = [
      { value: "", label: "Default" },
      { value: "letter-spacing-2", label: "Spacing +1px" },
      { value: "letter-spacing-3", label: "Spacing +2px" }
    ];
    lsOptions.forEach(opt => {
      const optionEl = document.createElement("option");
      optionEl.value = opt.value;
      optionEl.textContent = opt.label;
      letterSpacingSelect.appendChild(optionEl);
    });
    letterSpacingSelect.addEventListener("change", () => {
      document.body.classList.remove("letter-spacing-2", "letter-spacing-3");
      if (letterSpacingSelect.value) {
        document.body.classList.add(letterSpacingSelect.value);
      }
    });
    letterSpacingRow.appendChild(letterSpacingSelect);
    contentTab.appendChild(letterSpacingRow);
  
    // Align text
    const alignRow = document.createElement("div");
    alignRow.className = "item-row";
    alignRow.innerHTML = `
      <div class="item-label">
        <i class="fas fa-align-left"></i>
        <span>Text Alignment</span>
      </div>
    `;
    const alignSelect = document.createElement("select");
    const alignOptions = [
      { value: "", label: "Default" },
      { value: "align-left", label: "Align Left" },
      { value: "align-center", label: "Align Center" },
      { value: "align-right", label: "Align Right" }
    ];
    alignOptions.forEach(opt => {
      const optionEl = document.createElement("option");
      optionEl.value = opt.value;
      optionEl.textContent = opt.label;
      alignSelect.appendChild(optionEl);
    });
    alignSelect.addEventListener("change", () => {
      document.body.classList.remove("align-left", "align-center", "align-right");
      if (alignSelect.value) {
        document.body.classList.add(alignSelect.value);
      }
    });
    alignRow.appendChild(alignSelect);
    contentTab.appendChild(alignRow);
  
    /**
     * ========== TAB 3: Color Adjustments ==========
     */
    const colorTab = tabContents[2];
  
    colorTab.appendChild(createToggleRow("fas fa-moon", "Dark Contrast", (checked) => {
      toggleBodyClass("dark-contrast");
    }));
    colorTab.appendChild(createToggleRow("fas fa-sun", "Light Contrast", (checked) => {
      toggleBodyClass("light-contrast");
    }));
    colorTab.appendChild(createToggleRow("fas fa-adjust", "High Contrast", (checked) => {
      toggleBodyClass("high-contrast");
    }));
  
    colorTab.appendChild(createToggleRow("fas fa-tint", "High Saturation", (checked) => {
      toggleBodyClass("high-saturation");
    }));
    colorTab.appendChild(createToggleRow("fas fa-tint-slash", "Low Saturation", (checked) => {
      toggleBodyClass("low-saturation");
    }));
    colorTab.appendChild(createToggleRow("fas fa-eye-dropper", "Monochrome", (checked) => {
      toggleBodyClass("monochrome");
    }));
  
    // Adjust Text Colors (swatches)
    const textColorsRow = document.createElement("div");
    textColorsRow.className = "item-row";
    textColorsRow.innerHTML = `
      <div class="item-label">
        <i class="fas fa-palette"></i>
        <span>Adjust Text Colors</span>
      </div>
    `;
    const textSwatches = document.createElement("div");
    textSwatches.className = "color-swatches";
    ["#000","#333","#f00","#0f0","#00f","#fff"].forEach(color => {
      const swatch = document.createElement("div");
      swatch.className = "color-swatch";
      swatch.style.backgroundColor = color;
      swatch.addEventListener("click", () => {
        document.body.style.color = color;
      });
      textSwatches.appendChild(swatch);
    });
    const cancelTextColor = document.createElement("button");
    cancelTextColor.textContent = "Cancel";
    cancelTextColor.style.marginLeft = "5px";
    cancelTextColor.style.fontSize = "12px";
    cancelTextColor.addEventListener("click", () => {
      document.body.style.color = "";
    });
    textSwatches.appendChild(cancelTextColor);
    textColorsRow.appendChild(textSwatches);
    colorTab.appendChild(textColorsRow);
  
    // Adjust Background Colors
    const bgColorsRow = document.createElement("div");
    bgColorsRow.className = "item-row";
    bgColorsRow.innerHTML = `
      <div class="item-label">
        <i class="fas fa-fill-drip"></i>
        <span>Adjust Background Colors</span>
      </div>
    `;
    const bgSwatches = document.createElement("div");
    bgSwatches.className = "color-swatches";
    ["#fff","#eee","#ccc","#f00","#0f0","#00f"].forEach(color => {
      const swatch = document.createElement("div");
      swatch.className = "color-swatch";
      swatch.style.backgroundColor = color;
      swatch.addEventListener("click", () => {
        document.body.style.backgroundColor = color;
      });
      bgSwatches.appendChild(swatch);
    });
    const cancelBgColor = document.createElement("button");
    cancelBgColor.textContent = "Cancel";
    cancelBgColor.style.marginLeft = "5px";
    cancelBgColor.style.fontSize = "12px";
    cancelBgColor.addEventListener("click", () => {
      document.body.style.backgroundColor = "";
    });
    bgSwatches.appendChild(cancelBgColor);
    bgColorsRow.appendChild(bgSwatches);
    colorTab.appendChild(bgColorsRow);
  
    /**
     * ========== TAB 4: Orientation Adjustments ==========
     */
    const orientationTab = tabContents[3];
  
    orientationTab.appendChild(createToggleRow("fas fa-volume-mute", "Mute Sounds", (checked) => {
      toggleBodyClass("mute-sounds");
      // Real logic might pause/mute all audio/video
    }));
    orientationTab.appendChild(createToggleRow("far fa-image", "Hide Images", (checked) => {
      toggleBodyClass("hide-images");
    }));
    orientationTab.appendChild(createToggleRow("fas fa-book", "Read Mode", (checked) => {
      toggleBodyClass("read-mode");
    }));
    orientationTab.appendChild(createToggleRow("fas fa-grip-lines", "Reading Guide", (checked) => {
      toggleBodyClass("reading-guide");
    }));
  
    // Useful Links (placeholder dropdown)
    const usefulLinksRow = document.createElement("div");
    usefulLinksRow.className = "item-row";
    usefulLinksRow.innerHTML = `
      <div class="item-label">
        <i class="fas fa-external-link-alt"></i>
        <span>Useful Links</span>
      </div>
    `;
    const linksSelect = document.createElement("select");
    const linkItems = [
      { label: "Select an option", url: "" },
      { label: "Google", url: "https://google.com" },
      { label: "W3C Accessibility", url: "https://www.w3.org/WAI/" }
    ];
    linkItems.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item.url;
      opt.textContent = item.label;
      linksSelect.appendChild(opt);
    });
    linksSelect.addEventListener("change", () => {
      if (linksSelect.value) {
        window.open(linksSelect.value, "_blank");
        linksSelect.value = "";
      }
    });
    usefulLinksRow.appendChild(linksSelect);
    orientationTab.appendChild(usefulLinksRow);
  
    orientationTab.appendChild(createToggleRow("fas fa-stop", "Stop Animations", (checked) => {
      toggleBodyClass("stop-animations");
    }));
    orientationTab.appendChild(createToggleRow("fas fa-mask", "Reading Mask", (checked) => {
      toggleBodyClass("reading-mask");
    }));
    orientationTab.appendChild(createToggleRow("fas fa-mouse-pointer", "Highlight Hover", (checked) => {
      toggleBodyClass("highlight-hover");
    }));
    orientationTab.appendChild(createToggleRow("fas fa-crosshairs", "Highlight Focus", (checked) => {
      toggleBodyClass("highlight-focus");
    }));
    orientationTab.appendChild(createToggleRow("fas fa-mouse-pointer", "Big Black Cursor", (checked) => {
      toggleBodyClass("big-black-cursor");
      // If toggled on, ensure big-white-cursor is off, etc.
      if (checked) document.body.classList.remove("big-white-cursor");
    }));
    orientationTab.appendChild(createToggleRow("fas fa-mouse-pointer", "Big White Cursor", (checked) => {
      toggleBodyClass("big-white-cursor");
      if (checked) document.body.classList.remove("big-black-cursor");
    }));
  
    /**
     * ===========================
     *  4. ATTACH THE WIDGET
     * ===========================
     */
    document.body.appendChild(widgetContainer);
  })();
  