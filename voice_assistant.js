export const voiceAssistantModule = (() => {
  let recognition;
  let isVoiceNavActive = false;

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
      console.log("Voice Command:", command);
    });
  };

  return {
    startVoiceNavigation: initVoiceNavigation,
    stopVoiceNavigation: () => (isVoiceNavActive = false),
    isVoiceNavActive: () => isVoiceNavActive
  };
})();
