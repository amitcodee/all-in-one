// Enhanced Page Structure Feature with Tabs
// This is the replacement code for the page-structure functionality

function enhancedPageStructure() {
  // Handle page structure modal
  if (document.getElementById("page-structure-modal")) {
    document.getElementById("page-structure-modal").remove();
    return;
  }

  var modal = document.createElement("div");
  modal.id = "page-structure-modal";
  modal.style.cssText =
    "position:fixed;top:0;right:0;width:30%;height:100%;background:#fff;border-left:2px solid #ccc;overflow:hidden;z-index:500001;box-shadow:-5px 0 15px rgba(0,0,0,0.2);font-family:inherit;display:flex;flex-direction:column;";

  var header = document.createElement("div");
  header.style.cssText =
    "display:flex;justify-content:space-between;align-items:center;padding:20px;border-bottom:2px solid #eff1f5;flex-shrink:0;";
  header.innerHTML =
    '<h2 style="margin:0;color:#0848ca;font-size:18px;">Page Structure</h2><button id="close-page-structure" style="background:#0848ca;color:white;border:none;padding:8px 12px;border-radius:5px;cursor:pointer;">Close</button>';
  modal.appendChild(header);

  // Tab navigation
  var tabNav = document.createElement("div");
  tabNav.style.cssText =
    "display:flex;background:#f8f9fa;border-bottom:1px solid #dee2e6;flex-shrink:0;";
  tabNav.innerHTML =
    '<button class="ps-tab-btn active" data-tab="headings" style="flex:1;padding:12px;border:none;background:transparent;cursor:pointer;font-weight:600;color:#0848ca;border-bottom:2px solid #0848ca;">📋 Headings</button>' +
    '<button class="ps-tab-btn" data-tab="landmarks" style="flex:1;padding:12px;border:none;background:transparent;cursor:pointer;font-weight:600;color:#6c757d;border-bottom:2px solid transparent;">🏛️ Landmarks</button>' +
    '<button class="ps-tab-btn" data-tab="links" style="flex:1;padding:12px;border:none;background:transparent;cursor:pointer;font-weight:600;color:#6c757d;border-bottom:2px solid transparent;">🔗 Links</button>';
  modal.appendChild(tabNav);

  var content = document.createElement("div");
  content.id = "page-structure-content";
  content.style.cssText = "flex:1;overflow-y:auto;padding:20px;";
  modal.appendChild(content);

  // Helper function to create clickable items that scroll to elements
  function createClickableItem(element, text, icon, description) {
    var item = document.createElement("div");
    item.style.cssText =
      "padding:12px;margin:8px 0;background:#f8f9fa;border-radius:8px;cursor:pointer;transition:all 0.2s;border-left:4px solid #0848ca;position:relative;";

    var mainContent =
      '<div style="display:flex;align-items:flex-start;gap:10px;">';
    mainContent +=
      '<span style="color:#0848ca;font-size:16px;flex-shrink:0;">' +
      icon +
      "</span>";
    mainContent += '<div style="flex:1;min-width:0;">';
    mainContent +=
      '<div style="font-weight:600;color:#212529;margin-bottom:4px;word-break:break-word;">' +
      text +
      "</div>";
    if (description) {
      mainContent +=
        '<div style="font-size:12px;color:#6c757d;word-break:break-word;">' +
        description +
        "</div>";
    }
    mainContent += "</div></div>";

    item.innerHTML = mainContent;

    item.addEventListener("click", function () {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.style.outline = "3px solid #0848ca";
      element.style.outlineOffset = "2px";
      setTimeout(function () {
        element.style.outline = "";
        element.style.outlineOffset = "";
      }, 3000);
    });

    item.addEventListener("mouseenter", function () {
      this.style.background = "#e9ecef";
      this.style.transform = "translateX(4px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.background = "#f8f9fa";
      this.style.transform = "translateX(0)";
    });

    return item;
  }

  function showTab(tabName) {
    // Update tab buttons
    var tabBtns = modal.querySelectorAll(".ps-tab-btn");
    tabBtns.forEach(function (btn) {
      if (btn.dataset.tab === tabName) {
        btn.style.color = "#0848ca";
        btn.style.borderBottomColor = "#0848ca";
        btn.classList.add("active");
      } else {
        btn.style.color = "#6c757d";
        btn.style.borderBottomColor = "transparent";
        btn.classList.remove("active");
      }
    });

    // Clear content
    content.innerHTML = "";

    if (tabName === "headings") {
      var headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      if (headings.length > 0) {
        headings.forEach(function (heading) {
          var level = heading.tagName.toLowerCase();
          var text = heading.textContent.trim() || "Empty heading";
          var shortText =
            text.length > 50 ? text.substring(0, 50) + "..." : text;
          var item = createClickableItem(
            heading,
            level.toUpperCase() + ": " + shortText,
            "📝",
            text.length > 50 ? text : null
          );
          content.appendChild(item);
        });
      } else {
        content.innerHTML =
          '<div style="text-align:center;color:#6c757d;margin-top:40px;"><p>No headings found on this page</p></div>';
      }
    } else if (tabName === "landmarks") {
      // Comprehensive landmark detection - includes all sections, divs, and ARIA landmarks
      var landmarkSelectors = [
        "main",
        "nav", 
        "header",
        "footer",
        "aside",
        "section", // Include ALL sections
        "article",
        "form",
        "div", // Include ALL divs
        '[role="banner"]',
        '[role="navigation"]',
        '[role="main"]',
        '[role="contentinfo"]',
        '[role="complementary"]',
        '[role="region"]',
        '[role="search"]',
        '[role="form"]',
        '[role="application"]',
        '[role="document"]',
      ];

      var allElements = document.querySelectorAll(landmarkSelectors.join(", "));
      var landmarkItems = [];

      allElements.forEach(function (element) {
        // Skip script, style, and hidden elements
        if (
          element.tagName.toLowerCase() === "script" ||
          element.tagName.toLowerCase() === "style" ||
          element.style.display === "none" ||
          element.hidden
        ) {
          return;
        }

        var role = element.getAttribute("role") || element.tagName.toLowerCase();
        var label =
          element.getAttribute("aria-label") ||
          element.getAttribute("aria-labelledby") ||
          element.getAttribute("title") ||
          element.id ||
          "";

        var displayName = role.charAt(0).toUpperCase() + role.slice(1);
        var description = "";

        // Enhanced descriptions based on element type
        if (role === "main" || element.tagName.toLowerCase() === "main") {
          displayName = "Main Content";
          description = "Primary content area of the page";
        } else if (
          role === "navigation" ||
          element.tagName.toLowerCase() === "nav"
        ) {
          displayName = "Navigation";
          description = label || "Navigation menu or links";
        } else if (
          role === "banner" ||
          element.tagName.toLowerCase() === "header"
        ) {
          displayName = "Header/Banner";
          description = label || "Page header or banner area";
        } else if (
          role === "contentinfo" ||
          element.tagName.toLowerCase() === "footer"
        ) {
          displayName = "Footer";
          description = label || "Page footer information";
        } else if (element.tagName.toLowerCase() === "aside") {
          displayName = "Aside/Sidebar";
          description = label || "Supplementary content";
        } else if (element.tagName.toLowerCase() === "section") {
          displayName = "Section";
          description = label || "Thematic grouping of content";
          // Try to get some content preview for sections
          var textContent = element.textContent.trim();
          if (textContent.length > 0) {
            description += " - " + textContent.substring(0, 50) + (textContent.length > 50 ? "..." : "");
          }
        } else if (element.tagName.toLowerCase() === "article") {
          displayName = "Article";
          description = label || "Standalone piece of content";
        } else if (
          element.tagName.toLowerCase() === "form" ||
          role === "form"
        ) {
          displayName = "Form";
          description = label || "Interactive form element";
        } else if (element.tagName.toLowerCase() === "div") {
          // Only include divs with semantic meaning
          if (role && role !== "div") {
            displayName = "Div (" + role + ")";
            description = label || "Container with " + role + " role";
          } else if (label) {
            displayName = "Div";
            description = label;
          } else {
            // Skip unlabeled divs without roles
            return;
          }
        }

        if (label && !description.includes(label)) {
          if (displayName.includes(":")) {
            displayName = displayName.split(":")[0] + ": " + label;
          } else {
            displayName += ": " + label;
          }
        }

        landmarkItems.push({
          element: element,
          name: displayName,
          description: description,
          tagName: element.tagName.toLowerCase(),
        });
      });

      if (landmarkItems.length > 0) {
        // Sort landmarks by document order
        landmarkItems.sort(function (a, b) {
          return a.element.compareDocumentPosition(b.element) &
            Node.DOCUMENT_POSITION_FOLLOWING
            ? -1
            : 1;
        });

        landmarkItems.forEach(function (landmarkItem) {
          var icon = "🏛️";
          if (landmarkItem.tagName === "nav") icon = "🧭";
          else if (landmarkItem.tagName === "header") icon = "📰";
          else if (landmarkItem.tagName === "footer") icon = "📄";
          else if (landmarkItem.tagName === "main") icon = "📋";
          else if (landmarkItem.tagName === "aside") icon = "📌";
          else if (landmarkItem.tagName === "section") icon = "📦";
          else if (landmarkItem.tagName === "article") icon = "📝";
          else if (landmarkItem.tagName === "form") icon = "📝";
          else if (landmarkItem.tagName === "div") icon = "📋";

          var item = createClickableItem(
            landmarkItem.element,
            landmarkItem.name,
            icon,
            landmarkItem.description
          );
          content.appendChild(item);
        });
      } else {
        content.innerHTML =
          '<div style="text-align:center;color:#6c757d;margin-top:40px;"><p>No landmarks found on this page</p></div>';
      }
    } else if (tabName === "links") {
      var links = document.querySelectorAll("a[href]");
      if (links.length > 0) {
        links.forEach(function (link) {
          var text =
            link.textContent.trim() ||
            link.getAttribute("aria-label") ||
            link.getAttribute("title") ||
            link.href;
          var shortText =
            text.length > 40 ? text.substring(0, 40) + "..." : text;
          var isExternal =
            link.hostname && link.hostname !== window.location.hostname;
          var icon = isExternal ? "🔗" : "🔗";
          var description = isExternal
            ? "External link: " + link.href
            : "Internal link: " + link.href;

          if (link.getAttribute("aria-label")) {
            description =
              "Aria-label: " +
              link.getAttribute("aria-label") +
              " | " +
              description;
          }

          var item = createClickableItem(link, shortText, icon, description);
          content.appendChild(item);
        });
      } else {
        content.innerHTML =
          '<div style="text-align:center;color:#6c757d;margin-top:40px;"><p>No links found on this page</p></div>';
      }
    }
  }

  // Tab click handlers
  tabNav.addEventListener("click", function (e) {
    if (e.target.classList.contains("ps-tab-btn")) {
      showTab(e.target.dataset.tab);
    }
  });

  document.body.appendChild(modal);

  // Show default tab
  showTab("headings");

  // Close button handler
  document
    .getElementById("close-page-structure")
    .addEventListener("click", function () {
      modal.remove();
    });

  return modal;
}

// Export the function for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = enhancedPageStructure;
}
