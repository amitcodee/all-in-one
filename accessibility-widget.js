// assiblity-withd.js
import { initVoiceNavigation, startVoiceNavigation, stopVoiceNavigation } from "./voiceNavigation.js";
import { speakPage, cancelSpeech } from "./textToSpeech.js";
import { toggleHighContrast } from "./highContrast.js";

// Global state
let isWidgetOpen = false;
let isVoiceNavActive = false;
let recognition = null;

// Helper: Toggle a class on <body>
function toggleBodyClass(cls) {
  document.body.classList.toggle(cls);
}

// Create a widget container and inject styles
const widgetContainer = document.createElement("div");
widgetContainer.className = "my-access-widget";
widgetContainer.style.position = "fixed";
widgetContainer.style.bottom = "20px";
widgetContainer.style.right = "20px";
widgetContainer.style.zIndex = "999999";
widgetContainer.style.fontFamily = "Arial, sans-serif";

// Inject local widget CSS (simplified for brevity)
const localStyle = document.createElement("style");
localStyle.innerHTML = `
  .my-access-widget .toggle-btn {
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
  .my-access-widget .widget-panel {
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
  .my-access-widget.open .widget-panel {
    display: block;
  }
  /* Additional styles for buttons and grid... */
`;
document.head.appendChild(localStyle);

// Create toggle button
const toggleBtn = document.createElement("button");
toggleBtn.className = "toggle-btn";
toggleBtn.innerHTML = `<i class="fas fa-universal-access"></i>`;
toggleBtn.title = "Open Accessibility Options";
toggleBtn.addEventListener("click", () => {
  isWidgetOpen = !isWidgetOpen;
  widgetContainer.classList.toggle("open", isWidgetOpen);
});
widgetContainer.appendChild(toggleBtn);

// Create widget panel
const widgetPanel = document.createElement("div");
widgetPanel.className = "widget-panel";
widgetContainer.appendChild(widgetPanel);

// Top Bar
const topBar = document.createElement("div");
topBar.className = "panel-top-bar";
widgetPanel.appendChild(topBar);

const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset Settings";
resetBtn.addEventListener("click", () => {
  document.body.className = ""; // remove all classes (or call your reset function)
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
hideBtn.addEventListener("click", () => {
  widgetContainer.style.display = "none";
});
topBar.appendChild(hideBtn);

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Dictionary search...";
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    alert(`Searching for: ${searchInput.value} (placeholder)`);
  }
});
topBar.appendChild(searchInput);

// Grid of Features
const grid = document.createElement("div");
grid.className = "widget-grid";
widgetPanel.appendChild(grid);

// Helper: Create a feature button
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

// Add feature buttons to grid
grid.appendChild(createFeatureButton("fas fa-adjust", "High Contrast", toggleHighContrast));
grid.appendChild(createFeatureButton("fas fa-volume-up", "Screen Reader", speakPage));
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

// Voice Navigation Button
grid.appendChild(createFeatureButton("fas fa-microphone", "Voice Navigation", function () {
  if (!isVoiceNavActive) {
    startVoiceNavigation();
    this.innerHTML = `<i class="fas fa-microphone-slash"></i><span>Voice Off</span>`;
  } else {
    stopVoiceNavigation();
    this.innerHTML = `<i class="fas fa-microphone"></i><span>Voice Navigation</span>`;
  }
})).classList.add("voice-nav-btn");

  /************************************************************
   * Piece 6: Voice Navigation Functions (from voiceNavigation.js)
   ************************************************************/
  function startVoiceNavigation() {
    if (!recognition) recognition = initVoiceNavigation();
    isVoiceNavActive = true;
    recognition.start();
  }

  function stopVoiceNavigation() {
    isVoiceNavActive = false;
    if (recognition) recognition.stop();
  }

  /************************************************************
   * Piece 7: ATTACH THE WIDGET TO THE DOCUMENT
   ************************************************************/
  document.body.appendChild(widgetContainer);
