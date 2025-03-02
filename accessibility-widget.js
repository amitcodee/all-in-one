(function() {
    /**************************************************************
     *  0. HELPER FUNCTIONS & GLOBAL STATE
     **************************************************************/
    let isWidgetOpen = false;
  
    // Toggle a CSS class on <body>
    function toggleBodyClass(className) {
      document.body.classList.toggle(className);
    }
  
    // Remove all classes from <body> that we define below
    function resetAllClasses() {
      const classesToRemove = [
        "seizure-safe-profile",
        "vision-impaired-profile",
        "adhd-friendly-profile",
        "cognitive-profile",
        "keyboard-navigation"
      ];
      classesToRemove.forEach(cls => document.body.classList.remove(cls));
    }
  
    // Hide the widget entirely
    function hideWidget() {
      widgetContainer.style.display = "none";
    }
  
    /**************************************************************
     *  1. FORCE OVERRIDES WITH A <STYLE> BLOCK
     **************************************************************/
    const overrideStyle = document.createElement("style");
    overrideStyle.innerHTML = `
    /* 
      STEP 1: Basic forced styles for the first five toggles.
      We use !important to override existing site styles.
    */
  
    /* 1) Seizure Safe Profile */
    body.seizure-safe-profile * {
      /* Example: remove animations & transitions */
      animation: none !important;
      transition: none !important;
      /* Possibly reduce brightness or remove flashy content? */
      /* filter: brightness(1.1) !important; */
    }
  
    /* 2) Vision Impaired Profile */
    body.vision-impaired-profile * {
      /* Example: enlarge fonts & increase line-height */
      font-size: 125% !important;
      line-height: 1.5 !important;
      /* Possibly increase contrast, too */
      color: #000 !important;
      background-color: #fff !important;
    }
  
    /* 3) ADHD Friendly Profile */
    body.adhd-friendly-profile * {
      /* Example: highlight focusable elements or reduce distractions */
      outline: 2px dashed #ff00ff !important;
      outline-offset: 2px !important;
      /* Possibly remove animations or highlight headings */
    }
  
    /* 4) Cognitive Profile */
    body.cognitive-profile * {
      /* Example: simpler font, higher spacing */
      font-family: Arial, sans-serif !important;
      letter-spacing: 0.5px !important;
    }
  
    /* 5) Keyboard Navigation (Motor) */
    body.keyboard-navigation *:focus {
      /* Example: show a bold outline on focus */
      outline: 3px solid #0057b8 !important;
      outline-offset: 3px !important;
    }
    `;
    document.head.appendChild(overrideStyle);
  
    /**************************************************************
     *  2. CREATE THE WIDGET CONTAINER & BASIC STYLES
     **************************************************************/
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "my-access-widget";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.bottom = "20px";
    widgetContainer.style.right = "20px";
    widgetContainer.style.zIndex = "999999";
    widgetContainer.style.fontFamily = "Arial, sans-serif";
  
    // Scoped widget CSS (floating button + panel)
    const widgetCSS = document.createElement("style");
    widgetCSS.innerHTML = `
    .my-access-widget .toggle-btn {
      width: 50px;
      height: 50px;
      border: none;
      border-radius: 50%;
      background-color: #0057b8;
      color: #fff;
      font-size: 22px;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .my-access-widget .panel {
      position: absolute;
      bottom: 60px;
      right: 0;
      width: 300px;
      background-color: #fff;
      border: 2px solid #0057b8;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: none;
      flex-direction: column;
      padding: 10px;
    }
    .my-access-widget.open .panel {
      display: flex;
    }
    .my-access-widget .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .my-access-widget .panel-header button {
      background-color: #eee;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 4px;
      margin-left: 5px;
    }
    .my-access-widget .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px solid #eee;
    }
    .my-access-widget .toggle-row:last-child {
      border-bottom: none;
    }
    .my-access-widget .toggle-label {
      font-size: 14px;
      color: #333;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .my-access-widget .toggle-label i {
      color: #0057b8;
    }
    .my-access-widget .switch-wrap {
      position: relative;
      width: 45px;
      height: 24px;
    }
    .my-access-widget .switch-wrap input {
      opacity: 0;
      width: 0; 
      height: 0;
    }
    .my-access-widget .slider {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 24px;
      cursor: pointer;
    }
    .my-access-widget .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: #fff;
      transition: .4s;
      border-radius: 50%;
    }
    .my-access-widget .switch-wrap input:checked + .slider {
      background-color: #0057b8;
    }
    .my-access-widget .switch-wrap input:checked + .slider:before {
      transform: translateX(21px);
    }
    `;
    document.head.appendChild(widgetCSS);
  
    /**************************************************************
     *  3. TOGGLE BUTTON
     **************************************************************/
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle-btn";
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
  
    /**************************************************************
     *  4. PANEL
     **************************************************************/
    const panel = document.createElement("div");
    panel.className = "panel";
    widgetContainer.appendChild(panel);
  
    // Panel header with Reset & Hide
    const panelHeader = document.createElement("div");
    panelHeader.className = "panel-header";
    panel.appendChild(panelHeader);
  
    // Title
    const panelTitle = document.createElement("div");
    panelTitle.innerText = "Profiles (5 toggles)";
    panelTitle.style.fontWeight = "bold";
    panelHeader.appendChild(panelTitle);
  
    // Reset button
    const resetButton = document.createElement("button");
    resetButton.innerText = "Reset";
    resetButton.addEventListener("click", () => {
      resetAllClasses();
      // Also uncheck toggles
      panel.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });
    });
    panelHeader.appendChild(resetButton);
  
    // Hide button
    const hideButton = document.createElement("button");
    hideButton.innerText = "Hide";
    hideButton.addEventListener("click", hideWidget);
    panelHeader.appendChild(hideButton);
  
    /**************************************************************
     *  5. CREATE THE FIVE TOGGLES
     **************************************************************/
    function createToggleRow(iconClass, labelText, onToggle) {
      const row = document.createElement("div");
      row.className = "toggle-row";
  
      const label = document.createElement("div");
      label.className = "toggle-label";
      label.innerHTML = `<i class="${iconClass}"></i> <span>${labelText}</span>`;
  
      const switchWrap = document.createElement("label");
      switchWrap.className = "switch-wrap";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      const slider = document.createElement("span");
      slider.className = "slider";
  
      switchWrap.appendChild(checkbox);
      switchWrap.appendChild(slider);
  
      // Toggle logic
      checkbox.addEventListener("change", e => {
        onToggle(e.target.checked);
      });
  
      row.appendChild(label);
      row.appendChild(switchWrap);
      return row;
    }
  
    // 1) Seizure Safe
    panel.appendChild(
      createToggleRow("fas fa-bolt", "Seizure Safe Profile", (checked) => {
        toggleBodyClass("seizure-safe-profile");
      })
    );
  
    // 2) Vision Impaired
    panel.appendChild(
      createToggleRow("fas fa-eye", "Vision Impaired Profile", (checked) => {
        toggleBodyClass("vision-impaired-profile");
      })
    );
  
    // 3) ADHD Friendly
    panel.appendChild(
      createToggleRow("fas fa-brain", "ADHD Friendly Profile", (checked) => {
        toggleBodyClass("adhd-friendly-profile");
      })
    );
  
    // 4) Cognitive Profile
    panel.appendChild(
      createToggleRow("fas fa-user-graduate", "Cognitive Profile", (checked) => {
        toggleBodyClass("cognitive-profile");
      })
    );
  
    // 5) Keyboard Navigation
    panel.appendChild(
      createToggleRow("fas fa-keyboard", "Keyboard Navigation", (checked) => {
        toggleBodyClass("keyboard-navigation");
      })
    );
  
    /**************************************************************
     *  6. ATTACH TO DOCUMENT
     **************************************************************/
    document.body.appendChild(widgetContainer);
  })();
  