// textToSpeech.js
export function speakPage() {
    const synth = window.speechSynthesis;
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser doesn't support text-to-speech.");
      return;
    }
    if (synth.speaking) return;
    const text = document.body.innerText || "";
    if (!text.trim()) return alert("No text available to read.");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
  }
  
  export function cancelSpeech() {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
    }
  }
  