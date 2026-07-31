import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const SCRIPT_ID = "recaptcha-v2-api";

const Recaptcha = forwardRef(function Recaptcha({ onVerify, onExpire }, ref) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [error, setError] = useState("");
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current !== null && typeof window.grecaptcha?.reset === "function") window.grecaptcha.reset(widgetIdRef.current);
    },
  }));

  useEffect(() => {
    if (!sitekey) { setError("reCAPTCHA is not configured."); return undefined; }
    let cancelled = false;
    let retryTimer;
    const render = () => {
      if (cancelled || widgetIdRef.current !== null) return;
      if (!window.grecaptcha || typeof window.grecaptcha.render !== "function") {
        retryTimer = window.setTimeout(render, 50);
        return;
      }
      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey,
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": () => setError("reCAPTCHA could not load. Please try again."),
      });
    };
    const existingScript = document.getElementById(SCRIPT_ID);
    if (window.grecaptcha && typeof window.grecaptcha.render === "function") render();
    else if (existingScript) existingScript.addEventListener("load", render);
    else {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", render);
      script.addEventListener("error", () => setError("reCAPTCHA could not load. Please try again."));
      document.head.appendChild(script);
    }
    return () => { cancelled = true; window.clearTimeout(retryTimer); if (existingScript) existingScript.removeEventListener("load", render); };
  }, [sitekey, onVerify, onExpire]);

  return <div><div ref={containerRef} />{error && <p className="mt-2 text-sm text-red-600">{error}</p>}</div>;
});

export default Recaptcha;
