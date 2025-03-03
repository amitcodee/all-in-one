// contrast.js
export const contrastModule = (() => {
  // Toggles a high-contrast theme on the page
  const toggleHighContrast = () => {
    document.body.classList.toggle("high-contrast");
  };

  // Toggles an alternate smart contrast mode
  const toggleSmartContrast = () => {
    document.body.classList.toggle("high-contrast-2");
  };

  return {
    toggleHighContrast,
    toggleSmartContrast
  };
})();
