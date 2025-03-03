export const screenReaderModule = (() => {
  const synth = window.speechSynthesis;
  let readingUtterance = null;

  const speakPage = () => {
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser doesn't support text-to-speech.");
      return;
    }
    if (synth.speaking) return;
    const text = document.body.innerText || "";
    if (!text.trim()) return alert("No text available to read.");
    readingUtterance = new SpeechSynthesisUtterance(text);
    readingUtterance.lang = "en-US";
    readingUtterance.rate = 1;
    readingUtterance.pitch = 1;
    synth.speak(readingUtterance);
  };

  return {
    speakPage
  };
})();
