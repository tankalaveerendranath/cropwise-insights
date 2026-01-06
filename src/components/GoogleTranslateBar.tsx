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
  }
}

const GoogleTranslateBar = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Clean up any existing Google Translate elements first
    const existingFrame = document.querySelector('.goog-te-banner-frame');
    if (existingFrame) existingFrame.remove();
    
    // Define the callback function that Google Translate will call
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        // Clear existing widget content
        const container = document.getElementById('google_translate_element');
        if (container) container.innerHTML = '';
        
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,te,es,fr,zh-CN,ar,pt,de,ja,ru,ko,it,th,vi,nl,tr,pl,id,ms,uk,sv',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
        setIsLoaded(true);
      }
    };

    // Load Google Translate script
    const loadScript = () => {
      // Remove existing script if any
      const existingScript = document.getElementById('google-translate-script');
      if (existingScript) existingScript.remove();
      
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onerror = () => {
        console.error('Failed to load Google Translate');
        setIsLoaded(false);
      };
      document.body.appendChild(script);
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadScript, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-card/95 backdrop-blur-sm border-b border-border shadow-sm translate-bar">
      <div className="container mx-auto px-4 py-1.5 flex items-center justify-center min-h-[36px]">
        <div id="google_translate_element" className="translate-widget" />
        {!isLoaded && (
          <span className="text-xs text-muted-foreground">Loading translator...</span>
        )}
      </div>
    </div>
  );
};

export default GoogleTranslateBar;
