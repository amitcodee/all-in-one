(function() {
    /**
     * ==========================================
     *  0. HELPER FUNCTIONS & BASIC SETUP
     * ==========================================
     */
    // Toggle a CSS class on <body>
    function toggleBodyClass(className) {
      document.body.classList.toggle(className);
    }
  
    // We'll store the descriptions in a simple object
    const profileData = {
      "seizure-safe-profile": {
        label: "Seizure Safe Profile",
        icon: "fas fa-bolt",
        description: `
          <strong>Seizure Safe Profile</strong><br>
          This profile enables epileptic and seizure prone users to browse safely by eliminating 
          the risk of seizures that result from flashing or blinking animations and risky color combinations.
        `
      },
      "vision-impaired-profile": {
        label: "Vision Impaired Profile",
        icon: "fas fa-eye",
        description: `
          <strong>Vision Impaired Profile</strong><br>
          This profile adjusts the website so that it is accessible to the majority of visual impairments 
          such as Degrading Eyesight, Tunnel Vision, Cataract, Glaucoma, and others.
        `
      },
      "adhd-friendly-profile": {
        label: "ADHD Friendly Profile",
        icon: "fas fa-brain",
        description: `
          <strong>ADHD Friendly Profile</strong><br>
          This profile significantly reduces distractions, to help people with ADHD and 
          Neurodevelopmental disorders browse, read, and focus on essential elements of the website more easily.
        `
      },
      "cognitive-profile": {
        label: "Cognitive Disability Profile",
        icon: "fas fa-user-graduate",
        description: `
          <strong>Cognitive Disability Profile</strong><br>
          This profile provides various assistive features to help users with cognitive disabilities 
          such as Autism, Dyslexia, CVA, and others, to focus on the essential elements of the website more easily.
        `
      },
      "keyboard-navigation": {
        label: "Keyboard Navigation (Motor)",
        icon: "fas fa-keyboard",
        description: `
          <strong>Keyboard Navigation (Motor)</strong><br>
          This profile enables motor-impaired persons to operate the website using the keyboard Tab, 
          Shift+Tab, and the Enter keys. Users can also use shortcuts such as “M” (menus), “H” (headings), 
          “F” (forms), “B” (buttons), and “G” (graphics) to jump to specific elements.
        `
      },
      "screen-reader-enabled": {
        label: "Blind Users (Screen Reader)",
        icon: "fas fa-blind",
        description: `
          <strong>Blind Users (Screen Reader)</strong><br>
          This profile adjusts the website to be compatible with screen-readers such as JAWS, NVDA, VoiceOver, and TalkBack. 
          A screen-reader is software that is installed on the blind user’s computer and smartphone, and websites 
          should ensure compatibility with it.
        `
      }
    };
  
    // Basic container for the demo
    const container = document.createElement("div");
    container.style.maxWidth = "600px";
    container.style.margin = "20px auto";
    container.style.fontFamily = "Arial, sans-serif";
  
    // We'll inject some minimal CSS for toggles + layout
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      .profile-toggle-row {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #ddd;
      }
      .profile-toggle-left {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .profile-toggle-left i {
        color: #0057b8;
        font-size: 20px;
      }
      .profile-toggle-left .profile-label {
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }
      .toggle-switch {
        position: relative;
        width: 45px;
        height: 24px;
        margin-right: 10px;
      }
      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 24px;
      }
      .slider:before {
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
      .toggle-switch input:checked + .slider {
        background-color: #0057b8;
      }
      .toggle-switch input:checked + .slider:before {
        transform: translateX(21px);
      }
      .profile-description {
        margin-top: 8px;
        font-size: 14px;
        color: #444;
        line-height: 1.4;
        display: none; /* hidden by default */
        background-color: #f9f9f9;
        padding: 10px;
        border-radius: 4px;
      }
      .profile-description.active {
        display: block; /* shown when toggle is ON */
      }
    `;
    document.head.appendChild(styleEl);
  
    /**
     * A helper function to create a single toggle row
     * with an icon, label, and a description that shows
     * when toggled ON.
     */
    function createProfileToggleRow(profileKey) {
      const { label, icon, description } = profileData[profileKey];
  
      // Row container
      const row = document.createElement("div");
      row.className = "profile-toggle-row";
  
      // Left side: icon + label
      const leftDiv = document.createElement("div");
      leftDiv.className = "profile-toggle-left";
      leftDiv.innerHTML = `
        <i class="${icon}"></i>
        <div class="profile-label">${label}</div>
      `;
  
      // Right side: toggle switch
      const toggleWrap = document.createElement("label");
      toggleWrap.className = "toggle-switch";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      const slider = document.createElement("span");
      slider.className = "slider";
  
      toggleWrap.appendChild(checkbox);
      toggleWrap.appendChild(slider);
  
      // Description paragraph
      const descEl = document.createElement("div");
      descEl.className = "profile-description";
      descEl.innerHTML = description;
  
      // Toggle logic
      checkbox.addEventListener("change", (e) => {
        // Add/remove the body class
        toggleBodyClass(profileKey);
        // Show/hide the description
        if (e.target.checked) {
          descEl.classList.add("active");
        } else {
          descEl.classList.remove("active");
        }
      });
  
      // Assemble the row
      row.appendChild(leftDiv);
      row.appendChild(toggleWrap);
      row.appendChild(descEl);
  
      return row;
    }
  
    /**
     * Build the interface by appending each profile row.
     * (You can omit any profiles you don't need.)
     */
    const profileKeys = [
      "seizure-safe-profile",
      "vision-impaired-profile",
      "adhd-friendly-profile",
      "cognitive-profile",
      "keyboard-navigation",
      "screen-reader-enabled"
    ];
    profileKeys.forEach((key) => {
      container.appendChild(createProfileToggleRow(key));
    });
  
    // Finally, attach the container to the page
    document.body.appendChild(container);
  })();
  