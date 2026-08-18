/* Blue Pear Tree — edit this file to update logos site-wide. */
window.BPT_BRAND = {
  version: "20260818z",
  icon: "assets/logo-icon.png",
  mark: "assets/logo-mark.png",
  splash: "assets/logo-splash.webp",
  share: "assets/logo-splash.jpg"
};
window.applyBluePearBrand = function () {
  var B = window.BPT_BRAND;
  if (!B) return;
  function url(key) { return B[key] + "?v=" + B.version; }
  document.querySelectorAll("[data-brand]").forEach(function (el) {
    var key = el.getAttribute("data-brand");
    if (!B[key]) return;
    var rel = url(key);
    if (el.tagName === "IMG") el.src = rel;
    else if (el.tagName === "LINK" && el.hasAttribute("href")) el.href = rel;
  });
};
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", window.applyBluePearBrand);
} else {
  window.applyBluePearBrand();
}
