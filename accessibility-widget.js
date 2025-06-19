(() => {
  "use strict";
  var t = function () {
      return (
        (t =
          Object.assign ||
          function (t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
              for (var a in (e = arguments[i]))
                Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t;
          }),
        t.apply(this, arguments)
      );
    },
    e = {},
    i = "asw";
  function n(i) {
    var n = t(t({}, e), { states: t(t({}, e.states), i) });
    return a(n), n;
  }
  function a(n) {
    (e = t(t({}, e), n)),
      (function (t, e, i) {
        var n = new Date();
        n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3);
        var a = "expires=" + n.toUTCString();
        document.cookie = t + "=" + e + ";" + a + ";path=/";
      })(i, JSON.stringify(e));
  }
  function o(t) {
    var i;
    return null === (i = null == e ? void 0 : e.states) || void 0 === i
      ? void 0
      : i[t];
  }
  function s(t) {
    if ((void 0 === t && (t = !0), t)) return e;
    var n = (function (t) {
      for (
        var e = t + "=",
          i = decodeURIComponent(document.cookie).split(";"),
          n = 0;
        n < i.length;
        n++
      ) {
        for (var a = i[n]; " " == a.charAt(0); ) a = a.substring(1);
        if (0 == a.indexOf(e)) return a.substring(e.length, a.length);
      }
      return "";
    })(i);
    return n && (e = JSON.parse(n)), e;
  }

  function r(t) {
    void 0 === t && (t = 1),
      document
        .querySelectorAll(
          "h1,h2,h3,h4,h5,h6,p,a,dl,dt,li,ol,th,td,span,blockquote,.asw-text"
        )
        .forEach(function (e) {
          var i;
          if (
            !e.classList.contains("material-icons") &&
            !e.classList.contains("fa")
          ) {
            var n = Number(
              null !== (i = e.getAttribute("data-asw-orgFontSize")) &&
                void 0 !== i
                ? i
                : 0
            );
            n ||
              ((n = parseInt(
                window.getComputedStyle(e).getPropertyValue("font-size")
              )),
              e.setAttribute("data-asw-orgFontSize", String(n)));
            var a = n * t;
            e.style["font-size"] = a + "px";
          }
        });
    var e = document.querySelector(".asw-amount");
    e && (e.innerText = "".concat((100 * t).toFixed(0), "%"));
  }
  function l(t) {
    var e = t.id,
      i = t.css;
    if (i) {
      var n =
        document.getElementById(e || "") || document.createElement("style");
      (n.innerHTML = i), n.id || ((n.id = e), document.head.appendChild(n));
    } else {
      var n = document.getElementById(e || "");
      n && n.remove();
    }
  }
  var c = ["-o-", "-ms-", "-moz-", "-webkit-", ""],
    g = ["filter"];
  function u(t) {
    var e,
      i = "";
    return (
      t &&
        ((i += (function (t) {
          var e = "";
          if (t) {
            var i = function (i) {
              (g.includes(i) ? c : [""]).forEach(function (n) {
                e += "".concat(n).concat(i, ":").concat(t[i], " !important;");
              });
            };
            for (var n in t) i(n);
          }
          return e;
        })(t.styles)).length &&
          t.selector &&
          (i = (function (t) {
            var e = t.selector,
              i = t.childrenSelector,
              n = void 0 === i ? [""] : i,
              a = t.css,
              o = "";
            return (
              n.forEach(function (t) {
                o += "".concat(e, " ").concat(t, "{").concat(a, "}");
              }),
              o
            );
          })({
            selector: t.selector,
            childrenSelector: t.childrenSelector,
            css: i,
          })),
        (i += null !== (e = t.css) && void 0 !== e ? e : "")),
      i
    );
  }
  function d(t) {
    var e,
      i = t.id,
      n = void 0 === i ? "" : i,
      a = t.enable,
      o = void 0 !== a && a,
      s = "asw-".concat(n);
    o
      ? l({ css: u(t), id: s })
      : null === (e = document.getElementById(s)) || void 0 === e || e.remove();
    document.documentElement.classList.toggle(s, o);
  }
  var h = function (t, e, i) {
      if (i || 2 === arguments.length)
        for (var n, a = 0, o = e.length; a < o; a++)
          (!n && a in e) ||
            (n || (n = Array.prototype.slice.call(e, 0, a)), (n[a] = e[a]));
      return t.concat(n || Array.prototype.slice.call(e));
    },
    p = ["", "*:not(.material-icons,.asw-menu,.asw-menu *)"],
    m = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      ".wsite-headline",
      ".wsite-content-title",
    ],
    v = h(
      h([], m, !0),
      [
        "img",
        "p",
        "i",
        "svg",
        "a",
        "button:not(.asw-btn)",
        "label",
        "li",
        "ol",
      ],
      !1
    ),
    b = {
      "dark-contrast": {
        styles: { color: "#FFF", fill: "#FFF", "background-color": "#000" },
        childrenSelector: ["", "*:not(.material-icons)"],
        css: "html, body { background-color: #000 !important; color: #FFF !important; } body * { border-color: #FFF !important; } input, textarea, select { background-color: #000 !important; color: #FFF !important; border: 1px solid #FFF !important; } input::placeholder, textarea::placeholder { color: #CCC !important; } .asw-menu { background-color: #000 !important; color: #FFF !important; border-color: #FFF !important; } .asw-menu * { background-color: #000 !important; color: #FFF !important; } .asw-menu button { background-color: #000 !important; color: #FFF !important; border: 1px solid #FFF !important; } .asw-menu button:hover { background-color: #333 !important; } .asw-menu .asw-btn { background-color: #000 !important; color: #FFF !important; border-color: #FFF !important; } .asw-menu .asw-btn:hover { background-color: #333 !important; }",
      },
      "light-contrast": {
        styles: { color: "#000", fill: "#000", "background-color": "#FFF" },
        childrenSelector: v,
      },
      "high-contrast": { styles: { filter: "contrast(125%)" } },
      "high-saturation": { styles: { filter: "saturate(200%)" } },
      "low-saturation": { styles: { filter: "saturate(50%)" } },
      monochrome: { styles: { filter: "grayscale(100%)" } },
      "hide-images": {
        id: "hide-images",
        styles: { display: "none" },
        selector: "img",
        css: "img:not(.asw-container img):not(.asw-widget img):not(.asw-menu img):not(.asw-menu * img):not(.asw-rg img):not(.asw-rg * img):not(.asw-menu-btn img):not(.asw-menu-btn * img), [style*='background-image']:not(.asw-container):not(.asw-widget):not(.asw-menu):not(.asw-menu *):not(.asw-container *):not(.asw-widget *):not(.asw-rg):not(.asw-rg *):not(.asw-menu-btn):not(.asw-menu-btn *) { display: none !important; } *:not(.asw-container):not(.asw-widget):not(.asw-menu):not(.asw-menu *):not(.asw-container *):not(.asw-widget *):not(.asw-rg):not(.asw-rg *):not(.asw-menu-btn):not(.asw-menu-btn *) { background-image: none !important; }",
      },
      "hide-videos": {
        id: "hide-videos",
        styles: { display: "none" },
        selector:
          "video, iframe[src*='youtube'], iframe[src*='vimeo'], iframe[src*='dailymotion'], iframe[src*='twitch']",
        css: "video:not(.asw-container video):not(.asw-widget video):not(.asw-menu video):not(.asw-menu * video):not(.asw-rg video):not(.asw-rg * video):not(.asw-menu-btn video):not(.asw-menu-btn * video), iframe[src*='youtube']:not(.asw-container iframe):not(.asw-widget iframe):not(.asw-menu iframe):not(.asw-rg iframe):not(.asw-menu-btn iframe), iframe[src*='vimeo']:not(.asw-container iframe):not(.asw-widget iframe):not(.asw-menu iframe):not(.asw-rg iframe):not(.asw-menu-btn iframe), iframe[src*='dailymotion']:not(.asw-container iframe):not(.asw-widget iframe):not(.asw-menu iframe):not(.asw-rg iframe):not(.asw-menu-btn iframe), iframe[src*='twitch']:not(.asw-container iframe):not(.asw-widget iframe):not(.asw-menu iframe):not(.asw-rg iframe):not(.asw-menu-btn iframe), embed[src*='video']:not(.asw-container embed):not(.asw-widget embed):not(.asw-menu embed):not(.asw-rg embed):not(.asw-menu-btn embed) { display: none !important; }",
      },
      "hide-icons": {
        id: "hide-icons",
        styles: { display: "none" },
        selector:
          "i, .icon, [class*='icon-'], [class*='fa-'], .material-icons, svg:not(.asw-menu svg):not(.asw-menu * svg):not(.asw-menu-btn svg):not(.asw-menu-btn * svg)",
        css: "i:not(.asw-container i):not(.asw-widget i):not(.asw-menu i):not(.asw-menu * i):not(.asw-container * i):not(.asw-widget * i):not(.asw-rg i):not(.asw-rg * i):not(.asw-menu-btn i):not(.asw-menu-btn * i), .icon:not(.asw-container .icon):not(.asw-widget .icon):not(.asw-menu .icon):not(.asw-menu * .icon):not(.asw-rg .icon):not(.asw-rg * .icon):not(.asw-menu-btn .icon):not(.asw-menu-btn * .icon), [class*='icon-']:not(.asw-container [class*='icon-']):not(.asw-widget [class*='icon-']):not(.asw-menu [class*='icon-']):not(.asw-menu * [class*='icon-']):not(.asw-rg [class*='icon-']):not(.asw-rg * [class*='icon-']):not(.asw-menu-btn [class*='icon-']):not(.asw-menu-btn * [class*='icon-']), [class*='fa-']:not(.asw-container [class*='fa-']):not(.asw-widget [class*='fa-']):not(.asw-menu [class*='fa-']):not(.asw-menu * [class*='fa-']):not(.asw-rg [class*='fa-']):not(.asw-rg * [class*='fa-']):not(.asw-menu-btn [class*='fa-']):not(.asw-menu-btn * [class*='fa-']), .material-icons:not(.asw-container .material-icons):not(.asw-widget .material-icons):not(.asw-menu .material-icons):not(.asw-menu * .material-icons):not(.asw-rg .material-icons):not(.asw-rg * .material-icons):not(.asw-menu-btn .material-icons):not(.asw-menu-btn * .material-icons), svg:not(.asw-container svg):not(.asw-widget svg):not(.asw-menu svg):not(.asw-menu * svg):not(.asw-container * svg):not(.asw-widget * svg):not(.asw-rg svg):not(.asw-rg * svg):not(.asw-menu-btn svg):not(.asw-menu-btn * svg) { display: none !important; }",
      },
    };
  var S = function () {
    return (
      (S =
        Object.assign ||
        function (t) {
          for (var e, i = 1, n = arguments.length; i < n; i++)
            for (var a in (e = arguments[i]))
              Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
          return t;
        }),
      S.apply(this, arguments)
    );
  };
  function w() {
    var t = s().states.contrast,
      e = "",
      i = b[t];
    i && (e = u(S(S({}, i), { selector: "html.aws-filter" }))),
      l({ css: e, id: "asw-filter-style" }),
      document.documentElement.classList.toggle("aws-filter", Boolean(t));
  }
  var y = function () {
      return (
        (y =
          Object.assign ||
          function (t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
              for (var a in (e = arguments[i]))
                Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t;
          }),
        y.apply(this, arguments)
      );
    },
    f = {
      id: "stop-animations",
      selector: "html",
      childrenSelector: ["*"],
      styles: {
        transition: "none",
        "animation-fill-mode": "forwards",
        "animation-iteration-count": "1",
        "animation-duration": ".01s",
      },
    };
  var k = function () {
      return (
        (k =
          Object.assign ||
          function (t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
              for (var a in (e = arguments[i]))
                Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t;
          }),
        k.apply(this, arguments)
      );
    },
    A = {
      id: "readable-font",
      selector: "html",
      childrenSelector: (function (t, e, i) {
        if (i || 2 === arguments.length)
          for (var n, a = 0, o = e.length; a < o; a++)
            (!n && a in e) ||
              (n || (n = Array.prototype.slice.call(e, 0, a)), (n[a] = e[a]));
        return t.concat(n || Array.prototype.slice.call(e));
      })(["", "*:not(.material-icons,.fa)"], v, !0),
      styles: {
        "font-family": "OpenDyslexic3,Comic Sans MS,Arial,Helvetica,sans-serif",
      },
      css: '@font-face {font-family: OpenDyslexic3;src: url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.woff") format("woff"), url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.ttf") format("truetype");}',
    };
  var C = function () {
      return (
        (C =
          Object.assign ||
          function (t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
              for (var a in (e = arguments[i]))
                Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t;
          }),
        C.apply(this, arguments)
      );
    },
    L = {
      id: "big-cursor",
      selector: "body",
      childrenSelector: ["*"],
      styles: {
        cursor:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='98px' height='98px' viewBox='0 0 48 48'%3E%3Cpath fill='%23E0E0E0' d='M27.8 39.7c-.1 0-.2 0-.4-.1s-.4-.3-.6-.5l-3.7-8.6-4.5 4.2c-.1.2-.3.3-.6.3-.1 0-.3 0-.4-.1-.3-.1-.6-.5-.6-.9V12c0-.4.2-.8.6-.9.1-.1.3-.1.4-.1.2 0 .5.1.7.3l16 15c.3.3.4.7.3 1.1-.1.4-.5.6-.9.7l-6.3.6 3.9 8.5c.1.2.1.5 0 .8-.1.2-.3.5-.5.6l-2.9 1.3c-.2-.2-.4-.2-.5-.2z'/%3E%3Cpath fill='%23212121' d='m18 12 16 15-7.7.7 4.5 9.8-2.9 1.3-4.3-9.9L18 34V12m0-2c-.3 0-.5.1-.8.2-.7.3-1.2 1-1.2 1.8v22c0 .8.5 1.5 1.2 1.8.3.2.6.2.8.2.5 0 1-.2 1.4-.5l3.4-3.2 3.1 7.3c.2.5.6.9 1.1 1.1.2.1.5.1.7.1.3 0 .5-.1.8-.2l2.9-1.3c.5-.2.9-.6 1.1-1.1.2-.5.2-1.1 0-1.5l-3.3-7.2 4.9-.4c.8-.1 1.5-.6 1.7-1.3.3-.7.1-1.6-.5-2.1l-16-15c-.3-.5-.8-.7-1.3-.7z'/%3E%3C/svg%3E\") 40 15, auto",
      },
    };
  var F = function () {
      return (
        (F =
          Object.assign ||
          function (t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
              for (var a in (e = arguments[i]))
                Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t;
          }),
        F.apply(this, arguments)
      );
    },
    x = {
      id: "highlight-title",
      selector: "html",
      childrenSelector: m,
      styles: { outline: "2px solid #0048ff", "outline-offset": "2px" },
    };
  const H =
    '<style>.asw-rg{position:fixed;top:0;left:0;right:0;width:100%;height:0;pointer-events:none;background-color:rgba(0,0,0,.8);z-index:1000000}</style> <div class="asw-rg asw-rg-top"></div> <div class="asw-rg asw-rg-bottom" style="top:auto;bottom:0"></div>';
  var z = function () {
      return (
        (z =
          Object.assign ||
          function (t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
              for (var a in (e = arguments[i]))
                Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t;
          }),
        z.apply(this, arguments)
      );
    },
    j = {
      id: "highlight-links",
      selector: "html",
      childrenSelector: ["a[href]"],
      styles: { outline: "2px solid #0048ff", "outline-offset": "2px" },
    };
  var M = function () {
      return (
        (M =
          Object.assign ||
          function (t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
              for (var a in (e = arguments[i]))
                Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t;
          }),
        M.apply(this, arguments)
      );
    },    D = {
      id: "letter-spacing",
      selector: "html",
      childrenSelector: p,
      styles: { "letter-spacing": "1px" },
      level2: { "letter-spacing": "3px" },
      level3: { "letter-spacing": "5px" },
    };
  var R = function () {
      return (
        (R =
          Object.assign ||
          function (t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
              for (var a in (e = arguments[i]))
                Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t;
          }),
        R.apply(this, arguments)
      );
    },    O = {
      id: "line-height",
      selector: "html",
      childrenSelector: p,
      styles: { "line-height": "2" },
      level2: { "line-height": "2.5" },
      level3: { "line-height": "3" },
    };
  var T = function () {
      return (
        (T =
          Object.assign ||
          function (t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
              for (var a in (e = arguments[i]))
                Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t;
          }),
        T.apply(this, arguments)
      );
    },
    B = {
      id: "font-weight",
      selector: "html",
      childrenSelector: p,
      styles: { "font-weight": "700" },
    }; // Read on Click Feature - Enhanced with tag information
  function enableReadOnClick(enabled) {
    if (enabled === undefined) enabled = false;

    if (enabled) {
      if (!window.__asw__readOnClickHandler) {
        // Initialize voices on first load to avoid double-click issue
        if (window.speechSynthesis) {
          window.speechSynthesis.getVoices();
          // Wait for voices to load if they haven't already
          if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = function () {
              // Voices are now loaded
            };
          }
        }

        window.__asw__readOnClickHandler = function (event) {
          if (!event.target.closest(".asw-container")) {
            // Play click sound first
            try {
              const audio = new Audio("click.mp3");
              audio.volume = 0.5; // Moderate volume for click sound
              audio
                .play()
                .catch((err) => console.warn("Click sound blocked:", err));
            } catch (err) {
              console.warn("Could not play click sound:", err);
            }

            const element = event.target;
            const tagName = element.tagName.toLowerCase();

            // Get element description based on tag
            let description = "";
            switch (tagName) {
              case "h1":
              case "h2":
              case "h3":
              case "h4":
              case "h5":
              case "h6":
                description = "Heading level " + tagName.charAt(1);
                break;
              case "a":
                description = element.href ? "Link" : "Link";
                break;
              case "button":
                description = "Button";
                break;
              case "img":
                description = "Image";
                break;
              case "p":
                description = "Paragraph";
                break;
              case "div":
                description = "Section";
                break;
              case "span":
                description = "Text span";
                break;
              case "li":
                description = "List item";
                break;
              case "input":
                const inputType = element.type || "text";
                description = inputType + " input field";
                break;
              case "textarea":
                description = "Text area";
                break;
              case "select":
                description = "Dropdown menu";
                break;
              case "label":
                description = "Form label";
                break;
              case "nav":
                description = "Navigation";
                break;
              case "main":
                description = "Main content";
                break;
              case "header":
                description = "Header";
                break;
              case "footer":
                description = "Footer";
                break;
              default:
                description = "Element";
            }

            // Get text content
            let text = element.innerText || element.textContent || "";

            // For images, get alt text
            if (tagName === "img") {
              text = element.alt || "Image with no description";
            }
            // For links, handle specially to announce then navigate
            if (tagName === "a" && element.href) {
              event.preventDefault(); // Prevent immediate navigation
              const linkText = text.trim() || "Link";
              text = linkText;

              // We'll handle navigation after speech
              window.__asw__linkToNavigate = element.href;
              window.__asw__isLink = true;
            }

            // For form elements, include labels
            if (["input", "textarea", "select"].includes(tagName)) {
              const label =
                document.querySelector(`label[for="${element.id}"]`) ||
                element.closest("label") ||
                element.previousElementSibling;
              if (label && label.tagName.toLowerCase() === "label") {
                const labelText = label.innerText || label.textContent || "";
                text =
                  labelText +
                  ", " +
                  description +
                  (text ? ", value: " + text : "");
              } else {
                text = description + (text ? ", value: " + text : "");
              }
            } else {
              text = text.trim();
            }

            // Create full message
            let fullMessage = description;
            if (text) {
              fullMessage += ": " + text;
            }

            // Use system speech synthesis directly with delay for click sound
            if (fullMessage.trim()) {
              setTimeout(function () {
                if (window.speechSynthesis) {
                  window.speechSynthesis.cancel();

                  // Create speech utterance
                  const utterance = new SpeechSynthesisUtterance(fullMessage);

                  // Set speech properties for better audibility
                  utterance.rate = 0.9; // Slightly slower for clarity
                  utterance.pitch = 1.0; // Normal pitch
                  utterance.volume = 1.0; // Maximum volume
                  // Use system default voice - get voices again to ensure they're loaded
                  const voices = window.speechSynthesis.getVoices();
                  if (voices.length > 0) {
                    // Try to find the default system voice or use the first available
                    const defaultVoice =
                      voices.find((voice) => voice.default) || voices[0];
                    utterance.voice = defaultVoice;
                  }

                  // Add event handler to navigate to link after speech ends
                  utterance.onend = function () {
                    if (window.__asw__linkToNavigate && window.__asw__isLink) {
                      // Small delay to ensure speech has fully completed
                      setTimeout(function () {
                        try {
                          window.location.href = window.__asw__linkToNavigate;
                        } catch (error) {
                          console.warn("Failed to navigate to link:", error);
                          // Fallback: try opening in new tab
                          window.open(window.__asw__linkToNavigate, "_blank");
                        }
                        // Clean up the stored link
                        delete window.__asw__linkToNavigate;
                        delete window.__asw__isLink;
                      }, 100);
                    }
                  };

                  // Handle speech errors
                  utterance.onerror = function (event) {
                    console.warn("Speech synthesis error:", event);
                    // Still navigate to link even if speech fails
                    if (window.__asw__linkToNavigate && window.__asw__isLink) {
                      setTimeout(function () {
                        try {
                          window.location.href = window.__asw__linkToNavigate;
                        } catch (error) {
                          window.open(window.__asw__linkToNavigate, "_blank");
                        }
                        delete window.__asw__linkToNavigate;
                        delete window.__asw__isLink;
                      }, 100);
                    }
                  };

                  // Speak the text
                  window.speechSynthesis.speak(utterance);
                }
              }, 100); // Small delay to let click sound play first
            }
          }
        };
        document.addEventListener(
          "click",
          window.__asw__readOnClickHandler,
          true
        );
      }
    } else {
      if (window.__asw__readOnClickHandler) {
        document.removeEventListener(
          "click",
          window.__asw__readOnClickHandler,
          true
        );
        delete window.__asw__readOnClickHandler;

        // Stop any ongoing speech when disabling
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      }
    }
  }

  // Focus Outline Enhancement
  function enableFocusOutline(enabled) {
    if (enabled === undefined) enabled = false;

    const focusOutlineConfig = {
      id: "focus-outline",
      selector: "html",
      styles: {},
      css: `
        *:focus {
          outline: 3px solid #0066cc !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 0 1px #ffffff !important;
        }
        
        button:focus, input:focus, textarea:focus, select:focus, a:focus {
          outline: 3px solid #0066cc !important;
          outline-offset: 2px !important;
        }
      `,
    };
    d(Object.assign({}, focusOutlineConfig, { enable: enabled }));
  }

  function P() {
    var t,
      e = s().states;
    void 0 === (t = e["highlight-title"]) && (t = !1),
      d(F(F({}, x), { enable: t })),
      (function (t) {
        void 0 === t && (t = !1), d(z(z({}, j), { enable: t }));
      })(e["highlight-links"]),      (function (t) {
        void 0 === t && (t = 0);
        var config = M(M({}, D), { enable: t > 0 });
        if (t === 1) {
          config.styles = D.styles;
        } else if (t === 2) {
          config.styles = D.level2;
        } else if (t === 3) {
          config.styles = D.level3;
        }
        d(config);
      })(e["letter-spacing"]),      (function (t) {
        void 0 === t && (t = 0);
        var config = R(R({}, O), { enable: t > 0 });
        if (t === 1) {
          config.styles = O.styles;
        } else if (t === 2) {
          config.styles = O.level2;
        } else if (t === 3) {
          config.styles = O.level3;
        }
        d(config);
      })(e["line-height"]),
      (function (t) {
        void 0 === t && (t = !1), d(T(T({}, B), { enable: t }));
      })(e["font-weight"]),
      (function (t) {
        void 0 === t && (t = !1), d(k(k({}, A), { enable: t }));
      })(e["readable-font"]),
      (function (t) {
        void 0 === t && (t = !1);
        var e = document.querySelector(".asw-rg-container");
        if (t) {
          if (!e) {
            (e = document.createElement("div")).setAttribute(
              "class",
              "asw-rg-container"
            ),
              (e.innerHTML = H);
            var i = e.querySelector(".asw-rg-top"),
              n = e.querySelector(".asw-rg-bottom");
            (window.__asw__onScrollReadableGuide = function (t) {
              (i.style.height = t.clientY - 20 + "px"),
                (n.style.height = window.innerHeight - t.clientY - 40 + "px");
            }),
              document.addEventListener(
                "mousemove",
                window.__asw__onScrollReadableGuide,
                { passive: !1 }
              ),
              document.body.appendChild(e);
          }
        } else
          e && e.remove(),
            window.__asw__onScrollReadableGuide &&
              (document.removeEventListener(
                "mousemove",
                window.__asw__onScrollReadableGuide
              ),
              delete window.__asw__onScrollReadableGuide);
      })(e["readable-guide"]),
      (function (t) {
        void 0 === t && (t = !1), d(y(y({}, f), { enable: t }));
      })(e["stop-animations"]),
      (function (t) {
        void 0 === t && (t = !1), d(S(S({}, b["hide-images"]), { enable: t }));
      })(e["hide-images"]),
      (function (t) {
        void 0 === t && (t = !1), d(S(S({}, b["hide-videos"]), { enable: t }));
      })(e["hide-videos"]),
      (function (t) {
        void 0 === t && (t = !1), d(S(S({}, b["hide-icons"]), { enable: t }));
      })(e["hide-icons"]),
      (function (t) {
        void 0 === t && (t = !1), d(C(C({}, L), { enable: t }));
      })(e["big-cursor"]),
      enableReadOnClick(e["read-on-click"]),
      enableFocusOutline(e["focus-outline"]);
  }
  function V() {
    var t = s().states;
    r((null == t ? void 0 : t.fontSize) || 1), P(), w();
  }
  const I =
    '<style>.asw-menu,.asw-widget{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:400;-webkit-font-smoothing:antialiased}.asw-menu *,.asw-widget *{box-sizing:border-box!important}.asw-menu-btn{position:fixed;z-index:500000;left:30px;bottom:30px;box-shadow:0 5px 15px 0 rgb(37 44 97 / 15%),0 2px 4px 0 rgb(93 100 148 / 20%);transition:transform .2s ease;border-radius:50%;align-items:center;justify-content:center;width:58px;height:58px;display:flex;cursor:pointer;border:3px solid #fff!important;outline:5px solid #0048ff!important;text-decoration:none!important;background:#326cff!important;background:linear-gradient(96deg,#326cff 0,#0048ff 100%)!important}.asw-menu-btn svg{width:36px;height:36px;min-height:36px;min-width:36px;max-width:36px;max-height:36px;background:0 0!important}.asw-menu-btn:hover{transform:scale(1.05)}@media only screen and (max-width:768px){.asw-menu-btn{width:42px;height:42px}.asw-menu-btn svg{width:26px;height:26px;min-height:26px;min-width:26px;max-width:26px;max-height:26px}}</style> <div class="asw-widget"> <a href="http://amitcodee.netlify.app/" target="_blank" class="asw-menu-btn" title="Open Accessibility Menu" role="button" aria-expanded="false"> <svg xmlns="http://www.w3.org/2000/svg" style="fill:white" viewBox="0 0 24 24" width="30px" height="30px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg> </a> </div>';
  function N(t, e) {
    t.style.display =
      void 0 === e
        ? "none" === t.style.display
          ? "block"
          : "none"
        : 1 == e
        ? "block"
        : "none";
  }
  const G =
      '<style>.asw-menu{position:fixed;left:0;top:0;box-shadow:0 0 20px #00000080;opacity:1;transition:.3s;z-index:500000;overflow:hidden;background:#eff1f5;width:500px;line-height:1;font-size:16px;height:100%;letter-spacing:.015em}.asw-menu *{color:#000!important;font-family:inherit;padding:0;margin:0;line-height:1!important;letter-spacing:normal!important}.asw-menu-header{display:flex;align-items:center;justify-content:space-between;padding-left:18px;padding-right:18px;height:55px;font-weight:700!important;background-color:#0848ca!important}.asw-menu-title{font-size:16px!important;color:#fff!important}.asw-menu-header svg{fill:#0848ca!important;width:24px!important;height:24px!important;min-width:24px!important;min-height:24px!important;max-width:24px!important;max-height:24px!important}.asw-menu-header>div{display:flex}.asw-menu-header div[role=button]{padding:5px;background:#fff!important;cursor:pointer;border-radius:50%;transition:opacity .3s ease}.asw-menu-header div[role=button]:hover{opacity:.8}.asw-card{margin:0 15px 20px}.asw-card-title{font-size:14px!important;padding:15px 0;font-weight:600!important;opacity:.8}.asw-menu .asw-select{width:100%!important;padding:0 15px!important;font-size:16px!important;font-family:inherit!important;font-weight:600!important;border-radius:45px!important;background:#fff!important;border:none!important;min-height:45px!important;max-height:45px!important;height:45px!important;color:inherit!important}.asw-items{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.asw-btn{aspect-ratio:6/5;border-radius:12px;padding:0 15px;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;color:#333;font-size:16px!important;background:#fff!important;border:2px solid transparent!important;transition:border-color .2s ease;cursor:pointer;word-break:break-word;gap:10px;position:relative;width:auto!important;height:auto!important}.asw-adjust-font .asw-label div,.asw-btn .asw-translate{font-size:14px!important;font-weight:600!important}.asw-minus,.asw-plus{background-color:#eff1f5!important;border:2px solid transparent;transition:border .2s ease}.asw-minus:hover,.asw-plus:hover{border-color:#0848ca!important}.asw-amount{font-size:18px!important;font-weight:600!important}.asw-adjust-font svg{width:24px!important;height:24px!important;min-width:24px!important;min-height:24px!important;max-width:24px!important;max-height:24px!important}.asw-btn svg{width:34px!important;height:34px!important;min-width:34px!important;min-height:34px!important;max-width:34px!important;max-height:34px!important}.asw-btn.asw-selected,.asw-btn:hover{border-color:#0848ca!important}.asw-btn.asw-selected span,.asw-btn.asw-selected svg{fill:#0848ca!important;color:#0848ca!important}.asw-btn.asw-selected:after{content:"\\2713";position:absolute;top:10px;right:10px;background-color:#0848ca!important;color:#fff;padding:6px;font-size:10px;width:18px;height:18px;border-radius:100%;line-height:6px}.asw-footer{position:absolute;bottom:0;left:0;right:0;background:#fff;padding:20px;text-align:center;border-top:2px solid #eff1f5}.asw-footer a{font-size:16px!important;text-decoration:none!important;color:#000!important;background:0 0!important;font-weight:600!important}.asw-footer a:hover,.asw-footer a:hover span{color:#0848ca!important}.asw-menu-content{overflow:scroll;max-height:calc(100% - 80px);padding:30px 0 15px}.asw-adjust-font{background:#fff;padding:20px;margin-bottom:20px}.asw-adjust-font .asw-label{display:flex;justify-content:flex-start}.asw-adjust-font>div{display:flex;justify-content:space-between;margin-top:20px;align-items:center;font-size:15px}.asw-adjust-font .asw-label div{font-size:15px!important}.asw-adjust-font div[role=button]{background:#eff1f5!important;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer}.asw-overlay{position:fixed;top:0;left:0;width:100%;height:100%;z-index:10000}@media only screen and (max-width:560px){.asw-menu{width:100%}}@media only screen and (max-width:420px){.asw-items{grid-template-columns:repeat(2,minmax(0,1fr));gap:.5rem}}</style> <div class="asw-menu"> <div class="asw-menu-header"> <div class="asw-menu-title asw-translate"> Accessibility Menu </div> <div style="gap:15px"> <div role="button" class="asw-menu-reset" title="Reset settings"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M12 4c2.1 0 4.1.8 5.6 2.3 3.1 3.1 3.1 8.2 0 11.3a7.78 7.78 0 0 1-6.7 2.3l.5-2c1.7.2 3.5-.4 4.8-1.7a6.1 6.1 0 0 0 0-8.5A6.07 6.07 0 0 0 12 6v4.6l-5-5 5-5V4M6.3 17.6C3.7 15 3.3 11 5.1 7.9l1.5 1.5c-1.1 2.2-.7 5 1.2 6.8.5.5 1.1.9 1.8 1.2l-.6 2a8 8 0 0 1-2.7-1.8Z"/> </svg> </div> <div role="button" class="asw-menu-close" title="Close"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/> </svg> </div> </div> </div> <div class="asw-menu-content"> <div class="asw-card"> <select id="asw-language" title="Language" class="asw-select"></select> </div> <div class="asw-card"> <div class="asw-card-title"> Content Adjustments </div> <div class="asw-adjust-font"> <div class="asw-label" style="margin:0"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="margin-right:15px"> <path d="M2 4v3h5v12h3V7h5V4H2m19 5h-9v3h3v7h3v-7h3V9Z"/> </svg> <div class="asw-translate"> Adjust Font Size </div> </div> <div> <div class="asw-minus" data-key="font-size" role="button" aria-pressed="false" title="Decrease Font Size" tabindex="0"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M19 13H5v-2h14v2Z"/> </svg> </div> <div class="asw-amount"> 100% </div> <div class="asw-plus" data-key="font-size" role="button" aria-pressed="false" title="Increase Font Size" tabindex="0"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"/> </svg> </div> </div> </div> <div class="asw-items content"> </div> </div> <div class="asw-card"> <div class="asw-card-title"> Color Adjustments </div> <div class="asw-items contrast"> </div> </div> <div class="asw-card"> <div class="asw-card-title"> Hidden Content </div> <div class="asw-items hiddencontent"> </div> </div> <div class="asw-card"> <div class="asw-card-title"> Tools </div> <div class="asw-items tools"> </div> </div> </div> <div class="asw-footer"> <a href="" target="_blank">Web Accessibility By <span style="font-weight:700;color:inherit">Anthromorphe</span></a> </div> </div> <div class="asw-overlay"> </div>',
    E = [
      {
        label: "Monochrome",
        key: "monochrome",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="m19 19-7-8v8H5l7-8V5h7m0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"/>\r\n</svg>',
      },
      {
        label: "Low Saturation",
        key: "low-saturation",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M11 9h2v2h-2V9m-2 2h2v2H9v-2m4 0h2v2h-2v-2m2-2h2v2h-2V9M7 9h2v2H7V9m12-6H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2M9 18H7v-2h2v2m4 0h-2v-2h2v2m4 0h-2v-2h2v2m2-7h-2v2h2v2h-2v-2h-2v2h-2v-2h-2v2H9v-2H7v2H5v-2h2v-2H5V5h14v6Z"/>\r\n</svg>',
      },
      {
        label: "High Saturation",
        key: "high-saturation",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M12 16a4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4m6.7-3.6a6.06 6.06 0 0 0-.86-.4 5.98 5.98 0 0 0 3.86-5.59 6 6 0 0 0-6.78.54A5.99 5.99 0 0 0 12 .81a6 6 0 0 0-2.92 6.14A6 6 0 0 0 2.3 6.4 5.95 5.95 0 0 0 6.16 12a6 6 0 0 0-3.86 5.58 6 6 0 0 0 6.78-.54A6 6 0 0 0 12 23.19a6 6 0 0 0 2.92-6.14 6 6 0 0 0 6.78.54 5.98 5.98 0 0 0-3-5.19Z"/>\r\n</svg>',
      },
      {
        label: "High Contrast",
        key: "high-contrast",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 17.93a8 8 0 0 1 0-15.86v15.86zm2-15.86a8 8 0 0 1 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87a8 8 0 0 1-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93a8.4 8.4 0 0 1-.19 1z"/>\r\n</svg>',
      },
      {
        label: "Light Contrast",
        key: "light-contrast",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M12 18a6 6 0 0 1-6-6 6 6 0 0 1 6-6 6 6 0 0 1 6 6 6 6 0 0 1-6 6m8-2.69L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69Z"/>\r\n</svg>',
      },
      {
        label: "Dark Contrast",
        key: "dark-contrast",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M18 12c0-4.5-1.92-8.74-6-10a10 10 0 0 0 0 20c4.08-1.26 6-5.5 6-10Z"/>\r\n</svg>',
      },
    ],
    J = [
      {
        label: "Font Weight",
        key: "font-weight",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M13.5 15.5H10v-3h3.5A1.5 1.5 0 0 1 15 14a1.5 1.5 0 0 1-1.5 1.5m-3.5-9h3A1.5 1.5 0 0 1 14.5 8 1.5 1.5 0 0 1 13 9.5h-3m5.6 1.29c.97-.68 1.65-1.79 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.1 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42Z"/>\r\n</svg>',
      },
      {
        label: "Line Height",
        key: "line-height",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M21 22H3v-2h18v2m0-18H3V2h18v2m-11 9.7h4l-2-5.4-2 5.4M11.2 6h1.7l4.7 12h-2l-.9-2.6H9.4L8.5 18h-2l4.7-12Z"/>\r\n</svg>',
      },
      {
        label: "Letter Spacing",
        key: "letter-spacing",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M22 3v18h-2V3h2M4 3v18H2V3h2m6 10.7h4l-2-5.4-2 5.4M11.2 6h1.7l4.7 12h-2l-.9-2.6H9.4L8.5 18h-2l4.7-12Z"/>\r\n</svg>',
      },
      {
        label: "Dyslexia Font",
        key: "readable-font",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="m21.59 11.59-8.09 8.09L9.83 16l-1.41 1.41 5.08 5.09L23 13M6.43 11 8.5 5.5l2.07 5.5m1.88 5h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3Z"/>\r\n</svg>',
      },
      {
        label: "Highlight Links",
        key: "highlight-links",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 16H5V5h14v14m-5.06-8.94a3.37 3.37 0 0 1 0 4.75L11.73 17A3.29 3.29 0 0 1 7 17a3.31 3.31 0 0 1 0-4.74l1.35-1.36-.01.6c-.01.5.07 1 .23 1.44l.05.15-.4.41a1.6 1.6 0 0 0 0 2.28c.61.62 1.67.62 2.28 0l2.2-2.19c.3-.31.48-.72.48-1.15 0-.44-.18-.83-.48-1.14a.87.87 0 0 1 0-1.24.91.91 0 0 1 1.24 0m4.06-.7c0 .9-.35 1.74-1 2.38l-1.34 1.36v-.6c.01-.5-.07-1-.23-1.44l-.05-.14.4-.42a1.6 1.6 0 0 0 0-2.28 1.64 1.64 0 0 0-2.28 0l-2.2 2.2c-.3.3-.48.71-.48 1.14 0 .44.18.83.48 1.14.17.16.26.38.26.62s-.09.46-.26.62a.86.86 0 0 1-.62.25.88.88 0 0 1-.62-.25 3.36 3.36 0 0 1 0-4.75L12.27 7A3.31 3.31 0 0 1 17 7c.65.62 1 1.46 1 2.36Z"/>\r\n</svg>',
      },
      {
        label: "Highlight Title",
        key: "highlight-title",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M5 4v3h5.5v12h3V7H19V4H5Z"/>\r\n</svg>',
      },
    ],
    HiddenContent = [
      {
        label: "Hide Images",
        key: "hide-images",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H3V5h18v14zm-10.5-6L8 16h8l-2.5-3.5L12 14.5z"/><path d="M3 3l18 18" stroke="currentColor" stroke-width="2"/>\r\n</svg>',
      },
      {
        label: "Hide Videos",
        key: "hide-videos",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M8 5.14V19l11-7M2 3.27L20.73 22 19.46 23.27 17 20.78V21H3V3h.73L1.46 1.73z"/>\r\n</svg>',
      },
      {
        label: "Hide Icons",
        key: "hide-icons",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/>\r\n</svg>',
      },
    ],
    Z = [
      {
        label: "Big Cursor",
        key: "big-cursor",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M11 1.07C7.05 1.56 4 4.92 4 9h7m-7 6a8 8 0 0 0 8 8 8 8 0 0 0 8-8v-4H4m9-9.93V9h7a8 8 0 0 0-7-7.93Z"/>\r\n</svg>',
      },
      {
        label: "Stop Animations",
        key: "stop-animations",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M22 12c0-5.54-4.46-10-10-10-1.17 0-2.3.19-3.38.56l.7 1.94A7.15 7.15 0 0 1 12 3.97 8.06 8.06 0 0 1 20.03 12 8.06 8.06 0 0 1 12 20.03 8.06 8.06 0 0 1 3.97 12c0-.94.19-1.88.53-2.72l-1.94-.66A10.37 10.37 0 0 0 2 12c0 5.54 4.46 10 10 10s10-4.46 10-10M5.47 3.97c.85 0 1.53.71 1.53 1.5C7 6.32 6.32 7 5.47 7c-.79 0-1.5-.68-1.5-1.53 0-.79.71-1.5 1.5-1.5M18 12c0-3.33-2.67-6-6-6s-6 2.67-6 6 2.67 6 6 6 6-2.67 6-6m-7-3v6H9V9m6 0v6h-2V9"/>\r\n</svg>',
      },
      {
        label: "Reading Guide",
        key: "readable-guide",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M12 8a3 3 0 0 0 3-3 3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3m0 3.54A13.15 13.15 0 0 0 3 8v11c3.5 0 6.64 1.35 9 3.54A13.15 13.15 0 0 1 21 19V8c-3.5 0-6.64 1.35-9 3.54Z"/>\r\n</svg>',
      },
      {
        label: "Read on Click",
        key: "read-on-click",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M9 12l1.5 1.5L15 9m-3-7c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2m0 18c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8z"/>\r\n</svg>',
      },      {
        label: "Focus Outline",
        key: "focus-outline",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>\r\n</svg>',
      },
      {
        label: "Page Structure",
        key: "page-structure",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>\r\n</svg>',
      },
    ];
  function W(t, e) {
    for (var i = "", n = t.length; n--; ) {
      var a = t[n];
      i += '<button class="asw-btn '
        .concat(e || "", '" type="button" data-key="')
        .concat(a.key, '" title="')
        .concat(a.label, '">')
        .concat(a.icon, '<span class="asw-translate">')
        .concat(a.label, "</span></button>");
    }
    return i;
  }
  var K = {
      en: {
        "Accessibility Menu": "Accessibility Menu",
        "Reset settings": "Reset settings",
        Close: "Close",
        "Content Adjustments": "Content Adjustments",
        "Adjust Font Size": "Adjust Font Size",
        "Highlight Title": "Highlight Title",
        "Highlight Links": "Highlight Links",
        "Readable Font": "Readable Font",
        "Color Adjustments": "Color Adjustments",
        "Dark Contrast": "Dark Contrast",
        "Light Contrast": "Light Contrast",
        "High Contrast": "High Contrast",
        "High Saturation": "High Saturation",
        "Low Saturation": "Low Saturation",
        Monochrome: "Monochrome",
        "Hidden Content": "Hidden Content",
        Tools: "Tools",
        "Reading Guide": "Reading Guide",
        "Stop Animations": "Stop Animations",
        "Big Cursor": "Big Cursor",
        "Increase Font Size": "Increase Font Size",
        "Decrease Font Size": "Decrease Font Size",
        "Letter Spacing": "Letter Spacing",
        "Line Height": "Line Height",
        "Font Weight": "Font Weight",        "Dyslexia Font": "Dyslexia Font",
        Language: "Language",
        "Open Accessibility Menu": "Open Accessibility Menu",
        "Page Structure": "Page Structure",
      },

      ar: JSON.parse(
        '{ "Accessibility Menu": "قائمة إمكانية الوصول", "Reset settings": "إعادة تعيين الإعدادات", "Close": "إغلاق", "Content Adjustments": "تعديلات المحتوى", "Adjust Font Size": "تعديل حجم الخط", "Highlight Title": "تسليط الضوء على العنوان", "Highlight Links": "تسليط الضوء على الروابط", "Readable Font": "خط سهل القراءة", "Color Adjustments": "تعديلات الألوان", "Dark Contrast": "تباين داكن", "Light Contrast": "تباين فاتح", "High Contrast": "تباين عالي", "High Saturation": "تشبع عالي", "Low Saturation": "تشبع منخفض", "Monochrome": "أحادي اللون", "Hidden Content": "المحتوى المخفي", "Tools": "أدوات", "Reading Guide": "دليل القراءة", "Stop Animations": "إيقاف الرسوم المتحركة", "Big Cursor": "مؤشر كبير", "Increase Font Size": "زيادة حجم الخط", "Decrease Font Size": "تقليل حجم الخط", "Letter Spacing": "تباعد الحروف", "Line Height": "ارتفاع السطر", "Font Weight": "سماكة الخط", "Dyslexia Font": "خط خاص بعسر القراءة", "Language": "اللغة", "Open Accessibility Menu": "افتح قائمة الوصول", "Page Structure": "بنية الصفحة" }'
      ),

      zh_Hans: JSON.parse(
        '{ "Accessibility Menu": "辅助功能菜单", "Reset settings": "重置设置", "Close": "关闭", "Content Adjustments": "内容调整", "Adjust Font Size": "调整字体大小", "Highlight Title": "突出显示标题", "Highlight Links": "突出显示链接", "Readable Font": "易读字体", "Color Adjustments": "颜色调整", "Dark Contrast": "深色对比", "Light Contrast": "浅色对比", "High Contrast": "高对比度", "High Saturation": "高饱和度", "Low Saturation": "低饱和度", "Monochrome": "单色", "Hidden Content": "隐藏内容", "Tools": "工具", "Reading Guide": "阅读指南", "Stop Animations": "停止动画", "Big Cursor": "大光标", "Increase Font Size": "增加字体大小", "Decrease Font Size": "减少字体大小", "Letter Spacing": "字距", "Line Height": "行高", "Font Weight": "字体粗细", "Dyslexia Font": "阅读障碍字体", "Language": "语言", "Open Accessibility Menu": "打开辅助功能菜单", "Page Structure": "页面结构" }'
      ),

      es: JSON.parse(
        '{ "Accessibility Menu": "Menú de accesibilidad", "Reset settings": "Restablecer configuración", "Close": "Cerrar", "Content Adjustments": "Ajustes de contenido", "Adjust Font Size": "Ajustar tamaño de fuente", "Highlight Title": "Resaltar título", "Highlight Links": "Resaltar enlaces", "Readable Font": "Fuente legible", "Color Adjustments": "Ajustes de color", "Dark Contrast": "Contraste oscuro", "Light Contrast": "Contraste claro", "High Contrast": "Alto contraste", "High Saturation": "Alta saturación", "Low Saturation": "Baja saturación", "Monochrome": "Monocromo", "Hidden Content": "Contenido oculto", "Tools": "Herramientas", "Reading Guide": "Guía de lectura", "Stop Animations": "Detener animaciones", "Big Cursor": "Cursor grande", "Increase Font Size": "Aumentar tamaño de fuente", "Decrease Font Size": "Disminuir tamaño de fuente", "Letter Spacing": "Espaciado de letras", "Line Height": "Altura de línea", "Font Weight": "Peso de fuente", "Dyslexia Font": "Fuente para dislexia", "Language": "Idioma", "Open Accessibility Menu": "Abrir menú de accesibilidad", "Page Structure": "Estructura de página" }'
      ),

      hi: JSON.parse(
        '{ "Accessibility Menu": "पहुँच मेनू", "Reset settings": "सेटिंग रीसेट करें", "Close": "बंद करें", "Content Adjustments": "सामग्री समायोजन", "Adjust Font Size": "फ़ॉन्ट आकार समायोजित करें", "Highlight Title": "शीर्षक को हाइलाइट करें", "Highlight Links": "लिंक्स को हाइलाइट करें", "Readable Font": "पठनीय फ़ॉन्ट", "Color Adjustments": "रंग समायोजन", "Dark Contrast": "गहरा कंट्रास्ट", "Light Contrast": "हल्का कंट्रास्ट", "High Contrast": "उच्च कंट्रास्ट", "High Saturation": "उच्च संतृप्ति", "Low Saturation": "कम संतृप्ति", "Monochrome": "एकल रंग", "Hidden Content": "छिपी सामग्री", "Tools": "उपकरण", "Reading Guide": "पठन मार्गदर्शिका", "Stop Animations": "एनिमेशन बंद करें", "Big Cursor": "बड़ा कर्सर", "Increase Font Size": "फ़ॉन्ट आकार बढ़ाएँ", "Decrease Font Size": "फ़ॉन्ट आकार घटाएँ", "Letter Spacing": "अक्षर स्पेसिंग", "Line Height": "पंक्ति ऊँचाई", "Font Weight": "फ़ॉन्ट मोटाई", "Dyslexia Font": "डिस्लेक्सिया फ़ॉन्ट", "Language": "भाषा", "Open Accessibility Menu": "पहुँच मेनू खोलें", "Page Structure": "पेज संरचना" }'
      ),      fr: JSON.parse(
        '{ "Accessibility Menu":"Menu d\'accessibilité","Reset settings":"Réinitialiser les paramètres","Close":"Fermer","Content Adjustments":"Ajustements du contenu","Adjust Font Size":"Ajuster la taille de la police","Highlight Title":"Surligner le titre","Highlight Links":"Surligner les liens","Readable Font":"Police lisible","Color Adjustments":"Ajustements des couleurs","Dark Contrast":"Contraste sombre","Light Contrast":"Contraste clair","High Contrast":"Contraste élevé","High Saturation":"Saturation élevée","Low Saturation":"Saturation faible","Monochrome":"Monochrome","Hidden Content":"Contenu masqué","Tools":"Outils","Reading Guide":"Guide de lecture","Stop Animations":"Arrêter les animations","Big Cursor":"Grand curseur","Increase Font Size":"Augmenter la taille de la police","Decrease Font Size":"Réduire la taille de la police","Letter Spacing":"Espacement des lettres","Line Height":"Hauteur de ligne","Font Weight":"Épaisseur de la police","Dyslexia Font":"Police dyslexie","Language":"Langue","Open Accessibility Menu":"Ouvrir le menu d\'accessibilité","Page Structure":"Structure de page" }'
      ),      ru: JSON.parse(
        '{ "Accessibility Menu":"Меню доступности","Reset settings":"Сбросить настройки","Close":"Закрыть","Content Adjustments":"Настройки контента","Adjust Font Size":"Изменить размер шрифта","Highlight Title":"Выделить заголовок","Highlight Links":"Выделить ссылки","Readable Font":"Читаемый шрифт","Color Adjustments":"Настройки цвета","Dark Contrast":"Темный контраст","Light Contrast":"Светлый контраст","High Contrast":"Высокий контраст","High Saturation":"Высокая насыщенность","Low Saturation":"Низкая насыщенность","Monochrome":"Монохром","Hidden Content":"Скрытое содержание","Tools":"Инструменты","Reading Guide":"Руководство по чтению","Stop Animations":"Остановить анимации","Big Cursor":"Большой курсор","Increase Font Size":"Увеличить шрифт","Decrease Font Size":"Уменьшить шрифт","Letter Spacing":"Межбуквенный интервал","Line Height":"Высота строки","Font Weight":"Толщина шрифта","Dyslexia Font":"Шрифт для дислексии","Language":"Язык","Open Accessibility Menu":"Открыть меню доступности","Page Structure":"Структура страницы" }'
      ),      pt: JSON.parse(
        '{ "Accessibility Menu":"Menu de acessibilidade","Reset settings":"Redefinir configurações","Close":"Fechar","Content Adjustments":"Ajustes de conteúdo","Adjust Font Size":"Ajustar tamanho da fonte","Highlight Title":"Destacar título","Highlight Links":"Destacar links","Readable Font":"Fonte legível","Color Adjustments":"Ajustes de cores","Dark Contrast":"Contraste escuro","Light Contrast":"Contraste claro","High Contrast":"Alto contraste","High Saturation":"Alta saturação","Low Saturation":"Baixa saturação","Monochrome":"Monocromático","Hidden Content":"Conteúdo oculto","Tools":"Ferramentas","Reading Guide":"Guia de leitura","Stop Animations":"Parar animações","Big Cursor":"Cursor grande","Increase Font Size":"Aumentar fonte","Decrease Font Size":"Diminuir fonte","Letter Spacing":"Espaçamento entre letras","Line Height":"Altura da linha","Font Weight":"Peso da fonte","Dyslexia Font":"Fonte para dislexia","Language":"Idioma","Open Accessibility Menu":"Abrir menu de acessibilidade","Page Structure":"Estrutura da página" }'
      ),

      de: JSON.parse(
        '{ "Accessibility Menu":"Barrierefreiheitsmenü","Reset settings":"Einstellungen zurücksetzen","Close":"Schließen","Content Adjustments":"Inhaltsanpassungen","Adjust Font Size":"Schriftgröße anpassen","Highlight Title":"Titel hervorheben","Highlight Links":"Links hervorheben","Readable Font":"Lesbare Schriftart","Color Adjustments":"Farbänderungen","Dark Contrast":"Dunkler Kontrast","Light Contrast":"Heller Kontrast","High Contrast":"Hoher Kontrast","High Saturation":"Hohe Sättigung","Low Saturation":"Niedrige Sättigung","Monochrome":"Monochrom","Hidden Content":"Versteckter Inhalt","Tools":"Werkzeuge","Reading Guide":"Leseführung","Stop Animations":"Animationen stoppen","Big Cursor":"Großer Cursor","Increase Font Size":"Schriftgröße erhöhen","Decrease Font Size":"Schriftgröße verringern","Letter Spacing":"Buchstabenabstand","Line Height":"Zeilenhöhe","Font Weight":"Schriftgewicht","Dyslexia Font":"Dyslexie-Schriftart","Language":"Sprache","Open Accessibility Menu":"Barrierefreiheitsmenü öffnen","Page Structure":"Seitenstruktur" }'
      ),      ja: JSON.parse(
        '{ "Accessibility Menu":"アクセシビリティメニュー","Reset settings":"設定をリセット","Close":"閉じる","Content Adjustments":"コンテンツの調整","Adjust Font Size":"フォントサイズを調整","Highlight Title":"タイトルを強調","Highlight Links":"リンクを強調","Readable Font":"読みやすいフォント","Color Adjustments":"色調整","Dark Contrast":"ダークコントラスト","Light Contrast":"ライトコントラスト","High Contrast":"高コントラスト","High Saturation":"高彩度","Low Saturation":"低彩度","Monochrome":"モノクロ","Hidden Content":"隠しコンテンツ","Tools":"ツール","Reading Guide":"リーディングガイド","Stop Animations":"アニメーションを停止","Big Cursor":"大きなカーソル","Increase Font Size":"フォントサイズを大きく","Decrease Font Size":"フォントサイズを小さく","Letter Spacing":"文字間隔","Line Height":"行の高さ","Font Weight":"フォントの太さ","Dyslexia Font":"ディスレクシアフォント","Language":"言語","Open Accessibility Menu":"アクセシビリティメニューを開く","Page Structure":"ページ構造" }'
      ),

      ko: JSON.parse(
        '{ "Accessibility Menu":"접근성 메뉴","Reset settings":"설정 재설정","Close":"닫기","Content Adjustments":"콘텐츠 조정","Adjust Font Size":"글꼴 크기 조정","Highlight Title":"제목 강조","Highlight Links":"링크 강조","Readable Font":"읽기 쉬운 글꼴","Color Adjustments":"색상 조정","Dark Contrast":"어두운 대비","Light Contrast":"밝은 대비","High Contrast":"높은 대비","High Saturation":"높은 채도","Low Saturation":"낮은 채도","Monochrome":"단색","Hidden Content":"숨겨진 콘텐츠","Tools":"도구","Reading Guide":"읽기 가이드","Stop Animations":"애니메이션 중지","Big Cursor":"큰 커서","Increase Font Size":"글꼴 크기 증가","Decrease Font Size":"글꼴 크기 감소","Letter Spacing":"문자 간격","Line Height":"줄 간격","Font Weight":"글꼴 두께","Dyslexia Font":"난독증 글꼴","Language":"언어","Open Accessibility Menu":"접근성 메뉴 열기","Page Structure":"페이지 구조" }'
      ),      bn: JSON.parse(
        '{ "Accessibility Menu":"অ্যাক্সেসিবিলিটি মেনু","Reset settings":"সেটিংস রিসেট করুন","Close":"বন্ধ করুন","Content Adjustments":"বিষয়বস্তুর সমন্বয়","Adjust Font Size":"ফন্টের আকার সামঞ্জস্য করুন","Highlight Title":"শিরোনাম হাইলাইট করুন","Highlight Links":"লিংক হাইলাইট করুন","Readable Font":"পঠিতযোগ্য ফন্ট","Color Adjustments":"রঙের সমন্বয়","Dark Contrast":"গা dark ় কনট্রাস্ট","Light Contrast":"হালকা কনট্রাস্ট","High Contrast":"উচ্চ কনট্রাস্ট","High Saturation":"উচ্চ সম্পৃক্তি","Low Saturation":"নিম্ন সম্পৃক্তি","Monochrome":"এক রঙা","Hidden Content":"গোপন বিষয়বস্তু","Tools":"টুলস","Reading Guide":"পাঠ গাইড","Stop Animations":"অ্যানিমেশন বন্ধ করুন","Big Cursor":"বড় কার্সর","Increase Font Size":"ফন্টের আকার বাড়ান","Decrease Font Size":"ফন্টের আকার কমান","Letter Spacing":"অক্ষরের ব্যবধান","Line Height":"লাইন উচ্চতা","Font Weight":"ফন্ট ওজন","Dyslexia Font":"ডিসলেক্সিয়া ফন্ট","Language":"ভাষা","Open Accessibility Menu":"অ্যাক্সেসিবিলিটি মেনু খুলুন","Page Structure":"পৃষ্ঠার কাঠামো" }'
      ),

      ta: JSON.parse(
        '{ "Accessibility Menu":"அணுகல் பட்டி","Reset settings":"அமைப்புகளை மீட்டமை","Close":"மூடு","Content Adjustments":"உள்ளடக்கம் சரிசெய்தல்","Adjust Font Size":"எழுத்துரு அளவை மாற்று","Highlight Title":"தலைப்பை எடுத்துக்காட்டு","Highlight Links":"இணைப்புகளை எடுத்துக்காட்டு","Readable Font":"வாசிக்கத்தக்க எழுத்துரு","Color Adjustments":"நிறம் மாற்றங்கள்","Dark Contrast":"இருண்ட வேறுபாடு","Light Contrast":"ஒளி வேறுபாடு","High Contrast":"அதிக வேறுபாடு","High Saturation":"அதிக நிறம்","Low Saturation":"குறைவான நிறம்","Monochrome":"ஒற்றை நிறம்","Hidden Content":"மறைந்த உள்ளடக்கம்","Tools":"கருவிகள்","Reading Guide":"வாசிப்பு வழிகாட்டி","Stop Animations":"அசைவுகளை நிறுத்து","Big Cursor":"பெரிய காட்டி","Increase Font Size":"எழுத்தளவை அதிகரிக்க","Decrease Font Size":"எழுத்தளவை குறைக்க","Letter Spacing":"எழுத்து இடைவெளி","Line Height":"வரி உயரம்","Font Weight":"எழுத்துரு தடிமன்","Dyslexia Font":"டிஸ்லெக்சியா எழுத்துரு","Language":"மொழி","Open Accessibility Menu":"அணுகல் பட்டியைத் திற","Page Structure":"பக்க அமைப்பு" }'
      ),

      tr: JSON.parse(
        '{ "Accessibility Menu":"Erişilebilirlik Menüsü","Reset settings":"Ayarları sıfırla","Close":"Kapat","Content Adjustments":"İçerik Ayarları","Adjust Font Size":"Yazı tipi boyutunu ayarla","Highlight Title":"Başlığı vurgula","Highlight Links":"Bağlantıları vurgula","Readable Font":"Okunaklı Yazı Tipi","Color Adjustments":"Renk Ayarları","Dark Contrast":"Koyu Kontrast","Light Contrast":"Açık Kontrast","High Contrast":"Yüksek Kontrast","High Saturation":"Yüksek Doygunluk","Low Saturation":"Düşük Doygunluk","Monochrome":"Tek Renk","Hidden Content":"Gizli İçerik","Tools":"Araçlar","Reading Guide":"Okuma Kılavuzu","Stop Animations":"Animasyonları Durdur","Big Cursor":"Büyük İmleç","Increase Font Size":"Yazı Tipini Büyüt","Decrease Font Size":"Yazı Tipini Küçült","Letter Spacing":"Harf Aralığı","Line Height":"Satır Yüksekliği","Font Weight":"Yazı Kalınlığı","Dyslexia Font":"Disleksi Yazı Tipi","Language":"Dil","Open Accessibility Menu":"Erişilebilirlik Menüsünü Aç","Page Structure":"Sayfa Yapısı" }'
      ),

      vi: JSON.parse(
        '{ "Accessibility Menu":"Menu trợ năng","Reset settings":"Đặt lại cài đặt","Close":"Đóng","Content Adjustments":"Điều chỉnh nội dung","Adjust Font Size":"Điều chỉnh cỡ chữ","Highlight Title":"Làm nổi bật tiêu đề","Highlight Links":"Làm nổi bật liên kết","Readable Font":"Phông chữ dễ đọc","Color Adjustments":"Điều chỉnh màu sắc","Dark Contrast":"Tương phản tối","Light Contrast":"Tương phản sáng","High Contrast":"Tương phản cao","High Saturation":"Độ bão hòa cao","Low Saturation":"Độ bão hòa thấp","Monochrome":"Đơn sắc","Hidden Content":"Nội dung ẩn","Tools":"Công cụ","Reading Guide":"Hướng dẫn đọc","Stop Animations":"Dừng hoạt ảnh","Big Cursor":"Con trỏ lớn","Increase Font Size":"Tăng cỡ chữ","Decrease Font Size":"Giảm cỡ chữ","Letter Spacing":"Khoảng cách chữ","Line Height":"Chiều cao dòng","Font Weight":"Độ đậm phông chữ","Dyslexia Font":"Phông chữ cho chứng khó đọc","Language":"Ngôn ngữ","Open Accessibility Menu":"Mở menu trợ năng","Page Structure":"Cấu trúc trang" }'
      ),
    },
    _ = [
      { code: "en", label: "English (English)" },
      { code: "zh_Hans", label: "简体中文 (Simplified Chinese)" },
      { code: "es", label: "Español (Spanish)" },
      { code: "ar", label: "العربية (Arabic)" },
      { code: "hi", label: "हिन्दी (Hindi)" },
      { code: "fr", label: "Français (French)" },
      { code: "ru", label: "Русский (Russian)" },
      { code: "pt", label: "Português (Portuguese)" },
      { code: "de", label: "Deutsch (German)" },
      { code: "ja", label: "日本語 (Japanese)" },
      { code: "ko", label: "한국어 (Korean)" },
      { code: "bn", label: "বাংলা (Bengali)" },
      { code: "ta", label: "தமிழ் (Tamil)" },
      { code: "tr", label: "Türkçe (Turkish)" },
      { code: "vi", label: "Tiếng Việt (Vietnamese)" },
    ];

  function q(t, e) {
    var i = t.getAttribute("data-translate");
    return (
      !i && e && ((i = e), t.setAttribute("data-translate", i)),
      (function (t) {
        var e = s().lang;
        return (K[e] || K.en)[t] || t;
      })(i)
    );
  }
  function Y(t) {
    t.querySelectorAll(".asw-card-title, .asw-translate").forEach(function (t) {
      t.innerText = q(t, String(t.innerText || "").trim());
    }),
      t.querySelectorAll("[title]").forEach(function (t) {
        t.setAttribute("title", q(t, t.getAttribute("title")));
      });
  }
  var U = function (t, e) {
    var i = {};
    for (var n in t)
      Object.prototype.hasOwnProperty.call(t, n) &&
        e.indexOf(n) < 0 &&
        (i[n] = t[n]);
    if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
      var a = 0;
      for (n = Object.getOwnPropertySymbols(t); a < n.length; a++)
        e.indexOf(n[a]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(t, n[a]) &&
          (i[n[a]] = t[n[a]]);
    }
    return i;
  };
  function Q(t) {
    var e,
      i,
      l,
      c,
      g = t.container,
      u = t.position,
      d = U(t, ["container", "position"]),
      h = document.createElement("div");
    h.innerHTML = G;
    var p = h.querySelector(".asw-menu");
    (null == u ? void 0 : u.includes("right")) &&
      ((p.style.right = "0px"), (p.style.left = "auto")),
      (p.querySelector(".content").innerHTML = W(J)),
      (p.querySelector(".tools").innerHTML = W(Z, "asw-tools")),
      (p.querySelector(".contrast").innerHTML = W(E, "asw-filter")),
      (p.querySelector(".hiddencontent").innerHTML = W(HiddenContent)),
      h.querySelectorAll(".asw-menu-close, .asw-overlay").forEach(function (t) {
        t.addEventListener("click", function () {
          N(h, !1);
        });
      }),
      p
        .querySelectorAll(".asw-adjust-font div[role='button']")
        .forEach(function (t) {
          t.addEventListener("click", function () {
            var e,
              i = null !== (e = o("fontSize")) && void 0 !== e ? e : 1;
            t.classList.contains("asw-minus") ? (i -= 0.1) : (i += 0.1),
              (i = Math.max(i, 0.1)),
              (i = Math.min(i, 2)),
              r((i = Number(i.toFixed(2))) || 1),
              n({ fontSize: i });
          });
        }),      p.querySelectorAll(".asw-btn").forEach(function (t) {
        t.addEventListener("click", function () {
          var e,
            i = t.dataset.key,
            a = !t.classList.contains("asw-selected");            if (i === "page-structure") {
            // Handle page structure modal with enhanced tabbed interface
            if (document.getElementById('page-structure-modal')) {
              document.getElementById('page-structure-modal').remove();
              t.classList.remove("asw-selected");
              return;
            }
            
            var modal = document.createElement('div');
            modal.id = 'page-structure-modal';
            modal.style.cssText = 'position:fixed;top:0;right:0;width:30%;height:100%;background:#fff;border-left:2px solid #ccc;overflow:hidden;z-index:500001;box-shadow:-5px 0 15px rgba(0,0,0,0.2);font-family:inherit;display:flex;flex-direction:column;';
            
            var header = document.createElement('div');
            header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:20px;border-bottom:2px solid #eff1f5;flex-shrink:0;';
            header.innerHTML = '<h2 style="margin:0;color:#0848ca;font-size:18px;">Page Structure</h2><button id="close-page-structure" style="background:#0848ca;color:white;border:none;padding:8px 12px;border-radius:5px;cursor:pointer;">Close</button>';
            modal.appendChild(header);
            
            // Tab navigation
            var tabNav = document.createElement('div');
            tabNav.style.cssText = 'display:flex;background:#f8f9fa;border-bottom:1px solid #dee2e6;flex-shrink:0;';
            tabNav.innerHTML = '<button class="ps-tab-btn active" data-tab="headings" style="flex:1;padding:12px;border:none;background:transparent;cursor:pointer;font-weight:600;color:#0848ca;border-bottom:2px solid #0848ca;">📋 Headings</button>' +
                               '<button class="ps-tab-btn" data-tab="landmarks" style="flex:1;padding:12px;border:none;background:transparent;cursor:pointer;font-weight:600;color:#6c757d;border-bottom:2px solid transparent;">🏛️ Landmarks</button>' +
                               '<button class="ps-tab-btn" data-tab="links" style="flex:1;padding:12px;border:none;background:transparent;cursor:pointer;font-weight:600;color:#6c757d;border-bottom:2px solid transparent;">🔗 Links</button>';
            modal.appendChild(tabNav);
            
            var content = document.createElement('div');
            content.id = 'page-structure-content';
            content.style.cssText = 'flex:1;overflow-y:auto;padding:20px;';
            modal.appendChild(content);
            
            // Helper function to create clickable items that scroll to elements
            function createClickableItem(element, text, icon, description) {
              var item = document.createElement('div');
              item.style.cssText = 'padding:12px;margin:8px 0;background:#f8f9fa;border-radius:8px;cursor:pointer;transition:all 0.2s;border-left:4px solid #0848ca;position:relative;';
              
              var mainContent = '<div style="display:flex;align-items:flex-start;gap:10px;">';
              mainContent += '<span style="color:#0848ca;font-size:16px;flex-shrink:0;">' + icon + '</span>';
              mainContent += '<div style="flex:1;min-width:0;">';
              mainContent += '<div style="font-weight:600;color:#212529;margin-bottom:4px;word-break:break-word;">' + text + '</div>';
              if (description) {
                mainContent += '<div style="font-size:12px;color:#6c757d;word-break:break-word;">' + description + '</div>';
              }
              mainContent += '</div></div>';
              
              item.innerHTML = mainContent;
              
              item.addEventListener('click', function() {
                element.scrollIntoView({behavior: 'smooth', block: 'center'});
                element.style.outline = '3px solid #0848ca';
                element.style.outlineOffset = '2px';
                setTimeout(function() {
                  element.style.outline = '';
                  element.style.outlineOffset = '';
                }, 3000);
              });
              
              item.addEventListener('mouseenter', function() {
                this.style.background = '#e9ecef';
                this.style.transform = 'translateX(4px)';
              });
              
              item.addEventListener('mouseleave', function() {
                this.style.background = '#f8f9fa';
                this.style.transform = 'translateX(0)';
              });
              
              return item;
            }
            
            function showTab(tabName) {
              // Update tab buttons
              var tabBtns = modal.querySelectorAll('.ps-tab-btn');
              tabBtns.forEach(function(btn) {
                if (btn.dataset.tab === tabName) {
                  btn.style.color = '#0848ca';
                  btn.style.borderBottomColor = '#0848ca';
                  btn.classList.add('active');
                } else {
                  btn.style.color = '#6c757d';
                  btn.style.borderBottomColor = 'transparent';
                  btn.classList.remove('active');
                }
              });
              
              // Clear content
              content.innerHTML = '';
              
              if (tabName === 'headings') {
                var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
                if (headings.length > 0) {
                  headings.forEach(function(heading) {
                    var level = heading.tagName.toLowerCase();
                    var text = heading.textContent.trim() || 'Empty heading';
                    var shortText = text.length > 50 ? text.substring(0, 50) + '...' : text;
                    var item = createClickableItem(heading, level.toUpperCase() + ': ' + shortText, '📝', text.length > 50 ? text : null);
                    content.appendChild(item);
                  });
                } else {
                  content.innerHTML = '<div style="text-align:center;color:#6c757d;margin-top:40px;"><p>No headings found on this page</p></div>';
                }
              } else if (tabName === 'landmarks') {
                // Comprehensive landmark detection - includes all sections, divs, and ARIA landmarks
                var landmarkSelectors = [
                  'main', 'nav', 'header', 'footer', 'aside', 'section', 'article', 'form', 'div',
                  '[role="banner"]', '[role="navigation"]', '[role="main"]', '[role="contentinfo"]', 
                  '[role="complementary"]', '[role="region"]', '[role="search"]', '[role="form"]', 
                  '[role="application"]', '[role="document"]'
                ];
                
                var allElements = document.querySelectorAll(landmarkSelectors.join(', '));
                var landmarkItems = [];
                
                allElements.forEach(function(element) {
                  // Skip script, style, and hidden elements
                  if (element.tagName.toLowerCase() === 'script' || 
                      element.tagName.toLowerCase() === 'style' ||
                      element.style.display === 'none' || 
                      element.hidden) {
                    return;
                  }
                  
                  var role = element.getAttribute('role') || element.tagName.toLowerCase();
                  var label = element.getAttribute('aria-label') || element.getAttribute('aria-labelledby') || element.getAttribute('title') || element.id || '';
                  
                  var displayName = role.charAt(0).toUpperCase() + role.slice(1);
                  var description = '';
                  
                  // Enhanced descriptions based on element type
                  if (role === 'main' || element.tagName.toLowerCase() === 'main') {
                    displayName = 'Main Content';
                    description = 'Primary content area of the page';
                  } else if (role === 'navigation' || element.tagName.toLowerCase() === 'nav') {
                    displayName = 'Navigation';
                    description = label || 'Navigation menu or links';
                  } else if (role === 'banner' || element.tagName.toLowerCase() === 'header') {
                    displayName = 'Header/Banner';
                    description = label || 'Page header or banner area';
                  } else if (role === 'contentinfo' || element.tagName.toLowerCase() === 'footer') {
                    displayName = 'Footer';
                    description = label || 'Page footer information';
                  } else if (element.tagName.toLowerCase() === 'aside') {
                    displayName = 'Aside/Sidebar';
                    description = label || 'Supplementary content';
                  } else if (element.tagName.toLowerCase() === 'section') {
                    displayName = 'Section';
                    description = label || 'Thematic grouping of content';
                    // Try to get some content preview for sections
                    var textContent = element.textContent.trim();
                    if (textContent.length > 0) {
                      description += ' - ' + textContent.substring(0, 50) + (textContent.length > 50 ? '...' : '');
                    }
                  } else if (element.tagName.toLowerCase() === 'article') {
                    displayName = 'Article';
                    description = label || 'Standalone piece of content';
                  } else if (element.tagName.toLowerCase() === 'form' || role === 'form') {
                    displayName = 'Form';
                    description = label || 'Interactive form element';
                  } else if (element.tagName.toLowerCase() === 'div') {
                    // Only include divs with semantic meaning
                    if (role && role !== 'div') {
                      displayName = 'Div (' + role + ')';
                      description = label || 'Container with ' + role + ' role';
                    } else if (label) {
                      displayName = 'Div';
                      description = label;
                    } else {
                      // Skip unlabeled divs without roles
                      return;
                    }
                  }
                  
                  if (label && !description.includes(label)) {
                    if (displayName.includes(':')) {
                      displayName = displayName.split(':')[0] + ': ' + label;
                    } else {
                      displayName += ': ' + label;
                    }
                  }
                  
                  landmarkItems.push({
                    element: element,
                    name: displayName,
                    description: description,
                    tagName: element.tagName.toLowerCase()
                  });
                });
                
                if (landmarkItems.length > 0) {
                  // Sort landmarks by document order
                  landmarkItems.sort(function(a, b) {
                    return a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
                  });
                  
                  landmarkItems.forEach(function(landmarkItem) {
                    var icon = '🏛️';
                    if (landmarkItem.tagName === 'nav') icon = '🧭';
                    else if (landmarkItem.tagName === 'header') icon = '📰';
                    else if (landmarkItem.tagName === 'footer') icon = '📄';
                    else if (landmarkItem.tagName === 'main') icon = '📋';
                    else if (landmarkItem.tagName === 'aside') icon = '📌';
                    else if (landmarkItem.tagName === 'section') icon = '📦';
                    else if (landmarkItem.tagName === 'article') icon = '📝';
                    else if (landmarkItem.tagName === 'form') icon = '📝';
                    else if (landmarkItem.tagName === 'div') icon = '📋';
                    
                    var item = createClickableItem(landmarkItem.element, landmarkItem.name, icon, landmarkItem.description);
                    content.appendChild(item);
                  });
                } else {
                  content.innerHTML = '<div style="text-align:center;color:#6c757d;margin-top:40px;"><p>No landmarks found on this page</p></div>';
                }
              } else if (tabName === 'links') {
                var links = document.querySelectorAll('a[href]');
                if (links.length > 0) {
                  links.forEach(function(link) {
                    var text = link.textContent.trim() || link.getAttribute('aria-label') || link.getAttribute('title') || link.href;
                    var shortText = text.length > 40 ? text.substring(0, 40) + '...' : text;
                    var isExternal = link.hostname && link.hostname !== window.location.hostname;
                    var icon = isExternal ? '🔗' : '🔗';
                    var description = isExternal ? 'External link: ' + link.href : 'Internal link: ' + link.href;
                    
                    if (link.getAttribute('aria-label')) {
                      description = 'Aria-label: ' + link.getAttribute('aria-label') + ' | ' + description;
                    }
                    
                    var item = createClickableItem(link, shortText, icon, description);
                    content.appendChild(item);
                  });
                } else {
                  content.innerHTML = '<div style="text-align:center;color:#6c757d;margin-top:40px;"><p>No links found on this page</p></div>';
                }
              }
            }
            
            // Tab click handlers
            tabNav.addEventListener('click', function(e) {
              if (e.target.classList.contains('ps-tab-btn')) {
                showTab(e.target.dataset.tab);
              }
            });
            
            document.body.appendChild(modal);
            t.classList.add("asw-selected");
            
            // Show default tab
            showTab('headings');
            
            // Close button handler
            document.getElementById('close-page-structure').addEventListener('click', function() {
              modal.remove();
              t.classList.remove("asw-selected");
            });
            
            return;
          }
            t.classList.contains("asw-filter")
            ? (p.querySelectorAll(".asw-filter").forEach(function (t) {
                t.classList.remove("asw-selected");
              }),
              n({ contrast: a ? i : null }),
              a && t.classList.add("asw-selected"),
              w())
            : (function() {                // Handle 3-level toggle for letter-spacing and line-height
                if (i === "letter-spacing" || i === "line-height") {
                  var currentLevel = o(i) || 0;
                  var nextLevel = (currentLevel + 1) % 4; // 0, 1, 2, 3, then back to 0
                  
                  // Update button appearance based on level
                  t.classList.remove("asw-selected", "asw-level-1", "asw-level-2", "asw-level-3");
                  
                  // Remove existing level indicators
                  var existingIndicator = t.querySelector('.level-indicator');
                  var existingDashes = t.querySelector('.level-dashes');
                  if (existingIndicator) existingIndicator.remove();
                  if (existingDashes) existingDashes.remove();
                  
                  if (nextLevel > 0) {
                    t.classList.add("asw-selected", "asw-level-" + nextLevel);
                    
                    // Create 3-dash indicator inside the button
                    var dashContainer = document.createElement('div');
                    dashContainer.className = 'level-dashes';
                    dashContainer.style.cssText = 'position:absolute;bottom:8px;left:50%;transform:translateX(-50%);display:flex;gap:3px;align-items:center;justify-content:center;';
                    
                    // Create 3 dashes
                    for (var dashIndex = 1; dashIndex <= 3; dashIndex++) {
                      var dash = document.createElement('div');
                      dash.style.cssText = 'width:8px;height:2px;border-radius:1px;transition:background-color 0.3s ease;';
                      
                      // Color the dash based on current level
                      if (dashIndex <= nextLevel) {
                        // Active dash - blue color
                        dash.style.backgroundColor = '#0848ca';
                      } else {
                        // Inactive dash - light gray
                        dash.style.backgroundColor = '#dee2e6';
                      }
                      
                      dashContainer.appendChild(dash);
                    }
                    
                    t.appendChild(dashContainer);
                  }
                  
                  n((((e = {})[i] = nextLevel), e));
                  P();
                } else {
                  // Regular toggle for other features
                  t.classList.toggle("asw-selected", a);
                  n((((e = {})[i] = a), e));
                  P();
                }
              })();
        });
      }),
      null === (e = p.querySelector(".asw-menu-reset")) ||
        void 0 === e ||
        e.addEventListener("click", function () {
          !(function () {
            var t;
            a({ states: {} }),
              V(),
              null ===
                (t =
                  null === document || void 0 === document
                    ? void 0
                    : document.querySelectorAll(".asw-selected")) ||
                void 0 === t ||
                t.forEach(function (t) {
                  var e;
                  return null === (e = null == t ? void 0 : t.classList) ||
                    void 0 === e
                    ? void 0
                    : e.remove("asw-selected");
                });
          })();
        });
    var m = s(),
      v =
        Number(
          null === (i = null == m ? void 0 : m.states) || void 0 === i
            ? void 0
            : i.fontSize
        ) || 1;
    1 != v &&
      (p.querySelector(".asw-amount").innerHTML = "".concat(100 * v, "%"));
    var b = p.querySelector("#asw-language");
    if (
      ((b.innerHTML = _.map(function (t) {
        return '<option value="'
          .concat(t.code, '">')
          .concat(t.label, "</option>");
      }).join("")),
      m.lang !== d.lang && a({ lang: d.lang }),
      (b.value = (null == d ? void 0 : d.lang) || "en"),
      null == b ||
        b.addEventListener("change", function () {
          a({ lang: b.value }), Y(g);
        }),
      Y(p),
      m.states)
    )
      for (var S in m.states)        if (m.states[S] && "fontSize" !== S) {
          var y = "contrast" === S ? m.states[S] : S;
          var buttonElement = p.querySelector('.asw-btn[data-key="'.concat(y, '"]'));
          if (buttonElement) {
            // Handle multi-level states for letter-spacing and line-height
            if ((S === "letter-spacing" || S === "line-height") && typeof m.states[S] === "number") {
              var level = m.states[S];
              if (level > 0) {
                buttonElement.classList.add("asw-selected", "asw-level-" + level);
                
                // Create 3-dash indicator inside the button
                var dashContainer = document.createElement('div');
                dashContainer.className = 'level-dashes';
                dashContainer.style.cssText = 'position:absolute;bottom:8px;left:50%;transform:translateX(-50%);display:flex;gap:3px;align-items:center;justify-content:center;';
                
                // Create 3 dashes
                for (var dashIndex = 1; dashIndex <= 3; dashIndex++) {
                  var dash = document.createElement('div');
                  dash.style.cssText = 'width:8px;height:2px;border-radius:1px;transition:background-color 0.3s ease;';
                  
                  // Color the dash based on current level
                  if (dashIndex <= level) {
                    // Active dash - blue color
                    dash.style.backgroundColor = '#0848ca';
                  } else {
                    // Inactive dash - light gray
                    dash.style.backgroundColor = '#dee2e6';
                  }
                  
                  dashContainer.appendChild(dash);
                }
                
                buttonElement.appendChild(dashContainer);
              }
            } else {
              // Regular boolean state
              buttonElement.classList.add("asw-selected");
            }
          }
        }
    return g.appendChild(h), h;
  }
  var X = function () {
    return (
      (X =
        Object.assign ||
        function (t) {
          for (var e, i = 1, n = arguments.length; i < n; i++)
            for (var a in (e = arguments[i]))
              Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
          return t;
        }),
      X.apply(this, arguments)
    );
  };
  var $ = function () {
      return (
        ($ =
          Object.assign ||
          function (t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
              for (var a in (e = arguments[i]))
                Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t;
          }),
        $.apply(this, arguments)
      );
    },
    tt = { lang: "en", position: "bottom-left" };
  function et(t) {
    var e = $({}, tt);
    try {
      var i = s(!1);
      (e = $($({}, e), i)), V();
    } catch (t) {}
    a((e = $($({}, e), t))),
      (function (t) {
        var e,
          i,
          n,
          a,
          o,
          s,
          r = t.position,
          l = void 0 === r ? "bottom-left" : r,
          c = t.offset,
          g = void 0 === c ? [20, 20] : c,
          u = document.createElement("div");
        (u.innerHTML = I), u.classList.add("asw-container");
        var d,
          h = u.querySelector(".asw-menu-btn"),
          p = null !== (e = null == g ? void 0 : g[0]) && void 0 !== e ? e : 20,
          m = null !== (i = null == g ? void 0 : g[1]) && void 0 !== i ? i : 25,
          v = { left: "".concat(p, "px"), bottom: "".concat(m, "px") };
        "bottom-right" === l
          ? (v = X(X({}, v), { right: "".concat(p, "px"), left: "auto" }))
          : "top-left" === l
          ? (v = X(X({}, v), { top: "".concat(m, "px"), bottom: "auto" }))
          : "center-left" === l
          ? (v = X(X({}, v), {
              bottom: "calc(50% - (55px / 2) - ".concat(
                null !== (n = null == g ? void 0 : g[1]) && void 0 !== n
                  ? n
                  : 0,
                "px)"
              ),
            }))
          : "top-right" === l
          ? (v = {
              top: "".concat(m, "px"),
              bottom: "auto",
              right: "".concat(p, "px"),
              left: "auto",
            })
          : "center-right" === l
          ? (v = {
              right: "".concat(p, "px"),
              left: "auto",
              bottom: "calc(50% - (55px / 2) - ".concat(
                null !== (a = null == g ? void 0 : g[1]) && void 0 !== a
                  ? a
                  : 0,
                "px)"
              ),
            })
          : "bottom-center" === l
          ? (v = X(X({}, v), {
              left: "calc(50% - (55px / 2) - ".concat(
                null !== (o = null == g ? void 0 : g[0]) && void 0 !== o
                  ? o
                  : 0,
                "px)"
              ),
            }))
          : "top-center" === l &&
            (v = {
              top: "".concat(m, "px"),
              bottom: "auto",
              left: "calc(50% - (55px / 2) - ".concat(
                null !== (s = null == g ? void 0 : g[0]) && void 0 !== s
                  ? s
                  : 0,
                "px)"
              ),
            }),
          Object.assign(h.style, v),
          null == h ||
            h.addEventListener("click", function (e) {
              e.preventDefault(),
                e.stopPropagation(),
                e.stopImmediatePropagation(),
                d ? N(d) : (d = Q(X(X({}, t), { container: u })));
            }),
          Y(u),
          document.body.appendChild(u);
      })(e);
  }
  function it(t) {
    var e;
    return (
      (t = "data-asw-".concat(t)),
      null ===
        (e =
          null === document || void 0 === document
            ? void 0
            : document.querySelector("[".concat(t, "]"))) || void 0 === e
        ? void 0
        : e.getAttribute(t)
    );
  }
  document.addEventListener("readystatechange", function t() {
    var e, i, n, a, o;
    ("complete" !== document.readyState &&
      "interactive" !== document.readyState) ||
      ((n = it("lang")),
      (a = it("position")),
      (o = it("offset")),
      n ||
        (n =
          null ===
            (i =
              null ===
                (e =
                  null === document || void 0 === document
                    ? void 0
                    : document.querySelector("html")) || void 0 === e
                ? void 0
                : e.getAttribute("lang")) || void 0 === i
            ? void 0
            : i.replace(/[_-].*/, "")),
      !n &&
        "undefined" != typeof navigator &&
        (null === navigator || void 0 === navigator
          ? void 0
          : navigator.language) &&
        (n =
          null === navigator || void 0 === navigator
            ? void 0
            : navigator.language),
      o &&
        (o = o.split(",").map(function (t) {
          return parseInt(t);
        })),
      et({ lang: n, position: a, offset: o }),
      document.removeEventListener("readystatechange", t));
  });
})();
