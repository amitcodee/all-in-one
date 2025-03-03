// widget.js
import { textSizeModule } from "./increase_text.js";
import { contrastModule } from "./contrast.js";
import { screenReaderModule } from "./screen_reader.js";
import { voiceAssistantModule } from "./voice_assistant.js";

document.addEventListener("DOMContentLoaded", () => {
  // Inject widget-specific styles to override existing website styles
  const widgetStyle = document.createElement("style");
  widgetStyle.innerHTML = `
    .accessibility-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      font-family: Arial, sans-serif;
    }
    .accessibility-widget .toggle-btn {
      padding: 10px 15px;
      background-color: #004a99;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      transition: background-color 0.3s ease;
    }
    .accessibility-widget .toggle-btn:hover {
      background-color: #003a80;
    }
    .accessibility-widget .widget-panel {
      margin-top: 10px;
      background-color: #fff;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      display: none;
    }
    .accessibility-widget.open .widget-panel {
      display: block;
    }
    .accessibility-widget .widget-panel button {
      display: block;
      width: 100%;
      margin-bottom: 5px;
      padding: 8px;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #eee;
      transition: background-color 0.2s ease;
    }
    .accessibility-widget .widget-panel button:hover {
      background-color: #ddd;
    }
  `;
  document.head.appendChild(widgetStyle);

  // Create the widget container
  const widgetContainer = document.createElement("div");
  widgetContainer.className = "accessibility-widget";

  // Create a toggle button to open/close the widget panel
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "toggle-btn";
  toggleBtn.textContent = "Accessibility Options";
  toggleBtn.addEventListener("click", () => {
    widgetContainer.classList.toggle("open");
  });
  widgetContainer.appendChild(toggleBtn);

  // Create the panel that holds the feature buttons
  const panel = document.createElement("div");
  panel.className = "widget-panel";
  widgetContainer.appendChild(panel);

  // Create and append feature buttons

  // High Contrast
  const contrastBtn = document.createElement("button");
  contrastBtn.textContent = "High Contrast";
  contrastBtn.addEventListener("click", contrastModule.toggleHighContrast);
  panel.appendChild(contrastBtn);

  // Smart Contrast
  const smartContrastBtn = document.createElement("button");
  smartContrastBtn.textContent = "Smart Contrast";
  smartContrastBtn.addEventListener("click", contrastModule.toggleSmartContrast);
  panel.appendChild(smartContrastBtn);

  // Bigger Text
  const textSizeBtn = document.createElement("button");
  textSizeBtn.textContent = "Bigger Text";
  textSizeBtn.addEventListener("click", textSizeModule.toggleTextSize);
  panel.appendChild(textSizeBtn);

  // Screen Reader (Text-to-Speech)
  const screenReaderBtn = document.createElement("button");
  screenReaderBtn.textContent = "Read Page";
  screenReaderBtn.addEventListener("click", screenReaderModule.speakPage);
  panel.appendChild(screenReaderBtn);

  // Voice Assistant
  const voiceBtn = document.createElement("button");
  voiceBtn.textContent = "Voice Assistant";
  voiceBtn.addEventListener("click", () => {
    if (!voiceAssistantModule.isVoiceNavActive()) {
      voiceAssistantModule.startVoiceNavigation();
      voiceBtn.textContent = "Stop Voice Assistant";
    } else {
      voiceAssistantModule.stopVoiceNavigation();
      voiceBtn.textContent = "Voice Assistant";
    }
  });
  panel.appendChild(voiceBtn);

  // Append the widget container to the document body
  document.body.appendChild(widgetContainer);
});
