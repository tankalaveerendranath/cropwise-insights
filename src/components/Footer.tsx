import React from 'react';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">AgroSmart</span>
            </Link>
            <p className="text-primary-foreground/70 max-w-md mb-6">
              Empowering farmers with AI-driven insights, analytics, and quality agricultural products for sustainable farming.
            </p>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@agrosmart.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link to="/predict" className="hover:text-primary-foreground transition-colors">Crop Prediction</Link></li>
              <li><Link to="/analytics" className="hover:text-primary-foreground transition-colors">Analytics</Link></li>
              <li><Link to="/shop" className="hover:text-primary-foreground transition-colors">Shop</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© 2024 AgroSmart. All rights reserved. Made with 💚 for farmers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
