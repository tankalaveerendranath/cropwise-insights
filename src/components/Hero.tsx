import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, ShoppingBag, Leaf, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-farm.jpg';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Modern agricultural field with technology overlay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Agriculture</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-up">
            Smart Farming for a
            <span className="block text-secondary">Sustainable Future</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Leverage AI-powered crop predictions, real-time analytics, and access quality agricultural products—all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/auth?mode=signup">
              <Button variant="gold" size="xl" className="gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/predict">
              <Button variant="outline" size="xl" className="bg-card/20 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-card/40 hover:text-primary-foreground">
                Try Prediction
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: BarChart3, title: 'Crop Prediction', desc: 'AI-based recommendations' },
              { icon: Leaf, title: 'Analytics', desc: 'Power BI insights' },
              { icon: ShoppingBag, title: 'E-Commerce', desc: 'Quality agri products' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-card/20 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10 hover:bg-card/30 transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-secondary mb-2" />
                <h3 className="font-semibold text-primary-foreground">{title}</h3>
                <p className="text-sm text-primary-foreground/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-float" />
    </section>
  );
};

export default Hero;
