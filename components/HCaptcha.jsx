import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const SCRIPT_ID = "hcaptcha-api";

const HCaptcha = forwardRef(function HCaptcha({ onVerify, onExpire }, ref) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [error, setError] = useState("");
  const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current !== null && window.hcaptcha) window.hcaptcha.reset(widgetIdRef.current);
    },
  }));

  useEffect(() => {
    if (!sitekey) {
      setError("hCaptcha is not configured.");
      return undefined;
    }

    let cancelled = false;
    const render = () => {
      if (cancelled || !window.hcaptcha || widgetIdRef.current !== null) return;
      widgetIdRef.current = window.hcaptcha.render(containerRef.current, {
        sitekey,
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": () => setError("hCaptcha could not load. Please try again."),
      });
    };

    const existingScript = document.getElementById(SCRIPT_ID);
    if (window.hcaptcha) {
      render();
    } else if (existingScript) {
      existingScript.addEventListener("load", render);
    } else {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://js.hcaptcha.com/1/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", render);
      script.addEventListener("error", () => setError("hCaptcha could not load. Please try again."));
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (existingScript) existingScript.removeEventListener("load", render);
    };
  }, [sitekey, onVerify, onExpire]);

  return <div><div ref={containerRef} />{error && <p className="mt-2 text-sm text-red-600">{error}</p>}</div>;
});

export default HCaptcha;
