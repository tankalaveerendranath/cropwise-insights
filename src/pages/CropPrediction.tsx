import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Footer from '@/components/Footer';
import { Brain, Leaf, Droplets, Thermometer, CloudRain, FlaskConical, TrendingUp, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const states = ['Maharashtra', 'Punjab', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal', 'Rajasthan', 'Gujarat'];
const soilTypes = ['Black', 'Red', 'Alluvial', 'Laterite', 'Saline', 'Arid'];
const crops = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Pulses', 'Millets', 'Soybean'];

interface PredictionResult {
  crop: string;
  yield: number;
  confidence: number;
  marketRate: number;
}

const CropPrediction: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const [formData, setFormData] = useState({
    state: 'Maharashtra',
    soilType: 'Black',
    temperature: 28,
    humidity: 65,
    rainfall: 150,
    pH: 6.5,
    nitrogen: 150,
    phosphorus: 50,
    potassium: 100,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'state' || name === 'soilType' ? value : parseFloat(value) || 0,
    }));
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate AI prediction
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock prediction based on inputs
    const cropIndex = Math.floor((formData.nitrogen + formData.phosphorus + formData.potassium) / 100) % crops.length;
    const selectedCrop = crops[cropIndex];
    const baseYield = 2000 + (formData.rainfall * 5) + (formData.humidity * 10);
    const marketRates: Record<string, number> = {
      Wheat: 2100, Rice: 2200, Maize: 1800, Cotton: 5500,
      Sugarcane: 350, Pulses: 5800, Millets: 2200, Soybean: 4500
    };

    setPrediction({
      crop: selectedCrop,
      yield: Math.round(baseYield + Math.random() * 500),
      confidence: Math.round(75 + Math.random() * 20),
      marketRate: marketRates[selectedCrop] || 2000,
    });

    setLoading(false);
    toast.success('Prediction complete!');
  };

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="py-12 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <Brain className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-primary-foreground">AI-Powered Analysis</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Crop Prediction Engine
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Enter your soil and environmental parameters to get AI-powered crop recommendations and yield predictions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-card rounded-2xl shadow-card border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-primary" />
                Input Parameters
              </h2>

              <form onSubmit={handlePredict} className="space-y-6">
                {/* Location */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="flex h-11 w-full rounded-lg border-2 border-input bg-background px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
                    >
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <select
                      id="soilType"
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleChange}
                      className="flex h-11 w-full rounded-lg border-2 border-input bg-background px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
                    >
                      {soilTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Environmental */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature" className="flex items-center gap-1">
                      <Thermometer className="w-4 h-4 text-secondary" />
                      Temperature (°C)
                    </Label>
                    <Input
                      id="temperature"
                      name="temperature"
                      type="number"
                      value={formData.temperature}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="humidity" className="flex items-center gap-1">
                      <Droplets className="w-4 h-4 text-primary" />
                      Humidity (%)
                    </Label>
                    <Input
                      id="humidity"
                      name="humidity"
                      type="number"
                      value={formData.humidity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rainfall" className="flex items-center gap-1">
                      <CloudRain className="w-4 h-4 text-primary" />
                      Rainfall (mm)
                    </Label>
                    <Input
                      id="rainfall"
                      name="rainfall"
                      type="number"
                      value={formData.rainfall}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Soil Properties */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pH">Soil pH</Label>
                    <Input
                      id="pH"
                      name="pH"
                      type="number"
                      step="0.1"
                      value={formData.pH}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nitrogen">Nitrogen (N) kg/ha</Label>
                    <Input
                      id="nitrogen"
                      name="nitrogen"
                      type="number"
                      value={formData.nitrogen}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phosphorus">Phosphorus (P) kg/ha</Label>
                    <Input
                      id="phosphorus"
                      name="phosphorus"
                      type="number"
                      value={formData.phosphorus}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="potassium">Potassium (K) kg/ha</Label>
                    <Input
                      id="potassium"
                      name="potassium"
                      type="number"
                      value={formData.potassium}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full gap-2" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5" />
                      Predict Optimal Crop
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {prediction ? (
                <div className="bg-card rounded-2xl shadow-card border border-border p-8 animate-slide-up">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-6 h-6 text-secondary" />
                    <h2 className="text-2xl font-bold text-foreground">Prediction Results</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="bg-accent rounded-xl p-6 text-center">
                      <Leaf className="w-10 h-10 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Recommended Crop</p>
                      <p className="text-2xl font-bold text-foreground">{prediction.crop}</p>
                    </div>
                    <div className="bg-accent rounded-xl p-6 text-center">
                      <TrendingUp className="w-10 h-10 text-secondary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Expected Yield</p>
                      <p className="text-2xl font-bold text-foreground">{prediction.yield.toLocaleString()} kg/ha</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <span className="text-muted-foreground">Confidence Score</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full gradient-hero rounded-full transition-all duration-500"
                            style={{ width: `${prediction.confidence}%` }}
                          />
                        </div>
                        <span className="font-semibold text-foreground">{prediction.confidence}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <span className="text-muted-foreground">Market Rate (2024)</span>
                      <span className="font-semibold text-foreground">₹{prediction.marketRate.toLocaleString()}/quintal</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <span className="text-muted-foreground">Estimated Revenue</span>
                      <span className="font-bold text-primary text-lg">
                        ₹{((prediction.yield / 100) * prediction.marketRate).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-2xl shadow-card border border-border p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Analyze</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Fill in the parameters and click predict to get AI-powered crop recommendations.
                    </p>
                  </div>
                </div>
              )}

              {/* Quick Tips */}
              <div className="bg-accent rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-4">💡 Quick Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Optimal pH for most crops: 6.0 - 7.5</li>
                  <li>• Higher N:P:K ratios favor leafy crops</li>
                  <li>• Rainfall above 200mm suits rice cultivation</li>
                  <li>• Black soil is ideal for cotton and soybeans</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CropPrediction;
