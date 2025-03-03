export const voiceAssistantModule = (() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.continuous = true;
  
      return {
        start: () => {
          recognition.start();
          alert("Voice assistant activated. Say 'increase text', 'decrease text', or 'contrast'.");
        },
        process: (event) => {
          const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
          if (command.includes("increase text")) textSizeModule.increase();
          else if (command.includes("decrease text")) textSizeModule.decrease();
          else if (command.includes("contrast")) contrastModule.toggle();
        }
      };
    }
    return null;
  })();