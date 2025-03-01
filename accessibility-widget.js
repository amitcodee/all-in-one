(function() {
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
  
    // Style service buttons uniformly
    [increaseTextButton, decreaseTextButton, toggleContrastButton].forEach(function(btn) {
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
  
    // Append the toggle button and options panel to the container
    container.appendChild(toggleButton);
    container.appendChild(optionsPanel);
  
    // Append the widget container to the page body
    document.body.appendChild(container);
  
    // Toggle the display of the options panel on button click
    toggleButton.addEventListener('click', function() {
      optionsPanel.style.display = (optionsPanel.style.display === 'none') ? 'block' : 'none';
    });
  
    // Increase the text size on the page
    increaseTextButton.addEventListener('click', function() {
      var currentSize = parseFloat(window.getComputedStyle(document.body).fontSize);
      document.body.style.fontSize = (currentSize * 1.1) + 'px';
    });
  
    // Decrease the text size on the page
    decreaseTextButton.addEventListener('click', function() {
      var currentSize = parseFloat(window.getComputedStyle(document.body).fontSize);
      document.body.style.fontSize = (currentSize * 0.9) + 'px';
    });
  
    // Toggle high contrast mode on the page
    toggleContrastButton.addEventListener('click', function() {
      document.body.classList.toggle('high-contrast');
    });
  
    // Inject CSS for high contrast mode
    var style = document.createElement('style');
    style.innerHTML = `
      .high-contrast {
        background-color: black !important;
        color: white !important;
      }
      .high-contrast a {
        color: #00ffff !important;
      }
    `;
    document.head.appendChild(style);
  })();
  