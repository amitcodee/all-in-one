// sound.js

// Function to play a click sound (update URL as needed)
function playClickSound() {
    const audio = new Audio("click.mp3"); // Replace with your own sound file URL
    audio.play().catch(err => console.warn("Audio play blocked:", err));
  }
  
  // Function to speak provided text using the Web Speech API
  function speakText(text) {
    if (!window.speechSynthesis) {
      alert("Your browser does not support speech synthesis.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;    // Adjust as needed
    utterance.pitch = 1;   // Adjust as needed
    speechSynthesis.speak(utterance);
  }
  
  // Function to toggle a global click listener that reads content from the clicked element
  function toggleGlobalReadOnClick(shouldEnable) {
    if (shouldEnable) {
      document.addEventListener("click", globalReadHandler, true);
    } else {
      document.removeEventListener("click", globalReadHandler, true);
    }
  }
  
  // Global handler for clicks (reads the content of any element clicked, unless it’s inside the widget)
  function globalReadHandler(event) {
    // Skip clicks inside the accessibility widget (assumes widget container has class "asw-container")
    if (event.target.closest(".asw-container")) return;
    const text = event.target.innerText || "";
    if (text.trim().length > 0) {
      speakText("You clicked an element. The content is: " + text);
    }
  }
  
  // Expose these functions to the global scope
  window.playClickSound = playClickSound;
  window.speakText = speakText;
  window.toggleGlobalReadOnClick = toggleGlobalReadOnClick;
  