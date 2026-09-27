// Inlined in <head> so the saved theme and fonts apply before first paint.
(function () {
  var d = document.documentElement;
  try {
    var mode = localStorage.getItem("theme") || "system";
    d.dataset.mode = mode;
    if (mode !== "system") d.dataset.theme = mode;
    var fonts = JSON.parse(localStorage.getItem("fonts") || "{}");
    for (var k in fonts) d.style.setProperty(k, fonts[k]);
  } catch (e) {
    d.dataset.mode = "system";
  }
})();
