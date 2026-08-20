/**
 * Blue Pear Tree — React splash screen
 * Slow progress (~3s) + hold (~3.5s) + fade-out (~1.2s)
 */
(function () {
  if (!window.React || !window.ReactDOM) {
    console.warn("React not loaded; skipping splash.");
    document.body.classList.add("is-ready");
    hydrateLazyImages();
    return;
  }

  var e = React.createElement;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useRef = React.useRef;

  var PROGRESS_MS = 3000;
  var HOLD_MS = 3500;
  var EXIT_MS = 1200;
  var LOGO_SRC = "assets/logo-splash.webp?v=20260819b";
  var LOGO_FALLBACK = "assets/logo-splash.jpg?v=20260819b";

  function hydrateLazyImages() {
    document.querySelectorAll("img[data-src]").forEach(function (img) {
      img.src = img.getAttribute("data-src");
      img.removeAttribute("data-src");
    });
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function SplashScreen() {
    var _pct = useState(0);
    var pct = _pct[0];
    var setPct = _pct[1];
    var _exiting = useState(false);
    var exiting = _exiting[0];
    var setExiting = _exiting[1];
    var _done = useState(false);
    var done = _done[0];
    var setDone = _done[1];
    var rafRef = useRef(null);

    useEffect(function () {
      var reduce =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      function complete() {
        setPct(100);
        setExiting(true);
        document.body.classList.add("is-ready");
        hydrateLazyImages();
        window.setTimeout(function () {
          setDone(true);
        }, EXIT_MS);
      }

      if (reduce) {
        complete();
        return;
      }

      var t0 = performance.now();
      function tick(now) {
        var p = Math.min(1, (now - t0) / PROGRESS_MS);
        setPct(Math.round(easeOutCubic(p) * 100));
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
      var holdId = window.setTimeout(complete, HOLD_MS);

      return function () {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        window.clearTimeout(holdId);
      };
    }, []);

    if (done) return null;

    return e(
      "div",
      {
        id: "page-loader",
        className: exiting ? "is-exiting" : "",
        role: "status",
        "aria-live": "polite",
        "aria-label": "Loading Blue Pear Tree",
      },
      e(
        "picture",
        null,
        e("source", { srcSet: LOGO_SRC, type: "image/webp" }),
        e("img", {
          className: "splash-logo",
          src: LOGO_FALLBACK,
          alt: "Blue Pear Tree",
          width: 340,
          height: 129,
          fetchPriority: "high",
          decoding: "async",
        })
      ),
      e(
        "div",
        {
          className: "splash-progress",
          role: "progressbar",
          "aria-valuemin": 0,
          "aria-valuemax": 100,
          "aria-valuenow": pct,
        },
        e("span", { style: { width: pct + "%" } })
      ),
      e("div", { className: "splash-pct" }, pct + "%")
    );
  }

  var rootEl = document.getElementById("splash-root");
  if (!rootEl) {
    document.body.classList.add("is-ready");
    hydrateLazyImages();
    return;
  }

  var root = ReactDOM.createRoot(rootEl);
  root.render(e(SplashScreen));
})();
