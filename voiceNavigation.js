// voiceNavigation.js
export function initVoiceNavigation() {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      alert("Sorry, your browser doesn't support voice navigation.");
      return null;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    return recognition;
  }
  
  export function startVoiceNavigation(recognition, onCommand) {
    if (!recognition) return;
    recognition.addEventListener("result", (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      onCommand(command);
    });
    recognition.addEventListener("end", () => {
      // You can decide whether to restart recognition here
      recognition.start();
    });
    recognition.start();
  }
  
  export function stopVoiceNavigation(recognition) {
    if (recognition) {
      recognition.stop();
    }
  }
  