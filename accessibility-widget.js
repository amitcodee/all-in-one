(function() {
    // Global accessibility settings
    var fontScale = 1; // Base scaling factor
  
    // Create a style element for forced font scaling
    var fontScalingStyle = document.createElement('style');
    fontScalingStyle.id = 'accessibility-font-scaling';
    document.head.appendChild(fontScalingStyle);
  
    // Function to update the global font scaling style
    function updateFontScaling() {
      var percentage = Math.round(fontScale * 100);
      fontScalingStyle.innerHTML = `
        body, h1, h2, h3, h4, h5, h6, p, span, a, li, div, button, input, label {
          font-size: ${percentage}% !important;
        }
      `;
    }
    updateFontScaling();
  
    // Inject base CSS for other accessibility classes
    var baseStyle = document.createElement('style');
    baseStyle.innerHTML = `
      /* High contrast mode */
      .high-contrast {
        background-color: black !important;
        color: white !important;
      }
      .high-contrast a { color: #00ffff !important; }
      
      /* Dyslexia-friendly font */
      .dyslexia-font {
        font-family: 'OpenDyslexic', Arial, sans-serif !important;
      }
      
      /* Reduce motion: disable animations and transitions */
      .reduce-motion * {
        transition: none !important;
        animation: none !important;
      }
    `;
    document.head.appendChild(baseStyle);
  
    // Create container for the widget
    var container = document.createElement('div');
    container.id = 'my-accessibility-widget';
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.right = '20px';
    container.style.zIndex = '9999';
    container.style.fontFamily = 'Arial, sans-serif';
  
    // Create the main toggle button
    var toggleButton = document.createElement('button');
    toggleButton.innerText = 'Accessibility Options';
    toggleButton.style.background = '#007BFF';
    toggleButton.style.color = 'white';
    toggleButton.style.border = 'none';
    toggleButton.style.padding = '10px 15px';
    toggleButton.style.borderRadius = '5px';
    toggleButton.style.cursor = 'pointer';
  
    // Create options panel that holds additional buttons
    var optionsPanel = document.createElement('div');
    optionsPanel.style.display = 'none';
    optionsPanel.style.marginTop = '10px';
    optionsPanel.style.background = '#fff';
    optionsPanel.style.border = '1px solid #ccc';
    optionsPanel.style.borderRadius = '5px';
    optionsPanel.style.padding = '10px';
    optionsPanel.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
  
    // Create service buttons
    var increaseTextButton = document.createElement('button');
    increaseTextButton.innerText = 'Increase Text';
    var decreaseTextButton = document.createElement('button');
    decreaseTextButton.innerText = 'Decrease Text';
    var toggleContrastButton = document.createElement('button');
    toggleContrastButton.innerText = 'Toggle Contrast';
    var toggleDyslexiaButton = document.createElement('button');
    toggleDyslexiaButton.innerText = 'Dyslexia Font';
    var toggleMotionButton = document.createElement('button');
    toggleMotionButton.innerText = 'Reduce Motion';
    var readAloudButton = document.createElement('button');
    readAloudButton.innerText = 'Read Aloud';
    var stopReadingButton = document.createElement('button');
    stopReadingButton.innerText = 'Stop Reading';
  
    // Style service buttons uniformly
    var serviceButtons = [
      increaseTextButton,
      decreaseTextButton,
      toggleContrastButton,
      toggleDyslexiaButton,
      toggleMotionButton,
      readAloudButton,
      stopReadingButton
    ];
    serviceButtons.forEach(function(btn) {
      btn.style.margin = '5px';
      btn.style.padding = '8px 12px';
      btn.style.border = '1px solid #007BFF';
      btn.style.borderRadius = '3px';
      btn.style.background = 'white';
      btn.style.color = '#007BFF';
      btn.style.cursor = 'pointer';
    });
  
    // Append service buttons to the options panel
    optionsPanel.appendChild(increaseTextButton);
    optionsPanel.appendChild(decreaseTextButton);
    optionsPanel.appendChild(toggleContrastButton);
    optionsPanel.appendChild(toggleDyslexiaButton);
    optionsPanel.appendChild(toggleMotionButton);
    optionsPanel.appendChild(readAloudButton);
    optionsPanel.appendChild(stopReadingButton);
  
    // Append the toggle button and options panel to the container
    container.appendChild(toggleButton);
    container.appendChild(optionsPanel);
  
    // Append the widget container to the page body
    document.body.appendChild(container);
  
    // Toggle the display of the options panel on button click
    toggleButton.addEventListener('click', function() {
      optionsPanel.style.display = (optionsPanel.style.display === 'none') ? 'block' : 'none';
    });
  
    // Increase the text size forcefully
    increaseTextButton.addEventListener('click', function() {
      fontScale *= 1.1;
      updateFontScaling();
    });
  
    // Decrease the text size forcefully
    decreaseTextButton.addEventListener('click', function() {
      fontScale *= 0.9;
      updateFontScaling();
    });
  
    // Toggle high contrast mode on the page
    toggleContrastButton.addEventListener('click', function() {
      document.body.classList.toggle('high-contrast');
    });
  
    // Toggle dyslexia-friendly font on the page
    toggleDyslexiaButton.addEventListener('click', function() {
      document.body.classList.toggle('dyslexia-font');
    });
  
    // Toggle reduced motion mode on the page
    toggleMotionButton.addEventListener('click', function() {
      document.body.classList.toggle('reduce-motion');
    });
  
    // Text-to-Speech functionality using the Web Speech API
    var synth = window.speechSynthesis;
    var readingUtterance = null;
    
    readAloudButton.addEventListener('click', function() {
      // If already speaking, do nothing
      if (synth.speaking) return;
      // Get the text content from the body
      var text = document.body.innerText;
      readingUtterance = new SpeechSynthesisUtterance(text);
      // Optional: Set voice, rate, and pitch if needed
      readingUtterance.rate = 1;
      readingUtterance.pitch = 1;
      synth.speak(readingUtterance);
    });
  
    stopReadingButton.addEventListener('click', function() {
      if (synth.speaking) {
        synth.cancel();
      }
    });
  })();
  