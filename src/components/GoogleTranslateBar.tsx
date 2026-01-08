import { useEffect, useState } from 'react';

interface GoogleTranslateElement {
  new (
    options: {
      pageLanguage: string;
      includedLanguages: string;
      layout: number;
      autoDisplay: boolean;
    },
    elementId: string
  ): void;
  InlineLayout: {
    SIMPLE: number;
  };
}

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: GoogleTranslateElement;
      };
    };
    googleTranslateElementInit?: () => void;
    triggerGoogleTranslate?: (langCode: string) => void;
  }
}

const GoogleTranslateBar = () => {
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const STORAGE_KEY = 'googleTranslateLang';

    // Remove banner frame that blocks content
    const removeBanner = () => {
      const banner = document.querySelector('.goog-te-banner-frame.skiptranslate');
      if (banner) {
        banner.remove();
      }
      // Reset body top offset that Google Translate adds
      document.body.style.top = '0px';
      document.body.style.position = 'static';
    };

    const applyLangToCombo = (langCode: string) => {
      const googleTranslateCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (!googleTranslateCombo) return false;

      googleTranslateCombo.value = langCode;
      googleTranslateCombo.dispatchEvent(new Event('change'));
      return true;
    };

    // Global function to trigger translation from LanguageSelector / route changes
    window.triggerGoogleTranslate = (langCode: string) => {
      try {
        localStorage.setItem(STORAGE_KEY, langCode);
      } catch {
        // ignore
      }

      applyLangToCombo(langCode);
    };

    // Initialize Google Translate Widget
    const initTranslate = () => {
      if (window.google?.translate?.TranslateElement) {
        const container = document.getElementById('google_translate_element');
        if (container) {
          container.innerHTML = '';

          try {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages:
                  'en,hi,te,es,fr,zh-CN,ar,pt,de,ja,ru,ko,it,th,vi,nl,tr,pl,id,ms,uk,sv',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
              },
              'google_translate_element'
            );

            // Remove banner after initialization
            setTimeout(removeBanner, 100);

            // Apply last selected language (important for first load + SPA routes)
            let desiredLang: string | null = null;
            try {
              desiredLang = localStorage.getItem(STORAGE_KEY);
            } catch {
              desiredLang = null;
            }

            if (desiredLang) {
              // Give the widget a moment to inject the combo
              setTimeout(() => {
                window.triggerGoogleTranslate?.(desiredLang!);
              }, 250);
            }
          } catch (error) {
            console.error('Error initializing Google Translate:', error);
          }
        }
      } else if (retryCount < 5) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
        }, 500);
      }
    };

    // Set up callback for Google Translate
    window.googleTranslateElementInit = initTranslate;

    // Load the script if not already loaded
    const loadScript = () => {
      const existingScript = document.getElementById('google-translate-script');
      
      if (existingScript) {
        if (window.google?.translate) {
          initTranslate();
        }
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.defer = true;
      
      document.head.appendChild(script);
    };

    if (document.readyState === 'complete') {
      loadScript();
    } else {
      window.addEventListener('load', loadScript);
    }

    // Set up mutation observer to remove banner if it appears
    const observer = new MutationObserver(removeBanner);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('load', loadScript);
    };
  }, [retryCount]);

  // Hidden container - Google Translate widget is loaded but not visible
  return (
    <div 
      id="google_translate_element" 
      className="fixed -top-[9999px] -left-[9999px] opacity-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default GoogleTranslateBar;
