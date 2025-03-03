(function () {
  /************************************************************
   * Piece 1: Load Dependencies & Define Global State
   ************************************************************/
  // Global widget state
  let isWidgetOpen = false;
  let isVoiceNavActive = false;
  let recognition; // For SpeechRecognition
  const synth = window.speechSynthesis;
  let readingUtterance = null;

  /************************************************************
   * Piece 2: Helper Functions
   ************************************************************/
  // Toggle a class on <body>
  function toggleBodyClass(cls) {
    document.body.classList.toggle(cls);
  }

  // Reset accessibility settings (remove forced classes)
  function resetAccessibilitySettings() {
    const classesToRemove = [
      "high-contrast", "dyslexia-font", "bigger-text",
      "highlight-links", "pause-animations", "hide-images",
      "big-cursor", "high-contrast-2"
    ];
    classesToRemove.forEach((cls) => document.body.classList.remove(cls));

    // Reset any inline style changes (e.g., cursor, colors)
    document.body.style.cursor = "auto";
    document.body.style.color = "";
    document.body.style.backgroundColor = "";

    // Uncheck toggles and hide any descriptions
    widgetPanel.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });
    widgetPanel.querySelectorAll(".profile-description").forEach(desc => {
      desc.classList.remove("active");
    });
  }

  // Dictionary search placeholder
  function dictionarySearch(query) {
    if (!query.trim()) return;
    alert(`Searching dictionary for: "${query}" (placeholder).`);
  }

  // Hide widget interface
  function hideWidget() {
    widgetContainer.style.display = "none";
  }

  // Text-to-Speech (Screen Reader)
  function speakPage() {
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser doesn't support text-to-speech.");
      return;
    }
    if (synth.speaking) return;
    const text = document.body.innerText || "";
    if (!text.trim()) return alert("No text available to read.");
    readingUtterance = new SpeechSynthesisUtterance(text);
    readingUtterance.lang = "en-US";
    readingUtterance.rate = 1;
    readingUtterance.pitch = 1;
    synth.speak(readingUtterance);
  }

  function cancelSpeech() {
    if (synth.speaking) synth.cancel();
  }

  // Voice Navigation Initialization and Command Handling
  function initVoiceNavigation() {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      alert("Sorry, your browser doesn't support voice navigation.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.addEventListener("result", (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      handleVoiceCommand(command);
    });

    recognition.addEventListener("end", () => {
      if (isVoiceNavActive) recognition.start();
    });
  }

  function handleVoiceCommand(command) {
    console.log("Voice Command:", command);
    if (command.includes("scroll up")) {
      window.scrollBy({ top: -200, behavior: "smooth" });
    } else if (command.includes("scroll down")) {
      window.scrollBy({ top: 200, behavior: "smooth" });
    } else if (command.includes("go to top")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (command.includes("go to bottom")) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else if (command.includes("close panel")) {
      isWidgetOpen = false;
      widgetContainer.classList.remove("open");
    } else if (command.includes("voice off")) {
      stopVoiceNavigation();
    }
    // Add more voice commands as needed.
  }

  function startVoiceNavigation() {
    if (!recognition) initVoiceNavigation();
    isVoiceNavActive = true;
    recognition.start();
  }

  function stopVoiceNavigation() {
    isVoiceNavActive = false;
    if (recognition) recognition.stop();
  }

  /************************************************************
   * Piece 3: Forced Overrides CSS (Using !important)
   ************************************************************/
  const overrideStyleEl = document.createElement("style");
  overrideStyleEl.id = "accessibility-overrides";
  overrideStyleEl.innerHTML = `
    /* High Contrast */
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
    
    /* Big Cursor */
    body.big-cursor {
      cursor: url('https://cdn-icons-png.flaticon.com/512/892/892693.png'), auto !important;
    }
    
    /* Smart Contrast (Alternate) */
    body.high-contrast-2 {
      filter: contrast(150%) brightness(90%);
    }
  `;
  document.head.appendChild(overrideStyleEl);

  /************************************************************
   * Piece 4: Create Widget Container & Local Styles
   ************************************************************/
  const widgetContainer = document.createElement("div");
  widgetContainer.className = "usa-access-widget";
  widgetContainer.setAttribute("role", "complementary");
  widgetContainer.setAttribute("aria-label", "Accessibility Options");
  widgetContainer.style.position = "fixed";
  widgetContainer.style.bottom = "20px";
  widgetContainer.style.right = "20px";
  widgetContainer.style.zIndex = "999999";
  widgetContainer.style.fontFamily = "Arial, sans-serif";

  const localStyleEl = document.createElement("style");
  localStyleEl.innerHTML = `
    /* Floating Toggle Button */
    .usa-access-widget .toggle-btn {
      width: 60px;
      height: 60px;
      border: none;
      border-radius: 50%;
      background-color: #004a99;
      color: #fff;
      font-size: 26px;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /* Widget Panel */
    .usa-access-widget .widget-panel {
      display: none;
      position: absolute;
      bottom: 70px;
      right: 0;
      background-color: #fff;
      width: 360px;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .usa-access-widget.open .widget-panel {
      display: block;
    }
    /* Top Bar */
    .usa-access-widget .panel-top-bar {
      background-color: #f9f9f9;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .usa-access-widget .panel-top-bar button {
      background-color: #eee;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 13px;
      cursor: pointer;
    }
    .usa-access-widget .panel-top-bar button:hover {
      background-color: #ddd;
    }
    .usa-access-widget .panel-top-bar input[type="text"] {
      flex: 1;
      padding: 6px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 13px;
    }
    /* Grid Layout for Feature Buttons */
    .usa-access-widget .widget-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    .usa-access-widget .widget-feature-btn {
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
    .usa-access-widget .widget-feature-btn:hover {
      background-color: #e8e8e8;
    }
    .usa-access-widget .widget-feature-btn i {
      font-size: 20px;
      margin-bottom: 5px;
    }
    /* Voice Navigation Button */
    .usa-access-widget .voice-nav-btn {
      grid-column: span 3;
      background-color: #008000;
      color: #fff;
    }
  `;
  document.head.appendChild(localStyleEl);

  /************************************************************
   * Piece 5: Create Toggle Button (Floating)
   ************************************************************/
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "toggle-btn";
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.setAttribute("aria-controls", "usa-access-widget-panel");
  toggleBtn.innerHTML = `<i class="fas fa-universal-access"></i>`;
  toggleBtn.title = "Open Accessibility Options";
  toggleBtn.addEventListener("click", () => {
    isWidgetOpen = !isWidgetOpen;
    toggleBtn.setAttribute("aria-expanded", isWidgetOpen ? "true" : "false");
    widgetContainer.classList.toggle("open", isWidgetOpen);
  });
  widgetContainer.appendChild(toggleBtn);

  /************************************************************
   * Piece 6: Create Widget Panel (Top Bar + Feature Grid)
   ************************************************************/
  const widgetPanel = document.createElement("div");
  widgetPanel.className = "widget-panel";
  widgetPanel.id = "usa-access-widget-panel";
  widgetPanel.setAttribute("role", "region");
  widgetPanel.setAttribute("aria-label", "Accessibility Options Panel");
  widgetContainer.appendChild(widgetPanel);

  // 6A. Top Bar: Reset, Statement, Hide, Dictionary Search
  const topBar = document.createElement("div");
  topBar.className = "panel-top-bar";
  widgetPanel.appendChild(topBar);

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset Settings";
  resetBtn.addEventListener("click", resetAccessibilitySettings);
  topBar.appendChild(resetBtn);

  const statementBtn = document.createElement("button");
  statementBtn.textContent = "Statement";
  statementBtn.addEventListener("click", () => {
    alert("Accessibility Statement (placeholder).\nEnsure compliance with ADA and Section 508 guidelines.");
  });
  topBar.appendChild(statementBtn);

  const hideBtn = document.createElement("button");
  hideBtn.textContent = "Hide Interface";
  hideBtn.addEventListener("click", hideWidget);
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

  // 6B. Grid of Feature Buttons
  const grid = document.createElement("div");
  grid.className = "widget-grid";
  widgetPanel.appendChild(grid);

  // Helper: Create feature buttons with ARIA support
  function createFeatureButton(iconClass, label, callback) {
    const btn = document.createElement("div");
    btn.className = "widget-feature-btn";
    btn.setAttribute("role", "button");
    btn.setAttribute("tabindex", "0");
    btn.innerHTML = `<i class="${iconClass}"></i><span>${label}</span>`;
    btn.addEventListener("click", callback);
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        callback();
      }
    });
    return btn;
  }

  // --- Core Features ---
  grid.appendChild(createFeatureButton("fas fa-adjust", "High Contrast", () => {
    toggleBodyClass("high-contrast");
  }));

  grid.appendChild(createFeatureButton("fas fa-volume-up", "Screen Reader", () => {
    if (!synth.speaking) {
      const text = document.body.innerText;
      readingUtterance = new SpeechSynthesisUtterance(text);
      readingUtterance.rate = 1;
      readingUtterance.pitch = 1;
      synth.speak(readingUtterance);
    }
  }));

  grid.appendChild(createFeatureButton("fas fa-adjust", "Smart Contrast", () => {
    toggleBodyClass("high-contrast-2");
  }));

  grid.appendChild(createFeatureButton("fas fa-link", "Highlight Links", () => {
    toggleBodyClass("highlight-links");
  }));

  grid.appendChild(createFeatureButton("fas fa-text-height", "Bigger Text", () => {
    toggleBodyClass("bigger-text");
  }));

  grid.appendChild(createFeatureButton("fas fa-pause-circle", "Pause Animations", () => {
    toggleBodyClass("pause-animations");
  }));

  grid.appendChild(createFeatureButton("far fa-image", "Hide Images", () => {
    toggleBodyClass("hide-images");
  }));

  grid.appendChild(createFeatureButton("fas fa-font", "Dyslexia Friendly", () => {
    toggleBodyClass("dyslexia-font");
  }));

  grid.appendChild(createFeatureButton("fas fa-mouse-pointer", "Custom Cursor", () => {
    toggleBodyClass("big-cursor");
    if (document.body.classList.contains("big-cursor")) {
      document.body.style.cursor = "url('https://cdn-icons-png.flaticon.com/512/892/892693.png'), auto";
    } else {
      document.body.style.cursor = "auto";
    }
  }));

  grid.appendChild(createFeatureButton("fas fa-comment-dots", "Tooltips", () => {
    alert("Tooltips toggled (placeholder).");
  }));

  grid.appendChild(createFeatureButton("fas fa-sitemap", "Page Structure", () => {
    alert("Page Structure toggled (placeholder).");
  }));

  grid.appendChild(createFeatureButton("fas fa-microphone", "Voice Navigation", function () {
    if (!isVoiceNavActive) {
      startVoiceNavigation();
      this.innerHTML = `<i class="fas fa-microphone-slash"></i><span>Voice Off</span>`;
    } else {
      stopVoiceNavigation();
      this.innerHTML = `<i class="fas fa-microphone"></i><span>Voice Navigation</span>`;
    }
  }));
  // Mark Voice Navigation button as spanning full width in the grid
  grid.lastChild.classList.add("voice-nav-btn");

  // --- Additional Features (Placeholders) ---
  grid.appendChild(createFeatureButton("fas fa-search", "Audit", () => {
    alert("Running Accessibility Audit (placeholder).");
  }));
  grid.appendChild(createFeatureButton("fas fa-edit", "Forms", () => {
    alert("Enhancing Form Accessibility (placeholder).");
  }));
  grid.appendChild(createFeatureButton("fas fa-forward", "Skip to Content", () => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    alert("Skipping to main content (placeholder).");
  }));

  /************************************************************
   * Piece 7: Attach Widget to Document
   ************************************************************/
  document.body.appendChild(widgetContainer);
})();
