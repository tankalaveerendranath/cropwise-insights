import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "googleTranslateLang";

const toGoogleLang = (code: string) => {
  const langMap: Record<string, string> = {
    zh: "zh-CN",
    en: "en",
    hi: "hi",
    te: "te",
    es: "es",
    fr: "fr",
    ar: "ar",
    pt: "pt",
    de: "de",
    ja: "ja",
    ru: "ru",
    ko: "ko",
    it: "it",
    th: "th",
    vi: "vi",
    nl: "nl",
    tr: "tr",
    pl: "pl",
    id: "id",
    ms: "ms",
    uk: "uk",
    sv: "sv",
  };

  return langMap[code] || code;
};

/**
 * Ensures Google Translate re-applies after SPA route changes.
 * Also persists the last selected translation language so it can be applied
 * once the Google widget finishes initializing.
 */
const useGoogleTranslateSync = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const googleLang = toGoogleLang(i18n.language);

    try {
      localStorage.setItem(STORAGE_KEY, googleLang);
    } catch {
      // ignore
    }

    // Give React time to render the new route before re-triggering translation
    const t = window.setTimeout(() => {
      window.triggerGoogleTranslate?.(googleLang);
    }, 150);

    return () => window.clearTimeout(t);
  }, [i18n.language, location.pathname]);
};

export default useGoogleTranslateSync;
