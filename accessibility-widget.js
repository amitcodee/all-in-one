// widget.js
import { textSizeModule } from "./increase_text.js";
import { contrastModule } from "./contrast.js";
import { screenReaderModule } from "./screen_reader.js";
import { voiceAssistantModule } from "./voice_assistant.js";

(function () {
  // Create the widget container
  const widgetContainer = document.createElement("div");
  widgetContainer.className = "accessibility-widget";
  widgetContainer.style.position = "fixed";
  widgetContainer.style.bottom = "20px";
  widgetContainer.style.right = "20px";
  widgetContainer.style.zIndex = "9999";
  widgetContainer.style.fontFamily = "Arial, sans-serif";

  // Create a toggle button to open/close the widget panel
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Accessibility";
  toggleBtn.style.padding = "10px 15px";
  toggleBtn.style.marginBottom = "10px";
  toggleBtn.addEventListener("click", () => {
    widgetContainer.classList.toggle("open");
  });
  widgetContainer.appendChild(toggleBtn);

  // Create the panel for features
  const panel = document.createElement("div");
  panel.className = "widget-panel";
  panel.style.display = "none";
  panel.style.backgroundColor = "#fff";
  panel.style.padding = "15px";
  panel.style.borderRadius = "5px";
  panel.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
  widgetContainer.appendChild(panel);

  // Toggle panel visibility based on container's "open" class
  const observer = new MutationObserver(() => {
    panel.style.display = widgetContainer.classList.contains("open") ? "block" : "none";
  });
  observer.observe(widgetContainer, { attributes: true, attributeFilter: ["class"] });

  // Create and append feature buttons

  // 1. Toggle High Contrast
  const contrastBtn = document.createElement("button");
  contrastBtn.textContent = "High Contrast";
  contrastBtn.style.display = "block";
  contrastBtn.style.marginBottom = "5px";
  contrastBtn.addEventListener("click", contrastModule.toggleHighContrast);
  panel.appendChild(contrastBtn);

  // 2. Toggle Bigger Text
  const textSizeBtn = document.createElement("button");
  textSizeBtn.textContent = "Bigger Text";
  textSizeBtn.style.display = "block";
  textSizeBtn.style.marginBottom = "5px";
  textSizeBtn.addEventListener("click", textSizeModule.toggleTextSize);
  panel.appendChild(textSizeBtn);

  // 3. Screen Reader (Text-to-Speech)
  const screenReaderBtn = document.createElement("button");
  screenReaderBtn.textContent = "Read Page";
  screenReaderBtn.style.display = "block";
  screenReaderBtn.style.marginBottom = "5px";
  screenReaderBtn.addEventListener("click", screenReaderModule.speakPage);
  panel.appendChild(screenReaderBtn);

  // 4. Voice Assistant
  const voiceBtn = document.createElement("button");
  voiceBtn.textContent = "Voice Assistant";
  voiceBtn.style.display = "block";
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
})();
