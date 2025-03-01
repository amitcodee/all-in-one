(function () {
    /* =========================================
     * 1. CREATE THE WIDGET ELEMENTS & STYLES
     * ========================================= */
  
    // Container for everything
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "my-accessibility-widget";
  
    // Floating toggle button
    const widgetToggleBtn = document.createElement("button");
    widgetToggleBtn.className = "widget-toggle-btn";
    widgetToggleBtn.innerHTML = '<i class="fas fa-universal-access"></i>';
  
    // Panel with all accessibility options
    const widgetPanel = document.createElement("div");
    widgetPanel.className = "widget-panel";
  
    // Create a style element to avoid polluting global CSS
    const style = document.createElement("style");
    style.innerHTML = `
      /* Container styling */
      .my-accessibility-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999; 
        font-family: Arial, sans-serif;
      }
  
      /* Toggle button styling */
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
  
      /* The panel that appears on toggle */
      .my-accessibility-widget .widget-panel {
        display: none; /* hidden by default */
        position: absolute;
        bottom: 60px; /* just above the toggle button */
        right: 0;
        background-color: #fff;
        width: 300px;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      }
  
      /* Panel open state */
      .my-accessibility-widget.open .widget-panel {
        display: block;
      }
  
      /* Grid of feature buttons */
      .my-accessibility-widget .widget-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
  
      /* Each feature button */
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
  
      /* =============== Accessibility Classes =============== */
      /* High contrast */
      body.high-contrast {
        background-color: #000 !important;
        color: #fff !important;
      }
      body.high-contrast a {
        color: #0ff !important;
      }
  
      /* Dyslexia-friendly font (placeholder: you can load a real dyslexia font) */
      body.dyslexia-font {
        font-family: 'OpenDyslexic', Arial, sans-serif !important;
      }
  
      /* Bigger text */
      body.bigger-text * {
        font-size: 120% !important;
        line-height: 1.4 !important;
      }
  
      /* Highlight links */
      body.highlight-links a {
        outline: 2px dashed red !important;
        background-color: yellow !important;
      }
  
      /* Pause animations */
      body.pause-animations * {
        animation: none !important;
        transition: none !important;
      }
  
      /* Hide images */
      body.hide-images img, 
      body.hide-images picture, 
      body.hide-images figure {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  
    /* =========================================
     * 2. BUILD THE GRID OF FEATURE BUTTONS
     * ========================================= */
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
  
    /* ========== Feature: Contrast + (Toggle High Contrast) ========== */
    const contrastBtn = createFeatureButton("fas fa-adjust", "Contrast +", () => {
      document.body.classList.toggle("high-contrast");
    });
    grid.appendChild(contrastBtn);
  
    /* ========== Feature: Screen Reader (Text-to-Speech) ========== */
    const synth = window.speechSynthesis;
    let readingUtterance = null;
    const screenReaderBtn = createFeatureButton("fas fa-volume-up", "Screen Reader", () => {
      if (synth.speaking) return; // If already speaking, do nothing
      const text = document.body.innerText;
      readingUtterance = new SpeechSynthesisUtterance(text);
      readingUtterance.rate = 1;
      readingUtterance.pitch = 1;
      synth.speak(readingUtterance);
    });
    grid.appendChild(screenReaderBtn);
  
    /* ========== Feature: Smart Contrast (placeholder logic) ========== */
    // Could be a second type of contrast or color inversion
    const smartContrastBtn = createFeatureButton("fas fa-adjust", "Smart Contrast", () => {
      // Example: invert colors or toggle a different class
      // For demonstration, we'll just toggle a second 'high-contrast' variant
      document.body.classList.toggle("high-contrast-2");
    });
    // We haven't defined "high-contrast-2" in the style, so you can customize
    grid.appendChild(smartContrastBtn);
  
    /* ========== Feature: Highlight Links ========== */
    const highlightLinksBtn = createFeatureButton("fas fa-link", "Highlight Links", () => {
      document.body.classList.toggle("highlight-links");
    });
    grid.appendChild(highlightLinksBtn);
  
    /* ========== Feature: Bigger Text ========== */
    const biggerTextBtn = createFeatureButton("fas fa-text-height", "Bigger Text", () => {
      document.body.classList.toggle("bigger-text");
    });
    grid.appendChild(biggerTextBtn);
  
    /* ========== Feature: Text Spacing ========== */
    // Example: Increase letter spacing or line-height
    const textSpacingBtn = createFeatureButton("fas fa-text-width", "Text Spacing", () => {
      // Toggle a class that modifies spacing
      document.body.classList.toggle("text-spacing");
      // You can define .text-spacing in your CSS with letter-spacing or line-height
    });
    grid.appendChild(textSpacingBtn);
  
    /* ========== Feature: Pause Animations ========== */
    const pauseAnimationsBtn = createFeatureButton("fas fa-pause-circle", "Pause Animations", () => {
      document.body.classList.toggle("pause-animations");
    });
    grid.appendChild(pauseAnimationsBtn);
  
    /* ========== Feature: Hide Images ========== */
    const hideImagesBtn = createFeatureButton("far fa-image", "Hide Images", () => {
      document.body.classList.toggle("hide-images");
    });
    grid.appendChild(hideImagesBtn);
  
    /* ========== Feature: Dyslexia Friendly ========== */
    const dyslexiaBtn = createFeatureButton("fas fa-font", "Dyslexia Friendly", () => {
      document.body.classList.toggle("dyslexia-font");
    });
    grid.appendChild(dyslexiaBtn);
  
    /* ========== Feature: Cursor (placeholder) ========== */
    // Could toggle a large cursor or custom cursor
    const cursorBtn = createFeatureButton("fas fa-mouse-pointer", "Cursor", () => {
      // Example: toggle a big cursor
      document.body.classList.toggle("big-cursor");
      if (document.body.classList.contains("big-cursor")) {
        document.body.style.cursor = "url('https://cdn-icons-png.flaticon.com/512/892/892693.png'), auto";
      } else {
        document.body.style.cursor = "auto";
      }
    });
    grid.appendChild(cursorBtn);
  
    /* ========== Feature: Tooltips (placeholder) ========== */
    const tooltipsBtn = createFeatureButton("fas fa-comment-dots", "Tooltips", () => {
      // Could toggle tooltips on focusable elements
      alert("Tooltips toggled (placeholder). Implement custom logic here.");
    });
    grid.appendChild(tooltipsBtn);
  
    /* ========== Feature: Page Structure (placeholder) ========== */
    const pageStructureBtn = createFeatureButton("fas fa-sitemap", "Page Structure", () => {
      // Could highlight headings, landmarks, etc.
      alert("Page Structure toggled (placeholder). Implement custom logic here.");
    });
    grid.appendChild(pageStructureBtn);
  
    /* =========================================
     * 3. ASSEMBLE & ATTACH TO DOCUMENT
     * ========================================= */
    widgetContainer.appendChild(widgetToggleBtn);
    widgetContainer.appendChild(widgetPanel);
    document.body.appendChild(widgetContainer);
  
    // Toggle the panel on button click
    widgetToggleBtn.addEventListener("click", () => {
      widgetContainer.classList.toggle("open");
    });
  })();
  