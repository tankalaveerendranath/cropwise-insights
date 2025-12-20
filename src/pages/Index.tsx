import React from 'react';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, ShoppingBag, Brain, Shield, Zap, Users } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for
              <span className="text-primary"> Smart Farming</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive tools and resources to maximize your agricultural success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI Crop Prediction',
                description: 'Get accurate crop recommendations based on soil conditions, weather, and historical data.',
                color: 'bg-primary/10 text-primary',
              },
              {
                icon: BarChart3,
                title: 'Power BI Analytics',
                description: 'Visualize trends, market rates, and yield patterns with interactive dashboards.',
                color: 'bg-secondary/10 text-secondary',
              },
              {
                icon: ShoppingBag,
                title: 'Agricultural E-Commerce',
                description: 'Shop for quality seeds, fertilizers, equipment, and more at competitive prices.',
                color: 'bg-primary/10 text-primary',
              },
              {
                icon: Shield,
                title: 'Secure Platform',
                description: 'Your data is protected with enterprise-grade security and encryption.',
                color: 'bg-success/10 text-success',
              },
              {
                icon: Zap,
                title: 'Real-time Updates',
                description: 'Stay informed with live market rates and weather-based recommendations.',
                color: 'bg-secondary/10 text-secondary',
              },
              {
                icon: Users,
                title: 'Community Support',
                description: 'Connect with fellow farmers and agricultural experts for guidance.',
                color: 'bg-primary/10 text-primary',
              },
            ].map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="group p-6 bg-card rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 border border-border"
              >
                <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of farmers who are already using AgroSmart to increase yields and optimize their agricultural practices.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth?mode=signup">
              <Button variant="gold" size="xl" className="gap-2">
                Start Free Today
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/predict">
              <Button 
                variant="outline" 
                size="xl" 
                className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
