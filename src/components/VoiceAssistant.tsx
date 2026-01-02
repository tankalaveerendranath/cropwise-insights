import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mic, MicOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const VoiceAssistant = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      setRecognition(recognitionInstance);
    }
  }, []);

  const processCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    const commands: { [key: string]: string } = {
      'home': '/',
      'go home': '/',
      'go to home': '/',
      'shop': '/shop',
      'go shop': '/shop',
      'go to shop': '/shop',
      'store': '/shop',
      'prediction': '/prediction',
      'go to prediction': '/prediction',
      'predict': '/prediction',
      'analytics': '/analytics',
      'go to analytics': '/analytics',
      'cart': '/cart',
      'go to cart': '/cart',
      'shopping cart': '/cart',
      'contact': '/contact',
      'go to contact': '/contact',
      'orders': '/orders',
      'my orders': '/orders',
      'login': '/auth',
      'sign in': '/auth',
      'sign up': '/auth',
    };

    for (const [phrase, path] of Object.entries(commands)) {
      if (lowerCommand.includes(phrase)) {
        navigate(path);
        toast({
          title: "Voice Command",
          description: `Navigating to ${phrase}`,
        });
        return true;
      }
    }

    toast({
      title: "Command not recognized",
      description: `Try saying: "Go to shop" or "Open cart"`,
      variant: "destructive",
    });
    return false;
  }, [navigate]);

  const startListening = () => {
    if (!recognition) {
      toast({
        title: "Voice not supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      });
      return;
    }

    recognition.onresult = (event) => {
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
        title: "Error",
        description: "Voice recognition failed. Please try again.",
        variant: "destructive",
      });
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
    setIsListening(true);
    setTranscript('');
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
      >
        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </Button>

      {isListening && (
        <div className="fixed bottom-40 right-6 z-50 bg-card border border-border rounded-lg p-4 shadow-xl max-w-xs animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">{t('voice.listening')}</span>
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
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
