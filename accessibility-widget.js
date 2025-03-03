// Import all modules
import { textSizeModule } from "./increase_text.js";
import { contrastModule } from "./contrast.js";
import { screenReaderModule } from "./screen_reader.js";
import { voiceAssistantModule } from "./voice_assistant.js";

// Wait for DOM load
document.addEventListener("DOMContentLoaded", function () {
  // Inject some CSS for the floating button and side nav
  const style = document.createElement("style");
  style.innerHTML = `
    /* Floating button */
    #accessibility-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #007bff;
      color: #fff;
      padding: 12px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 9999;
      font-size: 1.2em;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    /* Side nav panel (hidden by default) */
    #accessibility-panel {
      position: fixed;
      top: 0;
      right: 0;
      width: 300px;
      height: 100vh;
      background-color: #fff;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      padding: 20px;
    }

    /* Slide in when active */
    #accessibility-panel.active {
      transform: translateX(0);
    }

    #accessibility-panel h3 {
      margin-top: 0;
      margin-bottom: 16px;
      font-size: 1.2em;
    }

    #accessibility-panel button {
      margin-bottom: 12px;
      padding: 10px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      background-color: #f1f1f1;
      transition: background-color 0.3s ease;
      width: 100%;
      text-align: left;
      font-size: 1em;
    }

    #accessibility-panel button:hover {
      background-color: #e2e2e2;
    }
  `;
  document.head.appendChild(style);

  // Create floating accessibility button
  const button = document.createElement("div");
  button.innerHTML = '<i class="fas fa-universal-access"></i>';
  button.id = "accessibility-btn";
  document.body.appendChild(button);

  // Create side nav for Accessibility Panel
  const panel = document.createElement("div");
  panel.id = "accessibility-panel";

  // Accessibility panel inner HTML
  // Added a small change below for canmore
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

  // Toggle Panel visibility
  button.addEventListener("click", function () {
    panel.classList.toggle("active");
  });

  // Hook up the text size buttons
  document.getElementById("increase-text").addEventListener("click", textSizeModule.increase);
  document.getElementById("decrease-text").addEventListener("click", textSizeModule.decrease);
  document.getElementById("reset-text").addEventListener("click", textSizeModule.reset);

  // Hook up the contrast button
  document.getElementById("toggle-contrast").addEventListener("click", contrastModule.toggle);

  // Hook up the screen reader button
  document.getElementById("screen-reader").addEventListener("click", screenReaderModule.read);

  // Hook up the voice assistant button if available
  if (voiceAssistantModule) {
    // Start recognition
    document.getElementById("voice-assist").addEventListener("click", () => {
      voiceAssistantModule.start();
    });

    // Listen for recognition results
    if (voiceAssistantModule.process) {
      // Expose recognition on the module for easy reference
      const recognition = voiceAssistantModule._recognition;
      if (recognition) {
        recognition.onresult = (event) => {
          voiceAssistantModule.process(event);
        };
      }
    }
  }
});