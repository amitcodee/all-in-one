// accessibility-widget.js
import { textSizeModule } from "./increase_text.js";
import { contrastModule } from "./contrast.js";
import { screenReaderModule } from "./screen_reader.js";
import { voiceAssistantModule } from "./voice_assistant.js";

document.addEventListener("DOMContentLoaded", () => {
  // Inject global widget styles
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

  // Create widget container
  const widgetContainer = document.createElement("div");
  widgetContainer.className = "accessibility-widget";

  // Create toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "toggle-btn";
  toggleBtn.textContent = "Accessibility";
  toggleBtn.addEventListener("click", () => {
    widgetContainer.classList.toggle("open");
  });
  widgetContainer.appendChild(toggleBtn);

  // Create widget panel
  const panel = document.createElement("div");
  panel.className = "widget-panel";
  widgetContainer.appendChild(panel);

  // Accessibility buttons

  // Increase Text Size
  const textSizeBtn = document.createElement("button");
  textSizeBtn.textContent = "Increase Text";
  textSizeBtn.addEventListener("click", textSizeModule.toggleTextSize);
  panel.appendChild(textSizeBtn);

  // High Contrast
  const contrastBtn = document.createElement("button");
  contrastBtn.textContent = "High Contrast";
  contrastBtn.addEventListener("click", contrastModule.toggleHighContrast);
  panel.appendChild(contrastBtn);

  // Screen Reader
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

  // Append widget to body
  document.body.appendChild(widgetContainer);
});
