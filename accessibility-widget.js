(function () {
    /************************************************************
     * 0. HELPER FUNCTIONS & GLOBAL STATE
     ************************************************************/
    let isWidgetOpen = false;
    
    // Toggle a CSS class on the <body>
    function toggleBodyClass(className) {
      document.body.classList.toggle(className);
    }
    
    // Reset all accessibility classes (for our features)
    function resetAllClasses() {
      const classes = [
        "high-contrast", "dyslexia-font", "bigger-text",
        "highlight-links", "pause-animations", "hide-images",
        "big-cursor", "tooltips-enabled", "page-structure-active"
      ];
      classes.forEach((cls) => document.body.classList.remove(cls));
    }
    
    /************************************************************
     * 1. FORCED OVERRIDES CSS (Using !important)
     ************************************************************/
    const overrideStyleEl = document.createElement("style");
    overrideStyleEl.id = "accessibility-overrides";
    overrideStyleEl.innerHTML = `
      /* High Contrast Mode */
      body.high-contrast {
        background-color: #000 !important;
        color: #fff !important;
      }
      body.high-contrast a {
        color: #0ff !important;
      }
      
      /* Dyslexia-Friendly Font */
      body.dyslexia-font {
        font-family: 'OpenDyslexic', Arial, sans-serif !important;
      }
      
      /* Bigger Text */
      body.bigger-text * {
        font-size: 120% !important;
        line-height: 1.4 !important;
      }
      
      /* Highlight Links */
      body.highlight-links a {
        outline: 2px dashed red !important;
        background-color: yellow !important;
      }
      
      /* Pause Animations */
      body.pause-animations * {
        animation: none !important;
        transition: none !important;
      }
      
      /* Hide Images */
      body.hide-images img,
      body.hide-images picture,
      body.hide-images figure {
        display: none !important;
      }
      
      /* Big Cursor (example using a custom icon URL) */
      body.big-cursor {
        cursor: url('https://cdn-icons-png.flaticon.com/512/892/892693.png'), auto !important;
      }
    `;
    document.head.appendChild(overrideStyleEl);
    
    /************************************************************
     * 2. CREATE WIDGET CONTAINER & SCOPED STYLES
     ************************************************************/
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "my-accessibility-widget";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.bottom = "20px";
    widgetContainer.style.right = "20px";
    widgetContainer.style.zIndex = "999999";
    widgetContainer.style.fontFamily = "Arial, sans-serif";
  
    // Local widget CSS (scoped)
    const localStyle = document.createElement("style");
    localStyle.innerHTML = `
      /* Container & Floating Button */
      .my-accessibility-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        font-family: Arial, sans-serif;
      }
      .my-accessibility-widget .widget-toggle-btn {
        background-color: #004a99;
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 22px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      }
      
      /* Panel */
      .my-accessibility-widget .widget-panel {
        display: none;
        position: absolute;
        bottom: 60px;
        right: 0;
        background-color: #fff;
        width: 300px;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      }
      .my-accessibility-widget.open .widget-panel {
        display: block;
      }
      
      /* Grid Layout for Features */
      .my-accessibility-widget .widget-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
      .my-accessibility-widget .widget-feature-btn {
        background-color: #f9f9f9;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-align: center;
        padding: 10px;
        cursor: pointer;
        font-size: 14px;
        color: #333;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .my-accessibility-widget .widget-feature-btn:hover {
        background-color: #e8e8e8;
      }
      .my-accessibility-widget .widget-feature-btn i {
        font-size: 20px;
        margin-bottom: 5px;
      }
    `;
    document.head.appendChild(localStyle);
    
    /************************************************************
     * 3. CREATE THE TOGGLE BUTTON
     ************************************************************/
    const widgetToggleBtn = document.createElement("button");
    widgetToggleBtn.className = "widget-toggle-btn";
    widgetToggleBtn.innerHTML = `<i class="fas fa-universal-access"></i>`;
    widgetToggleBtn.title = "Open Accessibility Options";
    widgetToggleBtn.addEventListener("click", () => {
      isWidgetOpen = !isWidgetOpen;
      widgetContainer.classList.toggle("open", isWidgetOpen);
    });
    widgetContainer.appendChild(widgetToggleBtn);
    
    /************************************************************
     * 4. CREATE THE WIDGET PANEL
     ************************************************************/
    const widgetPanel = document.createElement("div");
    widgetPanel.className = "widget-panel";
    widgetContainer.appendChild(widgetPanel);
    
    // Top Bar (Reset, Statement, Hide, Dictionary Search)
    const topBar = document.createElement("div");
    topBar.className = "panel-top-bar";
    topBar.style.marginBottom = "10px";
    widgetPanel.appendChild(topBar);
    
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset Settings";
    resetBtn.addEventListener("click", resetAllClasses);
    topBar.appendChild(resetBtn);
    
    const statementBtn = document.createElement("button");
    statementBtn.textContent = "Statement";
    statementBtn.addEventListener("click", () => {
      alert("Accessibility Statement (placeholder).");
    });
    topBar.appendChild(statementBtn);
    
    const hideBtn = document.createElement("button");
    hideBtn.textContent = "Hide Interface";
    hideBtn.addEventListener("click", () => {
      widgetContainer.style.display = "none";
    });
    topBar.appendChild(hideBtn);
    
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Dictionary search...";
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        dictionarySearch(searchInput.value);
      }
    });
    topBar.appendChild(searchInput);
    
    // Grid of Feature Buttons
    const grid = document.createElement("div");
    grid.className = "widget-grid";
    widgetPanel.appendChild(grid);
    
    // Helper to create each feature button
    function createFeatureButton(iconClass, label, onClick) {
      const btn = document.createElement("div");
      btn.className = "widget-feature-btn";
      btn.innerHTML = `<i class="${iconClass}"></i><span>${label}</span>`;
      btn.addEventListener("click", onClick);
      return btn;
    }
    
    // Feature: High Contrast (Toggle)
    const contrastBtn = createFeatureButton("fas fa-adjust", "High Contrast", () => {
      toggleBodyClass("high-contrast");
    });
    grid.appendChild(contrastBtn);
    
    // Feature: Screen Reader (Text-to-Speech)
    const synth = window.speechSynthesis;
    let readingUtterance = null;
    const screenReaderBtn = createFeatureButton("fas fa-volume-up", "Screen Reader", () => {
      if (synth.speaking) return;
      const text = document.body.innerText;
      readingUtterance = new SpeechSynthesisUtterance(text);
      readingUtterance.rate = 1;
      readingUtterance.pitch = 1;
      synth.speak(readingUtterance);
    });
    grid.appendChild(screenReaderBtn);
    
    // Feature: Smart Contrast (Alternate Toggle)
    const smartContrastBtn = createFeatureButton("fas fa-adjust", "Smart Contrast", () => {
      document.body.classList.toggle("high-contrast-2");
    });
    grid.appendChild(smartContrastBtn);
    
    // Feature: Highlight Links
    const highlightLinksBtn = createFeatureButton("fas fa-link", "Highlight Links", () => {
      toggleBodyClass("highlight-links");
    });
    grid.appendChild(highlightLinksBtn);
    
    // Feature: Bigger Text
    const biggerTextBtn = createFeatureButton("fas fa-text-height", "Bigger Text", () => {
      toggleBodyClass("bigger-text");
    });
    grid.appendChild(biggerTextBtn);
    
    // Feature: Text Spacing (Placeholder)
    const textSpacingBtn = createFeatureButton("fas fa-text-width", "Text Spacing", () => {
      toggleBodyClass("text-spacing");
    });
    grid.appendChild(textSpacingBtn);
    
    // Feature: Pause Animations
    const pauseAnimationsBtn = createFeatureButton("fas fa-pause-circle", "Pause Animations", () => {
      toggleBodyClass("pause-animations");
    });
    grid.appendChild(pauseAnimationsBtn);
    
    // Feature: Hide Images
    const hideImagesBtn = createFeatureButton("far fa-image", "Hide Images", () => {
      toggleBodyClass("hide-images");
    });
    grid.appendChild(hideImagesBtn);
    
    // Feature: Dyslexia-Friendly Font
    const dyslexiaBtn = createFeatureButton("fas fa-font", "Dyslexia Friendly", () => {
      toggleBodyClass("dyslexia-font");
    });
    grid.appendChild(dyslexiaBtn);
    
    // Feature: Cursor (Custom)
    const cursorBtn = createFeatureButton("fas fa-mouse-pointer", "Custom Cursor", () => {
      toggleBodyClass("big-cursor");
      if (document.body.classList.contains("big-cursor")) {
        document.body.style.cursor = "url('https://cdn-icons-png.flaticon.com/512/892/892693.png'), auto";
      } else {
        document.body.style.cursor = "auto";
      }
    });
    grid.appendChild(cursorBtn);
    
    // Feature: Tooltips (Placeholder)
    const tooltipsBtn = createFeatureButton("fas fa-comment-dots", "Tooltips", () => {
      alert("Tooltips toggled (placeholder).");
    });
    grid.appendChild(tooltipsBtn);
    
    // Feature: Page Structure (Placeholder)
    const pageStructureBtn = createFeatureButton("fas fa-sitemap", "Page Structure", () => {
      alert("Page Structure toggled (placeholder).");
    });
    grid.appendChild(pageStructureBtn);
    
    /***************************************************************
     * 5. ATTACH THE WIDGET CONTAINER TO THE DOCUMENT
     ***************************************************************/
    document.body.appendChild(widgetContainer);
  })();
  