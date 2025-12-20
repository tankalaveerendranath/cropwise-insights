import React from 'react';
import Footer from '@/components/Footer';
import { BarChart3, ExternalLink, TrendingUp, PieChart, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Analytics: React.FC = () => {
  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="py-12 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <BarChart3 className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-primary-foreground">Power BI Integration</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Agricultural Analytics Dashboard
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Visualize crop trends, market rates, and yield patterns with interactive Power BI dashboards.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: TrendingUp, label: 'Avg Yield Growth', value: '+12.5%', color: 'text-primary' },
              { icon: PieChart, label: 'Crops Analyzed', value: '8+', color: 'text-secondary' },
              { icon: Activity, label: 'Data Points', value: '50K+', color: 'text-primary' },
              { icon: BarChart3, label: 'States Covered', value: '8', color: 'text-secondary' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-card rounded-2xl shadow-soft border border-border p-6">
                <Icon className={`w-8 h-8 ${color} mb-3`} />
                <p className="text-sm text-muted-foreground mb-1">{label}</p>
                <p className="text-3xl font-bold text-foreground">{value}</p>
              </div>
            ))}
          </div>

          {/* Power BI Embed Placeholder */}
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Crop Analysis Dashboard</h2>
                <p className="text-sm text-muted-foreground">Interactive visualizations powered by Power BI</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Open Full View
              </Button>
            </div>

            {/* Embed Area */}
            <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
              {/* Placeholder visualization */}
              <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
                <div className="w-full max-w-4xl">
                  {/* Mock Chart */}
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    {[65, 45, 80, 55, 70, 40, 85, 60].map((height, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          className="w-full rounded-t-lg gradient-hero transition-all duration-500"
                          style={{ height: `${height * 2}px` }}
                        />
                        <span className="text-xs text-muted-foreground mt-2">
                          {['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugar', 'Pulses', 'Millet', 'Soy'][i]}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-card rounded-lg px-4 py-3 shadow-soft">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">
                        Connect your Power BI dashboard for real-time analytics
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      To embed your Power BI report, replace this placeholder with your Power BI embed URL
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Charts Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Market Trends */}
            <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Market Rate Trends (₹/quintal)</h3>
              <div className="space-y-4">
                {[
                  { crop: 'Cotton', rate: 5427, change: '+3.2%' },
                  { crop: 'Pulses', rate: 5770, change: '+2.1%' },
                  { crop: 'Wheat', rate: 2051, change: '+1.5%' },
                  { crop: 'Rice', rate: 2284, change: '+4.2%' },
                  { crop: 'Maize', rate: 1682, change: '-0.8%' },
                ].map(({ crop, rate, change }) => (
                  <div key={crop} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-medium text-foreground">{crop}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-foreground">₹{rate.toLocaleString()}</span>
                      <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-primary' : 'text-destructive'}`}>
                        {change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Distribution */}
            <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Regional Yield Distribution</h3>
              <div className="space-y-4">
                {[
                  { state: 'Punjab', yield: 4200, percent: 95 },
                  { state: 'Maharashtra', yield: 3800, percent: 85 },
                  { state: 'Karnataka', yield: 3500, percent: 78 },
                  { state: 'Tamil Nadu', yield: 3200, percent: 72 },
                  { state: 'West Bengal', yield: 2900, percent: 65 },
                ].map(({ state, yield: yieldVal, percent }) => (
                  <div key={state}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{state}</span>
                      <span className="text-muted-foreground">{yieldVal.toLocaleString()} kg/ha</span>
                    </div>
                    <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-hero rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Analytics;
