// voice_assistant.js
export const voiceAssistantModule = (() => {
  let recognition;
  let isVoiceNavActive = false;

  // Initialize speech recognition
  const initVoiceNavigation = () => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      alert("Sorry, your browser doesn't support voice navigation.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.addEventListener("result", (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      handleVoiceCommand(command);
    });

    recognition.addEventListener("end", () => {
      if (isVoiceNavActive) recognition.start();
    });
  };

  // Process voice commands
  const handleVoiceCommand = (command) => {
    console.log("Voice Command:", command);
    if (command.includes("scroll up")) {
      window.scrollBy({ top: -200, behavior: "smooth" });
    } else if (command.includes("scroll down")) {
      window.scrollBy({ top: 200, behavior: "smooth" });
    } else if (command.includes("go to top")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (command.includes("go to bottom")) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else if (command.includes("close panel")) {
      // Optionally dispatch a custom event to close the widget panel
      document.dispatchEvent(new CustomEvent("closeVoicePanel"));
    } else if (command.includes("voice off")) {
      stopVoiceNavigation();
    }
    // Additional commands can be added here.
  };

  const startVoiceNavigation = () => {
    if (!recognition) initVoiceNavigation();
    isVoiceNavActive = true;
    recognition.start();
  };

  const stopVoiceNavigation = () => {
    isVoiceNavActive = false;
    if (recognition) recognition.stop();
  };

  return {
    startVoiceNavigation,
    stopVoiceNavigation,
    isVoiceNavActive: () => isVoiceNavActive
  };
})();
