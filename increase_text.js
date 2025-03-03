export const textSizeModule = (() => {
    let textSize = 1;
    return {
      increase: () => {
        textSize += 0.1;
        document.body.style.fontSize = textSize + "em";
      },
      decrease: () => {
        textSize = Math.max(0.8, textSize - 0.1);
        document.body.style.fontSize = textSize + "em";
      },
      reset: () => {
        textSize = 1;
        document.body.style.fontSize = "1em";
      }
    };
  })();
  