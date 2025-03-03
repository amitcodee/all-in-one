// accessibility-widget.js
import { textSizeModule } from "./increase_text.js";
import { contrastModule } from "./contrast.js";
import { screenReaderModule } from "./screen_reader.js";
import { voiceAssistantModule } from "./voice_assistant.js";

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Ensure FontAwesome is loaded
  (function loadFontAwesome() {
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const faLink = document.createElement("link");
      faLink.rel = "stylesheet";
      faLink.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
      document.head.appendChild(faLink);
    }
  })();

  // ✅ Inject global widget styles
  const widgetStyle = document.createElement("style");
  widgetStyle.innerHTML = `
    .accessibility-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 99999;
      font-family: Arial, sans-serif;
    }
    .accessibility-widget .toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background-color: #004a99;
      color: #fff;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 24px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      transition: background-color 0.3s ease;
    }
    .accessibility-widget .toggle-btn:hover {
      background-color: #003a80;
    }
    .accessibility-widget .widget-panel {
      display: none;
      position: absolute;
      bottom: 70px;
      right: 0;
      background-color: #fff;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      width: 250px;
    }
    .accessibility-widget.open .widget-panel {
      display: block;
    }
    .accessibility-widget .widget-panel button {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #eee;
      transition: background-color 0.2s ease;
    }
    .accessibility-widget .widget-panel button i {
      font-size: 18px;
    }
    .accessibility-widget .widget-panel button:hover {
      background-color: #ddd;
    }
  `;
  document.head.appendChild(widgetStyle);

  // ✅ Create widget container
  const widgetContainer = document.createElement("div");
  widgetContainer.className = "accessibility-widget";

  // ✅ Create toggle button with FontAwesome icon
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "toggle-btn";
  toggleBtn.innerHTML = `<i class="fas fa-universal-access"></i>`;
  toggleBtn.addEventListener("click", () => {
    widgetContainer.classList.toggle("open");
  });
  widgetContainer.appendChild(toggleBtn);

  // ✅ Create widget panel
  const panel = document.createElement("div");
  panel.className = "widget-panel";
  widgetContainer.appendChild(panel);

  // ✅ Accessibility Feature Buttons

  // Increase Text Size
  const textSizeBtn = document.createElement("button");
  textSizeBtn.innerHTML = `<i class="fas fa-text-height"></i> Increase Text`;
  textSizeBtn.addEventListener("click", textSizeModule.toggleTextSize);
  panel.appendChild(textSizeBtn);

  // High Contrast
  const contrastBtn = document.createElement("button");
  contrastBtn.innerHTML = `<i class="fas fa-adjust"></i> High Contrast`;
  contrastBtn.addEventListener("click", contrastModule.toggleHighContrast);
  panel.appendChild(contrastBtn);

  // Screen Reader
  const screenReaderBtn = document.createElement("button");
  screenReaderBtn.innerHTML = `<i class="fas fa-volume-up"></i> Read Page`;
  screenReaderBtn.addEventListener("click", screenReaderModule.speakPage);
  panel.appendChild(screenReaderBtn);

  // Voice Assistant
  const voiceBtn = document.createElement("button");
  voiceBtn.innerHTML = `<i class="fas fa-microphone"></i> Voice Assistant`;
  voiceBtn.addEventListener("click", () => {
    if (!voiceAssistantModule.isVoiceNavActive()) {
      voiceAssistantModule.startVoiceNavigation();
      voiceBtn.innerHTML = `<i class="fas fa-microphone-slash"></i> Stop Voice`;
    } else {
      voiceAssistantModule.stopVoiceNavigation();
      voiceBtn.innerHTML = `<i class="fas fa-microphone"></i> Voice Assistant`;
    }
  });
  panel.appendChild(voiceBtn);

  // ✅ Append widget to body
  document.body.appendChild(widgetContainer);
});
