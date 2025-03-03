// Load all accessibility modules
import { textSizeModule } from "./increase_text.js";
import { contrastModule } from "./contrast.js";
import { screenReaderModule } from "./screen_reader.js";
import { voiceAssistantModule } from "./voice_assistant.js";

document.addEventListener("DOMContentLoaded", function () {
  // Create floating button
  const button = document.createElement("div");
  button.innerHTML = '<i class="fas fa-universal-access"></i>';
  button.id = "accessibility-btn";
  document.body.appendChild(button);

  // Create Accessibility Panel
  const panel = document.createElement("div");
  panel.id = "accessibility-panel";
  panel.innerHTML = `
    <h3>Accessibility Options</h3>
    <button id="increase-text">Increase Text Size</button>
    <button id="decrease-text">Decrease Text Size</button>
    <button id="reset-text">Reset Text Size</button>
    <button id="toggle-contrast">High Contrast</button>
    <button id="screen-reader">Enable Screen Reader</button>
    <button id="voice-assist">Enable Voice Assistant</button>
  `;
  document.body.appendChild(panel);

  // Toggle Panel
  button.addEventListener("click", function () {
    panel.classList.toggle("active");
  });

  // Event Listeners for Each Module
  document.getElementById("increase-text").addEventListener("click", textSizeModule.increase);
  document.getElementById("decrease-text").addEventListener("click", textSizeModule.decrease);
  document.getElementById("reset-text").addEventListener("click", textSizeModule.reset);
  document.getElementById("toggle-contrast").addEventListener("click", contrastModule.toggle);
  document.getElementById("screen-reader").addEventListener("click", screenReaderModule.read);
  if (voiceAssistantModule) {
    document.getElementById("voice-assist").addEventListener("click", voiceAssistantModule.start);
  }
});
