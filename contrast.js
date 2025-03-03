export const contrastModule = (() => {
    let contrastEnabled = false;
    return {
      toggle: () => {
        contrastEnabled = !contrastEnabled;
        document.body.style.backgroundColor = contrastEnabled ? "black" : "white";
        document.body.style.color = contrastEnabled ? "yellow" : "black";
      }
    };
  })();