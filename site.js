(function () {
  var d = document.documentElement;
  var order = ["light", "dark", "system"];

  function save(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  }

  document.querySelector(".theme-toggle").addEventListener("click", function () {
    var mode = order[(order.indexOf(d.dataset.mode) + 1) % order.length];
    d.dataset.mode = mode;
    if (mode === "system") delete d.dataset.theme;
    else d.dataset.theme = mode;
    save("theme", mode);
  });

  // Development-only font picker (site.config.json "fontPicker").
  var selects = document.querySelectorAll(".font-picker select");
  selects.forEach(function (select) {
    var name = select.dataset.var;
    select.value = getComputedStyle(d).getPropertyValue(name).trim();
    select.addEventListener("change", function () {
      d.style.setProperty(name, select.value);
      var fonts = {};
      selects.forEach(function (s) {
        fonts[s.dataset.var] = s.value;
      });
      save("fonts", JSON.stringify(fonts));
    });
  });
})();
