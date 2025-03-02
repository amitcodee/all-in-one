(function () {
    /*******************************************************
     *  0. HELPER FUNCTIONS & GLOBAL STATE
     *******************************************************/
    let isWidgetOpen = false; // tracks open/close state
    const synth = window.speechSynthesis; // for TTS
    let currentUtterance = null;
  
    // Toggle any class on <body>
    function toggleBodyClass(className) {
      document.body.classList.toggle(className);
    }
  
    // Reset all classes & inline overrides
    function resetAllClasses() {
      const classesToRemove = [
        // Profiles
        "seizure-safe-profile", "vision-impaired-profile", "adhd-friendly-profile",
        "cognitive-profile", "keyboard-navigation", "screen-reader-enabled",
        // Content
        "content-scaling", "readable-font", "highlight-titles", "highlight-links",
        "text-magnifier", "line-height-2", "line-height-3", "letter-spacing-2",
        "letter-spacing-3", "align-left", "align-center", "align-right",
        "fixed-text-size-125", "fixed-text-size-150", "fixed-text-size-175",
        "fixed-text-size-200",
        // Color
        "dark-contrast", "light-contrast", "high-contrast", "high-saturation",
        "low-saturation", "monochrome",
        // Orientation
        "mute-sounds", "hide-images", "read-mode", "reading-guide",
        "stop-animations", "reading-mask", "highlight-hover", "highlight-focus",
        "big-black-cursor", "big-white-cursor"
      ];
      classesToRemove.forEach((cls) => document.body.classList.remove(cls));
  
      // Also reset inline color or background from color swatches
      document.body.style.color = "";
      document.body.style.backgroundColor = "";
  
      // Reset forced text-size overrides in the overrideStyleEl
      overrideStyleEl.innerHTML = initialOverrideCSS;
    }
  
    // Hide the entire widget with a fade-out
    function hideWidgetInterface() {
      widgetContainer.classList.add("fade-out");
      setTimeout(() => {
        widgetContainer.style.display = "none";
      }, 300);
    }
  
    // Dictionary search placeholder
    function dictionarySearch(query) {
      if (!query.trim()) return;
      alert(`Searching for definition of "${query}" (placeholder).`);
    }
  
    // Text-to-Speech: read entire page
    function speakPage() {
      if (!("speechSynthesis" in window)) {
        alert("Sorry, your browser doesn't support text-to-speech.");
        return;
      }
      if (synth.speaking) {
        console.warn("Already speaking.");
        return;
      }
      const text = document.body.innerText || "";
      if (!text.trim()) {
        alert("No text found to read.");
        return;
      }
      currentUtterance = new SpeechSynthesisUtterance(text);
      currentUtterance.lang = "en-US";
      currentUtterance.rate = 1;
      currentUtterance.pitch = 1;
      synth.speak(currentUtterance);
    }
  
    // Stop reading
    function cancelSpeech() {
      if (synth.speaking) {
        synth.cancel();
      }
    }
  
    /*******************************************************
     *  1. CREATE A STYLE ELEMENT FOR FORCED OVERRIDES
     *******************************************************/
    const overrideStyleEl = document.createElement("style");
    overrideStyleEl.id = "accessibility-overrides";
    const initialOverrideCSS = `
    /* Fixed Text Sizes */
    body.fixed-text-size-125, body.fixed-text-size-125 * {
      font-size: 125% !important;
    }
    body.fixed-text-size-150, body.fixed-text-size-150 * {
      font-size: 150% !important;
    }
    body.fixed-text-size-175, body.fixed-text-size-175 * {
      font-size: 175% !important;
    }
    body.fixed-text-size-200, body.fixed-text-size-200 * {
      font-size: 200% !important;
    }
    `;
    overrideStyleEl.innerHTML = initialOverrideCSS;
    document.head.appendChild(overrideStyleEl);
  
    // Update forced text size
    function updateFixedTextSize(sizeClass) {
      document.body.classList.remove(
        "fixed-text-size-125",
        "fixed-text-size-150",
        "fixed-text-size-175",
        "fixed-text-size-200"
      );
      if (sizeClass) {
        document.body.classList.add(sizeClass);
      }
    }
  
    /*******************************************************
     *  2. CREATE THE MAIN WIDGET CONTAINER & SCOPED STYLES
     *******************************************************/
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "my-accessibility-widget";
  
    // Basic positioning & fade transition
    widgetContainer.style.position = "fixed";
    widgetContainer.style.bottom = "20px";
    widgetContainer.style.right = "20px";
    widgetContainer.style.zIndex = "999999";
    widgetContainer.style.fontFamily = "Arial, sans-serif";
    widgetContainer.style.transition = "all 0.3s ease";
  
    // Local scoped styles for the widget
    const localStyle = document.createElement("style");
    localStyle.innerHTML = `
      /********************************************
       * Base Container & Fade-Out
       ********************************************/
      .my-accessibility-widget.fade-out {
        opacity: 0 !important;
        transition: opacity 0.3s ease !important;
      }
  
      /********************************************
       * Floating Toggle Button
       ********************************************/
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
      .my-accessibility-widget button,
      .my-accessibility-widget select {
        font-family: inherit;
      }
  
      /********************************************
       * The Panel
       ********************************************/
      .my-accessibility-widget .widget-panel {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 370px;
        max-height: 85vh;
        background-color: #fff;
        border: 2px solid #0057b8 !important;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        display: none;
        flex-direction: column;
        overflow: hidden;
      }
      .my-accessibility-widget.open .widget-panel {
        display: flex;
      }
  
      /********************************************
       * Top Bar
       ********************************************/
      .my-accessibility-widget .panel-top-bar {
        background-color: #f8f8f8;
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
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
  
      /********************************************
       * Tabs
       ********************************************/
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
  
      /********************************************
       * Tab Content (grid style like your screenshot)
       ********************************************/
      .my-accessibility-widget .tab-content {
        display: none;
        padding: 10px;
        overflow-y: auto;
        flex: 1;
      }
      .my-accessibility-widget .tab-content.active {
        display: block;
      }
  
      /* We'll display items in a responsive grid with cards */
      .my-accessibility-widget .grid-section {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 10px;
      }
      .my-accessibility-widget .grid-item {
        background: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 10px;
        text-align: center;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        min-height: 90px;
      }
      .my-accessibility-widget .grid-item:hover {
        background: #eee;
      }
      .my-accessibility-widget .grid-item i {
        font-size: 20px;
        color: #0057b8;
      }
      .my-accessibility-widget .grid-item .toggle-text {
        font-size: 14px;
        color: #333;
      }
  
      /********************************************
       * Toggle Switch
       ********************************************/
      .my-accessibility-widget .toggle-switch {
        position: relative;
        width: 40px;
        height: 20px;
        display: inline-block;
      }
      .my-accessibility-widget .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .my-accessibility-widget .slider {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #ccc;
        border-radius: 20px;
        transition: .4s;
      }
      .my-accessibility-widget .slider:before {
        position: absolute;
        content: "";
        height: 14px;
        width: 14px;
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
        transform: translateX(20px);
      }
  
      /********************************************
       * Additional styling for sections, buttons
       ********************************************/
      .my-accessibility-widget .section-header {
        margin: 10px 0 5px;
        font-weight: bold;
        font-size: 14px;
        color: #333;
      }
      .my-accessibility-widget .access-btn {
        display: inline-block;
        background-color: #eee;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 13px;
        margin-right: 5px;
        cursor: pointer;
      }
      .my-accessibility-widget .access-btn:hover {
        background-color: #ddd;
      }
    `;
    document.head.appendChild(localStyle);
  
    /*******************************************************
     *  3. CREATE THE FLOATING TOGGLE BUTTON
     *******************************************************/
    const toggleButton = document.createElement("button");
    toggleButton.className = "widget-toggle-btn";
    toggleButton.innerHTML = `<i class="fas fa-universal-access"></i>`;
    toggleButton.title = "Open Accessibility Options";
    toggleButton.addEventListener("click", () => {
      isWidgetOpen = !isWidgetOpen;
      widgetContainer.classList.toggle("open", isWidgetOpen);
    });
    widgetContainer.appendChild(toggleButton);
  
    /*******************************************************
     *  4. CREATE THE PANEL (Top Bar + Tabs)
     *******************************************************/
    const widgetPanel = document.createElement("div");
    widgetPanel.className = "widget-panel";
    widgetContainer.appendChild(widgetPanel);
  
    /* 4A. TOP BAR: reset, statement, hide, dictionary search */
    const topBar = document.createElement("div");
    topBar.className = "panel-top-bar";
    widgetPanel.appendChild(topBar);
  
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset Settings";
    resetBtn.addEventListener("click", () => {
      resetAllClasses();
      // Also uncheck toggles
      widgetPanel.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.checked = false;
      });
    });
    topBar.appendChild(resetBtn);
  
    const statementBtn = document.createElement("button");
    statementBtn.textContent = "Statement";
    statementBtn.addEventListener("click", () => {
      alert("Accessibility Statement (placeholder).");
    });
    topBar.appendChild(statementBtn);
  
    const hideBtn = document.createElement("button");
    hideBtn.textContent = "Hide Interface";
    hideBtn.addEventListener("click", hideWidgetInterface);
    topBar.appendChild(hideBtn);
  
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Unclear content? Search in dictionary...";
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        dictionarySearch(searchInput.value);
      }
    });
    topBar.appendChild(searchInput);
  
    /* 4B. TABS (Profiles, Content, Color, Orientation) */
    const tabsContainer = document.createElement("div");
    tabsContainer.className = "tabs";
    widgetPanel.appendChild(tabsContainer);
  
    const tabNames = ["Profiles", "Content", "Color", "Orientation"];
    const tabButtons = [];
    const tabContents = [];
  
    function createTab(name) {
      const tabBtn = document.createElement("button");
      tabBtn.className = "tab-btn";
      tabBtn.textContent = name;
      tabsContainer.appendChild(tabBtn);
  
      const tabContent = document.createElement("div");
      tabContent.className = "tab-content";
      widgetPanel.appendChild(tabContent);
  
      tabButtons.push(tabBtn);
      tabContents.push(tabContent);
  
      tabBtn.addEventListener("click", () => {
        tabButtons.forEach((b, i) => {
          b.classList.remove("active");
          tabContents[i].classList.remove("active");
        });
        tabBtn.classList.add("active");
        tabContent.classList.add("active");
      });
    }
  
    tabNames.forEach(createTab);
    // Activate first tab by default
    tabButtons[0].classList.add("active");
    tabContents[0].classList.add("active");
  
    // Helper: create a single OFF/ON toggle card in a grid style
    function createToggleCard(iconClass, label, onToggle) {
      // A card that shows OFF/ON plus an icon & label
      const card = document.createElement("div");
      card.className = "grid-item";
  
      // Icon
      const icon = document.createElement("i");
      icon.className = iconClass;
      card.appendChild(icon);
  
      // Label text
      const labelEl = document.createElement("div");
      labelEl.className = "toggle-text";
      labelEl.textContent = label;
      card.appendChild(labelEl);
  
      // OFF/ON switch
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
  
      // OFF / ON labels or just the switch
      // The screenshot shows "OFF" and "ON" text, but here we do a slider.
      // If you want explicit text: card can display them. 
      // For now, we'll just show the slider for a clean look.
      card.appendChild(toggleWrap);
  
      return card;
    }
  
    /*******************************************************
     *  5. POPULATE TABS
     *******************************************************/
  
    /* ---------------------
        TAB 1: PROFILES
    ----------------------*/
    const profilesTab = tabContents[0];
    // We'll create a grid container for the cards
    const profilesGrid = document.createElement("div");
    profilesGrid.className = "grid-section";
    profilesTab.appendChild(profilesGrid);
  
    // Each profile is a toggle card
    profilesGrid.appendChild(
      createToggleCard("fas fa-bolt", "Seizure Safe Profile", (checked) => {
        toggleBodyClass("seizure-safe-profile");
      })
    );
    profilesGrid.appendChild(
      createToggleCard("fas fa-eye", "Vision Impaired Profile", (checked) => {
        toggleBodyClass("vision-impaired-profile");
      })
    );
    profilesGrid.appendChild(
      createToggleCard("fas fa-brain", "ADHD Friendly Profile", (checked) => {
        toggleBodyClass("adhd-friendly-profile");
      })
    );
    profilesGrid.appendChild(
      createToggleCard("fas fa-user-graduate", "Cognitive Disability", (checked) => {
        toggleBodyClass("cognitive-profile");
      })
    );
    profilesGrid.appendChild(
      createToggleCard("fas fa-keyboard", "Keyboard Navigation", (checked) => {
        toggleBodyClass("keyboard-navigation");
      })
    );
    profilesGrid.appendChild(
      createToggleCard("fas fa-blind", "Blind Users (Screen Reader)", (checked) => {
        toggleBodyClass("screen-reader-enabled");
      })
    );
  
    /* ---------------------
        TAB 2: CONTENT
    ----------------------*/
    const contentTab = tabContents[1];
    // We'll make a grid for the main toggles
    const contentGrid = document.createElement("div");
    contentGrid.className = "grid-section";
    contentTab.appendChild(contentGrid);
  
    // 1) Fixed Text Size (dropdown)
    const textSizeCard = document.createElement("div");
    textSizeCard.className = "grid-item";
    const textSizeIcon = document.createElement("i");
    textSizeIcon.className = "fas fa-text-height";
    const textSizeLabel = document.createElement("div");
    textSizeLabel.className = "toggle-text";
    textSizeLabel.textContent = "Fixed Text Size";
    const textSizeSelect = document.createElement("select");
    [
      { value: "", label: "Default" },
      { value: "fixed-text-size-125", label: "125%" },
      { value: "fixed-text-size-150", label: "150%" },
      { value: "fixed-text-size-175", label: "175%" },
      { value: "fixed-text-size-200", label: "200%" },
    ].forEach((opt) => {
      const optionEl = document.createElement("option");
      optionEl.value = opt.value;
      optionEl.textContent = opt.label;
      textSizeSelect.appendChild(optionEl);
    });
    textSizeSelect.addEventListener("change", (e) => {
      updateFixedTextSize(e.target.value);
    });
    textSizeCard.appendChild(textSizeIcon);
    textSizeCard.appendChild(textSizeLabel);
    textSizeCard.appendChild(textSizeSelect);
    contentGrid.appendChild(textSizeCard);
  
    // 2) Additional toggles
    contentGrid.appendChild(
      createToggleCard("fas fa-expand", "Content Scaling", (checked) => {
        toggleBodyClass("content-scaling");
      })
    );
    contentGrid.appendChild(
      createToggleCard("fas fa-font", "Readable Font", (checked) => {
        toggleBodyClass("readable-font");
      })
    );
    contentGrid.appendChild(
      createToggleCard("fas fa-heading", "Highlight Titles", (checked) => {
        toggleBodyClass("highlight-titles");
      })
    );
    contentGrid.appendChild(
      createToggleCard("fas fa-link", "Highlight Links", (checked) => {
        toggleBodyClass("highlight-links");
      })
    );
    contentGrid.appendChild(
      createToggleCard("fas fa-search-plus", "Text Magnifier", (checked) => {
        toggleBodyClass("text-magnifier");
      })
    );
  
    // 3) Another row for line-height, letter-spacing, alignment
    // We can create separate "cards" or just inline them
    const spacingCard = document.createElement("div");
    spacingCard.className = "grid-item";
    spacingCard.innerHTML = `
      <i class="fas fa-text-height"></i>
      <div class="toggle-text">Line Height</div>
    `;
    const lineHeightSelect = document.createElement("select");
    [
      { value: "", label: "Default" },
      { value: "line-height-2", label: "1.8" },
      { value: "line-height-3", label: "2.0" },
    ].forEach((opt) => {
      const o = document.createElement("option");
      o.value = opt.value;
      o.textContent = opt.label;
      lineHeightSelect.appendChild(o);
    });
    lineHeightSelect.addEventListener("change", () => {
      document.body.classList.remove("line-height-2", "line-height-3");
      if (lineHeightSelect.value) {
        document.body.classList.add(lineHeightSelect.value);
      }
    });
    spacingCard.appendChild(lineHeightSelect);
    contentGrid.appendChild(spacingCard);
  
    const letterCard = document.createElement("div");
    letterCard.className = "grid-item";
    letterCard.innerHTML = `
      <i class="fas fa-arrows-alt-h"></i>
      <div class="toggle-text">Letter Spacing</div>
    `;
    const letterSelect = document.createElement("select");
    [
      { value: "", label: "Default" },
      { value: "letter-spacing-2", label: "+1px" },
      { value: "letter-spacing-3", label: "+2px" },
    ].forEach((opt) => {
      const o = document.createElement("option");
      o.value = opt.value;
      o.textContent = opt.label;
      letterSelect.appendChild(o);
    });
    letterSelect.addEventListener("change", () => {
      document.body.classList.remove("letter-spacing-2", "letter-spacing-3");
      if (letterSelect.value) {
        document.body.classList.add(letterSelect.value);
      }
    });
    letterCard.appendChild(letterSelect);
    contentGrid.appendChild(letterCard);
  
    const alignCard = document.createElement("div");
    alignCard.className = "grid-item";
    alignCard.innerHTML = `
      <i class="fas fa-align-left"></i>
      <div class="toggle-text">Text Alignment</div>
    `;
    const alignSelect = document.createElement("select");
    [
      { value: "", label: "Default" },
      { value: "align-left", label: "Left" },
      { value: "align-center", label: "Center" },
      { value: "align-right", label: "Right" },
    ].forEach((opt) => {
      const o = document.createElement("option");
      o.value = opt.value;
      o.textContent = opt.label;
      alignSelect.appendChild(o);
    });
    alignSelect.addEventListener("change", () => {
      document.body.classList.remove("align-left", "align-center", "align-right");
      if (alignSelect.value) {
        document.body.classList.add(alignSelect.value);
      }
    });
    alignCard.appendChild(alignSelect);
    contentGrid.appendChild(alignCard);
  
    /* ---------------------
        TAB 3: COLOR
    ----------------------*/
    const colorTab = tabContents[2];
    const colorGrid = document.createElement("div");
    colorGrid.className = "grid-section";
    colorTab.appendChild(colorGrid);
  
    colorGrid.appendChild(
      createToggleCard("fas fa-moon", "Dark Contrast", (checked) => {
        toggleBodyClass("dark-contrast");
      })
    );
    colorGrid.appendChild(
      createToggleCard("fas fa-sun", "Light Contrast", (checked) => {
        toggleBodyClass("light-contrast");
      })
    );
    colorGrid.appendChild(
      createToggleCard("fas fa-adjust", "High Contrast", (checked) => {
        toggleBodyClass("high-contrast");
      })
    );
    colorGrid.appendChild(
      createToggleCard("fas fa-tint", "High Saturation", (checked) => {
        toggleBodyClass("high-saturation");
      })
    );
    colorGrid.appendChild(
      createToggleCard("fas fa-tint-slash", "Low Saturation", (checked) => {
        toggleBodyClass("low-saturation");
      })
    );
    colorGrid.appendChild(
      createToggleCard("fas fa-eye-dropper", "Monochrome", (checked) => {
        toggleBodyClass("monochrome");
      })
    );
  
    // Manual text color swatches
    const textColorCard = document.createElement("div");
    textColorCard.className = "grid-item";
    textColorCard.innerHTML = `
      <i class="fas fa-palette"></i>
      <div class="toggle-text">Text Color</div>
    `;
    const textSwatches = document.createElement("div");
    textSwatches.style.display = "flex";
    textSwatches.style.flexWrap = "wrap";
    textSwatches.style.gap = "4px";
    ["#000", "#333", "#f00", "#0f0", "#00f", "#fff"].forEach((color) => {
      const sw = document.createElement("div");
      sw.className = "color-swatch";
      sw.style.backgroundColor = color;
      sw.addEventListener("click", () => {
        document.body.style.color = color;
      });
      textSwatches.appendChild(sw);
    });
    const cancelText = document.createElement("button");
    cancelText.textContent = "Reset";
    cancelText.style.fontSize = "10px";
    cancelText.addEventListener("click", () => {
      document.body.style.color = "";
    });
    textSwatches.appendChild(cancelText);
    textColorCard.appendChild(textSwatches);
    colorGrid.appendChild(textColorCard);
  
    // Manual background color swatches
    const bgColorCard = document.createElement("div");
    bgColorCard.className = "grid-item";
    bgColorCard.innerHTML = `
      <i class="fas fa-fill-drip"></i>
      <div class="toggle-text">Background Color</div>
    `;
    const bgSwatches = document.createElement("div");
    bgSwatches.style.display = "flex";
    bgSwatches.style.flexWrap = "wrap";
    bgSwatches.style.gap = "4px";
    ["#fff", "#eee", "#ccc", "#f00", "#0f0", "#00f"].forEach((color) => {
      const sw = document.createElement("div");
      sw.className = "color-swatch";
      sw.style.backgroundColor = color;
      sw.addEventListener("click", () => {
        document.body.style.backgroundColor = color;
      });
      bgSwatches.appendChild(sw);
    });
    const cancelBg = document.createElement("button");
    cancelBg.textContent = "Reset";
    cancelBg.style.fontSize = "10px";
    cancelBg.addEventListener("click", () => {
      document.body.style.backgroundColor = "";
    });
    bgSwatches.appendChild(cancelBg);
    bgColorCard.appendChild(bgSwatches);
    colorGrid.appendChild(bgColorCard);
  
    /* ---------------------
        TAB 4: ORIENTATION
    ----------------------*/
    const orientationTab = tabContents[3];
    const orientationGrid = document.createElement("div");
    orientationGrid.className = "grid-section";
    orientationTab.appendChild(orientationGrid);
  
    orientationGrid.appendChild(
      createToggleCard("fas fa-volume-mute", "Mute Sounds", (checked) => {
        toggleBodyClass("mute-sounds");
      })
    );
    orientationGrid.appendChild(
      createToggleCard("far fa-image", "Hide Images", (checked) => {
        toggleBodyClass("hide-images");
      })
    );
    orientationGrid.appendChild(
      createToggleCard("fas fa-book", "Read Mode", (checked) => {
        toggleBodyClass("read-mode");
      })
    );
    orientationGrid.appendChild(
      createToggleCard("fas fa-grip-lines", "Reading Guide", (checked) => {
        toggleBodyClass("reading-guide");
      })
    );
    orientationGrid.appendChild(
      createToggleCard("fas fa-stop", "Stop Animations", (checked) => {
        toggleBodyClass("stop-animations");
      })
    );
    orientationGrid.appendChild(
      createToggleCard("fas fa-mask", "Reading Mask", (checked) => {
        toggleBodyClass("reading-mask");
      })
    );
    orientationGrid.appendChild(
      createToggleCard("fas fa-mouse-pointer", "Highlight Hover", (checked) => {
        toggleBodyClass("highlight-hover");
      })
    );
    orientationGrid.appendChild(
      createToggleCard("fas fa-crosshairs", "Highlight Focus", (checked) => {
        toggleBodyClass("highlight-focus");
      })
    );
    orientationGrid.appendChild(
      createToggleCard("fas fa-mouse-pointer", "Big Black Cursor", (checked) => {
        toggleBodyClass("big-black-cursor");
        if (checked) document.body.classList.remove("big-white-cursor");
      })
    );
    orientationGrid.appendChild(
      createToggleCard("fas fa-mouse-pointer", "Big White Cursor", (checked) => {
        toggleBodyClass("big-white-cursor");
        if (checked) document.body.classList.remove("big-black-cursor");
      })
    );
  
    // Additional: Screen Reader & More Options
    const srContainer = document.createElement("div");
    srContainer.style.marginTop = "10px";
    orientationTab.appendChild(srContainer);
  
    const srHeader = document.createElement("div");
    srHeader.className = "section-header";
    srHeader.textContent = "Screen Reader";
    srContainer.appendChild(srHeader);
  
    const readAloudBtn = document.createElement("button");
    readAloudBtn.className = "access-btn";
    readAloudBtn.innerHTML = `<i class="fas fa-volume-up"></i> Read Aloud`;
    readAloudBtn.addEventListener("click", speakPage);
    srContainer.appendChild(readAloudBtn);
  
    const stopReadingBtn = document.createElement("button");
    stopReadingBtn.className = "access-btn";
    stopReadingBtn.innerHTML = `<i class="fas fa-stop"></i> Stop Reading`;
    stopReadingBtn.addEventListener("click", cancelSpeech);
    srContainer.appendChild(stopReadingBtn);
  
    // Useful Links
    const linksHeader = document.createElement("div");
    linksHeader.className = "section-header";
    linksHeader.textContent = "Useful Links";
    srContainer.appendChild(linksHeader);
  
    const linksSelect = document.createElement("select");
    const linkItems = [
      { label: "Select an option", url: "" },
      { label: "Google", url: "https://google.com" },
      { label: "W3C Accessibility", url: "https://www.w3.org/WAI/" },
    ];
    linkItems.forEach((item) => {
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
    srContainer.appendChild(linksSelect);
  
    // "See All Options" placeholder button
    const moreOptionsBtn = document.createElement("button");
    moreOptionsBtn.className = "access-btn";
    moreOptionsBtn.style.marginTop = "8px";
    moreOptionsBtn.innerHTML = `<i class="fas fa-ellipsis-h"></i> See All Options`;
    moreOptionsBtn.addEventListener("click", () => {
      widgetContainer.classList.toggle("show-all");
      moreOptionsBtn.innerText = widgetContainer.classList.contains("show-all")
        ? "Hide Extra Options"
        : "See All Options";
    });
    srContainer.appendChild(moreOptionsBtn);
  
    /*******************************************************
     *  6. ATTACH THE WIDGET CONTAINER TO THE DOCUMENT
     *******************************************************/
    document.body.appendChild(widgetContainer);
  })();
  