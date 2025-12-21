import React from 'react';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, ShoppingBag, Brain, Shield, Zap, Users, Sprout, Droplets, Sun, Tractor, Leaf, TrendingUp } from 'lucide-react';
import farmingTech from '@/assets/farming-technology.jpg';
import organicHarvest from '@/assets/organic-harvest.jpg';
import smartFarming from '@/assets/smart-farming.jpg';

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

      {/* About Agriculture Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Sprout className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Sustainable Agriculture</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Empowering Farmers with Modern Technology
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Agriculture is the backbone of our economy, supporting over 58% of India's population. 
                With changing climate patterns and increasing demand, modern farming techniques have 
                become essential for sustainable growth.
              </p>
              <p className="text-muted-foreground mb-8">
                AgroSmart bridges the gap between traditional farming wisdom and cutting-edge technology, 
                helping farmers make data-driven decisions that improve yields, reduce costs, and promote 
                environmental sustainability.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <Droplets className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold text-foreground">Smart Irrigation</h4>
                  <p className="text-sm text-muted-foreground">Optimize water usage with precision farming</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                  <Sun className="w-8 h-8 text-secondary mb-2" />
                  <h4 className="font-semibold text-foreground">Climate Analysis</h4>
                  <p className="text-sm text-muted-foreground">Weather-based crop recommendations</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={farmingTech}
                alt="Farmers using modern technology in agricultural field"
                className="rounded-2xl shadow-card w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-card border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">40%</p>
                    <p className="text-sm text-muted-foreground">Yield Increase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agricultural Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="text-primary">AgroSmart?</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of farmers who have transformed their agricultural practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src={smartFarming}
                alt="Aerial view of modern agricultural farm with drone technology"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-primary-foreground mb-2">Precision Agriculture</h3>
                  <p className="text-primary-foreground/80">
                    Use drones, sensors, and AI to monitor crop health and optimize resources
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src={organicHarvest}
                alt="Fresh organic vegetables harvest from farm"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-primary-foreground mb-2">Quality Products</h3>
                  <p className="text-primary-foreground/80">
                    Access premium seeds, fertilizers, and equipment for better harvests
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { value: '10,000+', label: 'Active Farmers', icon: Users },
              { value: '8', label: 'States Covered', icon: Leaf },
              { value: '50+', label: 'Crop Varieties', icon: Sprout },
              { value: '95%', label: 'Prediction Accuracy', icon: Brain },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center p-6 bg-card rounded-xl border border-border">
                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
                <p className="text-muted-foreground">{label}</p>
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
