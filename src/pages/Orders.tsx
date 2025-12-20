import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, MapPin, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';

interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;
  shippingDetails: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  totalAmount: number;
  status: string;
  createdAt: string;
  estimatedDelivery: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-primary" />;
      default:
        return <Package className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'delivered':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTrackingSteps = (status: string) => {
    const steps = [
      { key: 'confirmed', label: 'Order Confirmed', icon: Package },
      { key: 'processing', label: 'Processing', icon: Clock },
      { key: 'shipped', label: 'Shipped', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: CheckCircle },
    ];

    const currentIndex = steps.findIndex(s => s.key === status);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= (currentIndex === -1 ? 0 : currentIndex),
      current: step.key === status,
    }));
  };

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">No orders yet</h1>
            <p className="text-muted-foreground mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link to="/shop">
              <Button variant="hero" size="lg" className="gap-2">
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
              {/* Order Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <p className="font-bold text-foreground">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="font-bold text-foreground">₹{order.totalAmount.toLocaleString()}</p>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="border-t border-border p-6 space-y-6">
                  {/* Tracking Progress */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Order Tracking</h3>
                    <div className="flex items-center justify-between relative">
                      <div className="absolute top-5 left-0 right-0 h-1 bg-muted rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ 
                            width: `${(getTrackingSteps(order.status).filter(s => s.completed).length - 1) / 3 * 100}%` 
                          }}
                        />
                      </div>
                      {getTrackingSteps(order.status).map(step => (
                        <div key={step.key} className="flex flex-col items-center relative z-10">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                          }`}>
                            <step.icon className="w-5 h-5" />
                          </div>
                          <span className={`text-xs mt-2 text-center ${
                            step.current ? 'text-foreground font-medium' : 'text-muted-foreground'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Items</h3>
                    <div className="space-y-3">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-4 bg-muted rounded-lg p-3">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-foreground">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Details */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Shipping Address
                      </h3>
                      <div className="bg-muted rounded-lg p-4">
                        <p className="font-medium text-foreground">{order.shippingDetails.fullName}</p>
                        <p className="text-sm text-muted-foreground">{order.shippingDetails.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.shippingDetails.city}, {order.shippingDetails.state} - {order.shippingDetails.pincode}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{order.shippingDetails.phone}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-primary" />
                        Delivery Info
                      </h3>
                      <div className="bg-muted rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                        <p className="font-medium text-foreground">
                          {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Orders;
