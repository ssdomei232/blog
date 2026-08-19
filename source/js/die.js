(function () {
  "use strict";
  var style = document.createElement("style");
  style.innerHTML = `
    .memorial-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.75); z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
    }
    .memorial-overlay.active { opacity: 1; pointer-events: auto; }
    .memorial-card {
      background: #222; color: #ddd; max-width: 500px; width: 90%;
      padding: 40px; border-radius: 4px; text-align: center;
      border: 1px solid #333; transform: translateY(20px); transition: transform 0.4s ease;
    }
    .memorial-overlay.active .memorial-card { transform: translateY(0); }
    .memorial-icon { font-size: 32px; margin-bottom: 15px; opacity: 0.6; }
    .memorial-title { font-size: 22px; margin-bottom: 20px; color: #fff; letter-spacing: 2px; }
    .memorial-content { font-size: 16px; line-height: 1.8; color: #bbb; margin-bottom: 30px; font-style: italic; white-space: pre-line;}
    .memorial-btn {
      background: transparent; border: 1px solid #555; color: #ccc;
      padding: 10px 30px; font-size: 14px; cursor: pointer;
      transition: all 0.3s ease; border-radius: 2px;
    }
    .memorial-btn:hover { background: #333; border-color: #888; color: #fff; }
  `;
  document.head.appendChild(style);

  var overlay = document.createElement("div");
  overlay.className = "memorial-overlay";
  overlay.innerHTML = `
    <div class="memorial-card">
      <div class="memorial-title"></div>
      <div class="memorial-content"></div>
      <button class="memorial-btn">关闭</button>
    </div>
  `;
  document.body.appendChild(overlay);

  var titleEl = overlay.querySelector(".memorial-title");
  var contentEl = overlay.querySelector(".memorial-content");
  var btnEl = overlay.querySelector(".memorial-btn");

  function closePopup() {
    overlay.classList.remove("active");
  }

  function showPopup(options) {
    if (!options) return;
    titleEl.textContent = options.title || "再见";
    contentEl.textContent = options.content || "";
    overlay.classList.add("active");
  }

  btnEl.addEventListener("click", closePopup);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closePopup();
  });
  window.MemorialPopup = {
    show: showPopup,
    close: closePopup,
  };
  var config = {
    grayscale: 1,
    opacity: 1,
    target: "html",
    autoEnable: true,
  };

  var cssText =
    "filter: grayscale(" + config.grayscale + "); " +
    "opacity: " + config.opacity + "; " +
    "-webkit-filter: grayscale(" + config.grayscale + "); " +
    "-moz-filter: grayscale(" + config.grayscale + "); " +
    "-ms-filter: grayscale(" + config.grayscale + "); " +
    "-o-filter: grayscale(" + config.grayscale + ");";

  var isApplied = false;

  function enableGrayscale() {
    if (isApplied) return;
    var el = document.querySelector(config.target);
    if (el) {
      el.style.cssText += ";" + cssText;
      isApplied = true;
      console.log("die on");
      setTimeout(function () {
        if (window.MemorialPopup) {
          window.MemorialPopup.show({
            title: "再见",
            content: "当你看到这个弹窗时，我大概已经死了。\n生命是如此虚假，苦痛又是如此的真实。\n我不想再继续了，让我死在妄想破碎之前吧。\n",
          });
        }
      }, 1000);
    } else {
      console.warn("die not found: " + config.target);
    }
  }

  function disableGrayscale() {
    if (!isApplied) return;
    var el = document.querySelector(config.target);
    if (el) {
      el.style.filter = "";
      el.style.webkitFilter = "";
      el.style.opacity = "";
      isApplied = false;
      console.log("die off");
    }
  }
  if (config.autoEnable) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", enableGrayscale);
    } else {
      enableGrayscale();
    }
  }
  window.MemorialMode = {
    enable: enableGrayscale,
    disable: disableGrayscale,
    config: config,
  };
})();