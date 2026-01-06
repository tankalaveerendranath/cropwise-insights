import { useEffect } from 'react';

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
  }
}

const GoogleTranslateBar = () => {
  useEffect(() => {
    // Define the callback function that Google Translate will call
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,te,es,fr,zh-CN,ar,pt,de,ja,ru,ko,it,th,vi,nl,tr,pl,id,ms,uk,sv',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    // Check if script is already loaded
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate) {
      // Script already loaded, reinitialize
      window.googleTranslateElementInit();
    }

    return () => {
      // Cleanup is optional since we want it to persist
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-1.5 flex items-center justify-center min-h-[36px]">
        <div id="google_translate_element" className="translate-widget notranslate" />
      </div>
    </div>
  );
};

export default GoogleTranslateBar;
