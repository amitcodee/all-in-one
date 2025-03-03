export const textSizeModule = (() => {
  const style = document.createElement('style');
  style.innerHTML = `
    body.bigger-text * {
      font-size: 120% !important;
      line-height: 1.4 !important;
    }
  `;
  document.head.appendChild(style);

  const toggleTextSize = () => {
    document.body.classList.toggle("bigger-text");
  };

  return {
    toggleTextSize
  };
})();
