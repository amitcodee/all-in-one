// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbj0s_7tKNgHkyaGpp3yy5PaTeN6m_uHg",
    authDomain: "all-in-one-24dec.firebaseapp.com",
    projectId: "all-in-one-24dec",
    storageBucket: "all-in-one-24dec.firebasestorage.app",
    messagingSenderId: "409979618069",
    appId: "1:409979618069:web:43c6cd6a8f645705cfdf1c"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Check if the website is approved
  async function checkWebsiteApproval() {
    const website = window.location.origin;
    const approvedSitesRef = db.collection("approved_websites");
    const query = approvedSitesRef.where("url", "==", website).where("status", "==", "approved");
    
    const snapshot = await query.get();
    if (!snapshot.empty) {
      injectWidget();
    }
  }
  
  // Inject the widget button & sidebar
  function injectWidget() {
    // Create Floating Button
    let widgetBtn = document.createElement("button");
    widgetBtn.innerText = "🦾 Accessibility";
    widgetBtn.style.position = "fixed";
    widgetBtn.style.bottom = "20px";
    widgetBtn.style.right = "20px";
    widgetBtn.style.background = "#000";
    widgetBtn.style.color = "#fff";
    widgetBtn.style.padding = "10px";
    widgetBtn.style.borderRadius = "5px";
    widgetBtn.style.zIndex = "1000";
    widgetBtn.onclick = openSidebar;
    
    document.body.appendChild(widgetBtn);
  }
  
  // Open Accessibility Sidebar
  function openSidebar() {
    let sidebar = document.getElementById("accessibility-sidebar");
    
    if (!sidebar) {
      sidebar = document.createElement("div");
      sidebar.id = "accessibility-sidebar";
      sidebar.style.position = "fixed";
      sidebar.style.top = "0";
      sidebar.style.right = "0";
      sidebar.style.width = "100%";
      sidebar.style.height = "100%";
      sidebar.style.background = "#fff";
      sidebar.style.boxShadow = "-5px 0px 10px rgba(0,0,0,0.2)";
      sidebar.style.padding = "20px";
      sidebar.style.zIndex = "1001";
      sidebar.style.transform = "translateX(100%)";
      sidebar.style.transition = "transform 0.4s ease-in-out";
  
      sidebar.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2>Accessibility Options</h2>
          <button id="close-sidebar" style="font-size: 20px; cursor: pointer;">❌</button>
        </div>
        <button onclick="document.body.style.fontSize = 'larger'">Increase Font Size</button>
        <button onclick="document.body.style.fontSize = 'smaller'">Decrease Font Size</button>
        <button onclick="document.body.classList.toggle('high-contrast')">Toggle Contrast</button>
        <button onclick="document.body.classList.toggle('grayscale')">Grayscale Mode</button>
        <button onclick="new SpeechSynthesisUtterance(document.body.innerText).speak()">Read Aloud</button>
      `;
  
      document.body.appendChild(sidebar);
      
      setTimeout(() => sidebar.style.transform = "translateX(0)", 10);
  
      document.getElementById("close-sidebar").addEventListener("click", () => {
        sidebar.style.transform = "translateX(100%)";
      });
    }
  }
  
  // Run the widget check when the script is loaded
  checkWebsiteApproval();
  