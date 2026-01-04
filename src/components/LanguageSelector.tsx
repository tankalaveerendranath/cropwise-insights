import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { languages } from '@/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// Google Translate language code mapping
const googleTranslateLangMap: { [key: string]: string } = {
  en: 'en', hi: 'hi', es: 'es', fr: 'fr', zh: 'zh-CN',
  ar: 'ar', pt: 'pt', de: 'de', ja: 'ja', ru: 'ru',
  ko: 'ko', it: 'it', th: 'th', vi: 'vi', nl: 'nl',
  tr: 'tr', pl: 'pl', id: 'id', ms: 'ms', uk: 'uk', sv: 'sv',
};

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (options: {
          pageLanguage: string;
          includedLanguages?: string;
          autoDisplay?: boolean;
        }, elementId: string) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [googleTranslateLoaded, setGoogleTranslateLoaded] = useState(false);

  // Load Google Translate script
  useEffect(() => {
    if (document.getElementById('google-translate-script')) {
      setGoogleTranslateLoaded(true);
      return;
    }

    // Create hidden container for Google Translate
    const translateContainer = document.createElement('div');
    translateContainer.id = 'google_translate_element';
    translateContainer.style.display = 'none';
    document.body.appendChild(translateContainer);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            autoDisplay: false,
          },
          'google_translate_element'
        );
        setGoogleTranslateLoaded(true);
      }
    };

    // Load Google Translate script
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup is optional as we want to keep it loaded
    };
  }, []);

  const triggerGoogleTranslate = useCallback((langCode: string) => {
    const googleLangCode = googleTranslateLangMap[langCode] || langCode;
    
    // Try to find and trigger Google Translate
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = googleLangCode;
      selectElement.dispatchEvent(new Event('change'));
    } else {
      // Fallback: Set cookie for Google Translate
      document.cookie = `googtrans=/en/${googleLangCode}; path=/`;
      document.cookie = `googtrans=/en/${googleLangCode}; path=/; domain=${window.location.hostname}`;
      
      // Reload to apply translation
      if (langCode !== 'en') {
        window.location.reload();
      }
    }
  }, []);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    
    // Trigger Google Translate for full page translation
    if (code === 'en') {
      // Reset to original language
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      const frame = document.querySelector('.goog-te-banner-frame') as HTMLIFrameElement;
      if (frame) {
        const innerDoc = frame.contentDocument || frame.contentWindow?.document;
        const restoreButton = innerDoc?.querySelector('.goog-te-button button') as HTMLButtonElement;
        restoreButton?.click();
      }
    } else {
      triggerGoogleTranslate(code);
    }
    
    setIsOpen(false);
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{currentLang.flag} {currentLang.name}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`cursor-pointer ${i18n.language === lang.code ? 'bg-accent' : ''}`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Hidden Google Translate status indicator */}
      {!googleTranslateLoaded && (
        <div className="hidden" aria-hidden="true">Loading translator...</div>
      )}
    </>
  );
};

export default LanguageSelector;
