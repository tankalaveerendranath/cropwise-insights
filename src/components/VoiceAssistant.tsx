import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mic, MicOff, X, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';
import { supabase } from '@/integrations/supabase/client';

// Extend Window interface for SpeechRecognition
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => ISpeechRecognition;
    webkitSpeechRecognition?: new () => ISpeechRecognition;
  }
}

const VoiceAssistant = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { speak, isSpeaking } = useTextToSpeech();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<ISpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      const recognitionInstance = new SpeechRecognitionClass();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      
      // Map language codes to speech recognition language codes
      const langMap: { [key: string]: string } = {
        en: 'en-US',
        hi: 'hi-IN',
        es: 'es-ES',
        fr: 'fr-FR',
        zh: 'zh-CN',
        ar: 'ar-SA',
        pt: 'pt-BR',
        de: 'de-DE',
        ja: 'ja-JP',
        ru: 'ru-RU',
        ko: 'ko-KR',
        it: 'it-IT',
        th: 'th-TH',
        vi: 'vi-VN',
        nl: 'nl-NL',
        tr: 'tr-TR',
        pl: 'pl-PL',
        id: 'id-ID',
        ms: 'ms-MY',
        uk: 'uk-UA',
        sv: 'sv-SE',
      };
      
      recognitionInstance.lang = langMap[i18n.language] || 'en-US';
      setRecognition(recognitionInstance);
    }
  }, [i18n.language]);

  const searchAndAddToCart = async (productName: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${productName}%`)
        .eq('is_active', true)
        .limit(1)
        .single();

      if (error || !data) {
        const message = t('voice.productNotFound', { product: productName });
        toast({ title: t('voice.error'), description: message, variant: 'destructive' });
        speak(message);
        return;
      }

      const product = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        price: Number(data.price),
        image: data.image_url || '',
        category: data.category,
        stock: data.stock,
        unit: data.unit,
      };

      addToCart(product);
      const message = t('voice.addedToCart', { product: data.name });
      toast({ title: t('voice.success'), description: message });
      speak(message);
    } catch (err) {
      console.error('Error searching product:', err);
    }
  };

  const searchProducts = async (query: string) => {
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    const message = t('voice.searchingFor', { query });
    toast({ title: t('voice.command'), description: message });
    speak(message);
  };

  const processCommand = useCallback(async (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Navigation commands
    const navigationCommands: { [key: string]: string } = {
      'home': '/',
      'go home': '/',
      'go to home': '/',
      'main page': '/',
      'shop': '/shop',
      'go shop': '/shop',
      'go to shop': '/shop',
      'store': '/shop',
      'marketplace': '/shop',
      'prediction': '/predict',
      'go to prediction': '/predict',
      'predict': '/predict',
      'crop prediction': '/predict',
      'predict crop': '/predict',
      'analytics': '/analytics',
      'go to analytics': '/analytics',
      'dashboard': '/analytics',
      'cart': '/cart',
      'go to cart': '/cart',
      'shopping cart': '/cart',
      'view cart': '/cart',
      'open cart': '/cart',
      'my cart': '/cart',
      'checkout': '/cart',
      'contact': '/contact',
      'go to contact': '/contact',
      'contact us': '/contact',
      'orders': '/orders',
      'my orders': '/orders',
      'order status': '/orders',
      'check orders': '/orders',
      'check my orders': '/orders',
      'order history': '/orders',
      'login': '/auth',
      'sign in': '/auth',
      'sign up': '/auth',
      'register': '/auth',
      'history': '/history',
      'prediction history': '/history',
    };

    // Check navigation commands
    for (const [phrase, path] of Object.entries(navigationCommands)) {
      if (lowerCommand.includes(phrase)) {
        navigate(path);
        const message = `${t('voice.navigating')} ${phrase}`;
        toast({ title: t('voice.command'), description: message });
        speak(message);
        return true;
      }
    }

    // Add to cart command: "add wheat seeds to cart" or "add to cart wheat"
    const addToCartPatterns = [
      /add (.+) to (?:the )?cart/i,
      /add to cart (.+)/i,
      /put (.+) in (?:the )?cart/i,
      /buy (.+)/i,
    ];
    
    for (const pattern of addToCartPatterns) {
      const match = lowerCommand.match(pattern);
      if (match && match[1]) {
        await searchAndAddToCart(match[1].trim());
        return true;
      }
    }

    // Search command: "search for wheat seeds" or "find fertilizer"
    const searchPatterns = [
      /search (?:for )?(.+)/i,
      /find (.+)/i,
      /look for (.+)/i,
      /show me (.+)/i,
    ];

    for (const pattern of searchPatterns) {
      const match = lowerCommand.match(pattern);
      if (match && match[1]) {
        await searchProducts(match[1].trim());
        return true;
      }
    }

    // Command not recognized
    const message = t('voice.tryAgain');
    toast({
      title: t('voice.notRecognized'),
      description: message,
      variant: "destructive",
    });
    speak(t('voice.notRecognized') + '. ' + message);
    return false;
  }, [navigate, t, speak, addToCart]);

  const startListening = () => {
    if (!recognition) {
      toast({
        title: t('voice.notSupported'),
        description: t('voice.browserNotSupported'),
        variant: "destructive",
      });
      speak(t('voice.browserNotSupported'));
      return;
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript;
      setTranscript(result);
      
      if (event.results[current].isFinal) {
        processCommand(result);
        setIsListening(false);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: t('voice.error'),
        description: t('voice.errorMessage'),
        variant: "destructive",
      });
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
    setIsListening(true);
    setTranscript('');
    speak(t('voice.listening'));
  };

  const stopListening = () => {
    recognition?.stop();
    setIsListening(false);
  };

  return (
    <>
      <Button
        onClick={isListening ? stopListening : startListening}
        size="icon"
        variant={isListening ? "destructive" : "outline"}
        className="fixed bottom-24 right-6 z-50 h-12 w-12 rounded-full shadow-lg"
        title={t('voice.title')}
      >
        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </Button>

      {isListening && (
        <div className="fixed bottom-40 right-6 z-50 bg-card border border-border rounded-lg p-4 shadow-xl max-w-xs animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-primary">{t('voice.listening')}</span>
              {isSpeaking && <Volume2 className="h-4 w-4 text-primary animate-pulse" />}
            </div>
            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={stopListening}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full animate-pulse"
                  style={{
                    height: `${12 + Math.random() * 12}px`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
          {transcript && (
            <p className="text-sm text-muted-foreground italic">"{transcript}"</p>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            {t('voice.tryCommands')}
          </p>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
