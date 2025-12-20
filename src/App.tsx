import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import CropPrediction from "./pages/CropPrediction";
import Analytics from "./pages/Analytics";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (email: string, name: string) => {
    setUser({ email, name });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route 
                path="/auth" 
                element={
                  isAuthenticated 
                    ? <Navigate to="/" replace /> 
                    : <AuthPage onLogin={handleLogin} />
                } 
              />
              <Route path="/predict" element={<CropPrediction />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/shop" element={<Shop />} />
              <Route 
                path="/cart" 
                element={
                  isAuthenticated 
                    ? <Cart /> 
                    : <Navigate to="/auth" replace />
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
