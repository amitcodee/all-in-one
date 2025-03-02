(function () {
    /***************************************************************
     *  0. HELPER FUNCTIONS & GLOBAL STATE
     ***************************************************************/
    let isWidgetOpen = false;
  
    // Toggle any body class
    function toggleBodyClass(cls) {
      document.body.classList.toggle(cls);
    }
  
    // Remove all classes for the 6 profiles
    function resetAllClasses() {
      const classesToRemove = [
        "seizure-safe-profile", 
        "vision-impaired-profile", 
        "adhd-friendly-profile",
        "cognitive-profile", 
        "keyboard-navigation", 
        "screen-reader-enabled"
      ];
      classesToRemove.forEach((c) => document.body.classList.remove(c));
  
      // Also uncheck toggles & hide descriptions
      widgetPanel.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.checked = false;
      });
      widgetPanel.querySelectorAll(".profile-description").forEach((desc) => {
        desc.classList.remove("active");
      });
    }
  
    // Dictionary search placeholder
    function dictionarySearch(query) {
      if (!query.trim()) return;
      alert(`Searching dictionary for: "${query}" (placeholder).`);
    }
  
    // Hide the widget entirely
    function hideWidget() {
      widgetContainer.style.display = "none";
    }
  
    /***************************************************************
     *  1. FORCED OVERRIDES FOR THE 6 PROFILES (DEMO)
     ***************************************************************/
    const overrideStyle = document.createElement("style");
    overrideStyle.id = "override-styles";
    overrideStyle.innerHTML = `
      /* Seizure Safe: remove animations/transitions */
      body.seizure-safe-profile * {
        animation: none !important;
        transition: none !important;
      }
  
      /* Vision Impaired: enlarge text, high contrast, etc. */
      body.vision-impaired-profile * {
        font-size: 120% !important;
        line-height: 1.5 !important;
        color: #000 !important;
        background-color: #fff !important;
      }
  
      /* ADHD Friendly: highlight focus or reduce distractions */
      body.adhd-friendly-profile *:focus {
        outline: 2px dashed #ff00ff !important;
        outline-offset: 3px !important;
      }
  
      /* Cognitive Profile: simpler fonts, maybe increased spacing */
      body.cognitive-profile * {
        letter-spacing: 0.5px !important;
      }
  
      /* Keyboard Navigation: highlight focus more strongly */
      body.keyboard-navigation *:focus {
        outline: 3px solid #0057b8 !important;
        outline-offset: 3px !important;
      }
  
      /* Screen Reader: placeholder */
      body.screen-reader-enabled {
        /* Possibly reveal skip links or ARIA attributes in real usage */
      }
    `;
    document.head.appendChild(overrideStyle);
  
    /***************************************************************
     *  2. CREATE THE WIDGET CONTAINER & SCOPED STYLES
     ***************************************************************/
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "my-access-widget";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.bottom = "20px";
    widgetContainer.style.right = "20px";
    widgetContainer.style.zIndex = "999999";
    widgetContainer.style.fontFamily = "Arial, sans-serif";
  
    // Local CSS for the widget
    const localCSS = document.createElement("style");
    localCSS.innerHTML = `
      .my-access-widget .toggle-btn {
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
      .my-access-widget .widget-panel {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 360px;
        max-height: 80vh;
        background-color: #fff;
        border: 2px solid #0057b8;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.3);
        display: none;
        flex-direction: column;
        overflow: hidden;
      }
      .my-access-widget.open .widget-panel {
        display: flex;
      }
  
      /* Top Bar */
      .my-access-widget .panel-top-bar {
        background-color: #f9f9f9;
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .my-access-widget .panel-top-bar button {
        background-color: #eee;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 13px;
        cursor: pointer;
      }
      .my-access-widget .panel-top-bar button:hover {
        background-color: #ddd;
      }
      .my-access-widget .panel-top-bar input[type="text"] {
        flex: 1;
        padding: 6px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 13px;
      }
  
      /* Profile Rows */
      .profile-row {
        padding: 10px;
        border-bottom: 1px solid #eee;
      }
      .profile-row:last-child {
        border-bottom: none;
      }
      .profile-row-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .profile-label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 15px;
        color: #333;
      }
      .profile-label i {
        color: #0057b8;
        font-size: 18px;
      }
      .switch-wrap {
        position: relative;
        width: 45px;
        height: 24px;
      }
      .switch-wrap input {
        opacity: 0;
        width: 0; 
        height: 0;
      }
      .slider {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 24px;
        cursor: pointer;
      }
      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px; bottom: 3px;
        background-color: #fff;
        transition: .4s;
        border-radius: 50%;
      }
      .switch-wrap input:checked + .slider {
        background-color: #0057b8;
      }
      .switch-wrap input:checked + .slider:before {
        transform: translateX(21px);
      }
      /* Description */
      .profile-description {
        font-size: 13px;
        color: #444;
        margin-top: 8px;
        display: none;
        line-height: 1.4;
      }
      .profile-description.active {
        display: block;
      }
    `;
    document.head.appendChild(localCSS);
  
    /***************************************************************
     *  3. TOGGLE BUTTON
     ***************************************************************/
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle-btn";
    toggleBtn.innerHTML = `<i class="fas fa-universal-access"></i>`;
    toggleBtn.title = "Open Accessibility Options";
    toggleBtn.addEventListener("click", () => {
      isWidgetOpen = !isWidgetOpen;
      widgetContainer.classList.toggle("open", isWidgetOpen);
    });
    widgetContainer.appendChild(toggleBtn);
  
    /***************************************************************
     *  4. WIDGET PANEL
     ***************************************************************/
    const widgetPanel = document.createElement("div");
    widgetPanel.className = "widget-panel";
    widgetContainer.appendChild(widgetPanel);
  
    /* 4A. TOP BAR */
    const topBar = document.createElement("div");
    topBar.className = "panel-top-bar";
    widgetPanel.appendChild(topBar);
  
    // Reset
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset Settings";
    resetBtn.addEventListener("click", resetAllClasses);
    topBar.appendChild(resetBtn);
  
    // Statement
    const statementBtn = document.createElement("button");
    statementBtn.textContent = "Statement";
    statementBtn.addEventListener("click", () => {
      alert("Accessibility Statement (placeholder).");
    });
    topBar.appendChild(statementBtn);
  
    // Hide
    const hideBtn = document.createElement("button");
    hideBtn.textContent = "Hide Interface";
    hideBtn.addEventListener("click", hideWidget);
    topBar.appendChild(hideBtn);
  
    // Dictionary Search
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Dictionary search...";
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        dictionarySearch(searchInput.value);
      }
    });
    topBar.appendChild(searchInput);
  
    /* 4B. PROFILES (6) */
    // We'll define the 6 profiles in an array
    const profiles = [
      {
        key: "seizure-safe-profile",
        icon: "fas fa-bolt",
        label: "Seizure Safe Profile",
        description: `This profile enables epileptic and seizure prone users to browse safely by eliminating the risk of seizures that result from flashing or blinking animations and risky color combinations.`
      },
      {
        key: "vision-impaired-profile",
        icon: "fas fa-eye",
        label: "Vision Impaired Profile",
        description: `This profile adjusts the website so that it is accessible to the majority of visual impairments such as Degrading Eyesight, Tunnel Vision, Cataract, Glaucoma, and others.`
      },
      {
        key: "adhd-friendly-profile",
        icon: "fas fa-brain",
        label: "ADHD Friendly Profile",
        description: `This profile significantly reduces distractions, to help people with ADHD and Neurodevelopmental disorders browse, read, and focus on essential elements more easily.`
      },
      {
        key: "cognitive-profile",
        icon: "fas fa-user-graduate",
        label: "Cognitive Disability Profile",
        description: `This profile provides various assistive features to help users with cognitive disabilities such as Autism, Dyslexia, CVA, and others, to focus on the essential elements more easily.`
      },
      {
        key: "keyboard-navigation",
        icon: "fas fa-keyboard",
        label: "Keyboard Navigation (Motor)",
        description: `This profile enables motor-impaired persons to operate the website using the keyboard Tab, Shift+Tab, and the Enter keys. It also allows shortcuts (e.g. “M” for menus, “H” for headings) to jump to specific elements.`
      },
      {
        key: "screen-reader-enabled",
        icon: "fas fa-blind",
        label: "Blind Users (Screen Reader)",
        description: `This profile adjusts the website to be compatible with screen-readers such as JAWS, NVDA, VoiceOver, and TalkBack. A screen-reader is software installed on the blind user’s computer and smartphone.`
      }
    ];
  
    profiles.forEach(p => {
      widgetPanel.appendChild(createProfileRow(p.key, p.icon, p.label, p.description));
    });
  
    // Helper to create a row for each profile
    function createProfileRow(key, iconClass, labelText, descText) {
      const row = document.createElement("div");
      row.className = "profile-row";
  
      const rowHeader = document.createElement("div");
      rowHeader.className = "profile-row-header";
  
      const labelDiv = document.createElement("div");
      labelDiv.className = "profile-label";
      labelDiv.innerHTML = `<i class="${iconClass}"></i> <span>${labelText}</span>`;
  
      // Switch
      const switchWrap = document.createElement("label");
      switchWrap.className = "switch-wrap";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      const slider = document.createElement("span");
      slider.className = "slider";
  
      switchWrap.appendChild(checkbox);
      switchWrap.appendChild(slider);
  
      rowHeader.appendChild(labelDiv);
      rowHeader.appendChild(switchWrap);
  
      const desc = document.createElement("div");
      desc.className = "profile-description";
      desc.innerHTML = descText;
  
      // Toggle logic
      checkbox.addEventListener("change", (e) => {
        toggleBodyClass(key);
        if (e.target.checked) {
          desc.classList.add("active");
        } else {
          desc.classList.remove("active");
        }
      });
  
      row.appendChild(rowHeader);
      row.appendChild(desc);
      return row;
    }
  
    /***************************************************************
     *  5. ATTACH WIDGET
     ***************************************************************/
    document.body.appendChild(widgetContainer);
  })();
  