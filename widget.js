(function(){
    // --- Firebase Configuration (Inline) ---
    const firebaseConfig = {
      apiKey: "AIzaSyBbj0s_7tKNgHkyaGpp3yy5PaTeN6m_uHg",
      authDomain: "all-in-one-24dec.firebaseapp.com",
      projectId: "all-in-one-24dec",
      storageBucket: "all-in-one-24dec.firebasestorage.app",
      messagingSenderId: "409979618069",
      appId: "1:409979618069:web:43c6cd6a8f645705cfdf1c"
    };
  
    // Initialize Firebase using the compat libraries
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
  
    // --- Function: Check if the current website is approved ---
    async function checkWebsiteApproval() {
      const website = window.location.origin;
      console.log("Checking approval for:", website);
      const approvedSitesRef = db.collection("approved_websites");
      const query = approvedSitesRef.where("url", "==", website).where("status", "==", "approved");
  
      try {
        const snapshot = await query.get();
        console.log("Approval snapshot size:", snapshot.size);
        if (!snapshot.empty) {
          console.log("Website approved, injecting widget.");
          injectWidget();
        } else {
          console.log("Website not approved, showing registration form.");
          showRegistrationForm();
        }
      } catch (error) {
        console.error("Error checking website approval:", error);
      }
    }
  
    // --- Function: Inject the Accessibility Widget ---
    function injectWidget() {
      // Create a floating accessibility button
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
  
    // --- Function: Open the Full-Width Sidebar ---
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
  
        // Animate the sidebar in
        setTimeout(() => sidebar.style.transform = "translateX(0)", 10);
  
        document.getElementById("close-sidebar").addEventListener("click", () => {
          sidebar.style.transform = "translateX(100%)";
        });
      } else {
        // Toggle sidebar visibility
        sidebar.style.transform = (sidebar.style.transform === "translateX(100%)") ? "translateX(0)" : "translateX(100%)";
      }
    }
  
    // --- Function: Show Registration Form if Website Not Approved ---
    function showRegistrationForm() {
      let formDiv = document.createElement("div");
      formDiv.id = "registration-form";
      formDiv.style.position = "fixed";
      formDiv.style.bottom = "20px";
      formDiv.style.left = "20px";
      formDiv.style.background = "#fff";
      formDiv.style.padding = "20px";
      formDiv.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
      formDiv.style.zIndex = "1000";
      
      formDiv.innerHTML = `
        <h3>Register Your Website</h3>
        <p>Please enter your website URL to register:</p>
        <form id="register-form">
          <input type="url" id="website-input" value="${window.location.origin}" required />
          <br /><br />
          <button type="submit">Register Now</button>
        </form>
        <div id="form-message"></div>
      `;
      document.body.appendChild(formDiv);
      
      document.getElementById("register-form").addEventListener("submit", async function(event) {
        event.preventDefault();
        const websiteUrl = document.getElementById("website-input").value;
        const messageDiv = document.getElementById("form-message");
        try {
          await db.collection("approved_websites").add({
            url: websiteUrl,
            status: "pending" // Change to "approved" for auto-approval if desired
          });
          messageDiv.innerHTML = "<p>Registration submitted for approval. Please check back later.</p>";
        } catch (error) {
          console.error("Error registering website:", error);
          messageDiv.innerHTML = "<p>Error registering your website. Please try again later.</p>";
        }
      });
    }
  
    // --- Run the widget approval check on script load ---
    checkWebsiteApproval();
  })();
  