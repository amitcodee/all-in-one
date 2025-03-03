// increase_text.js
export const textSizeModule = (() => {
  // Toggles a CSS class to increase text size
  const toggleTextSize = () => {
    document.body.classList.toggle("bigger-text");
  };

  return {
    toggleTextSize
  };
})();
