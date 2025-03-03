export const screenReaderModule = (() => {
    return {
      read: () => {
        const utterance = new SpeechSynthesisUtterance(document.body.innerText);
        speechSynthesis.speak(utterance);
      }
    };
  })();