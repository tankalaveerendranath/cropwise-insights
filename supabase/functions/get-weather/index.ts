import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WeatherResponse {
  temperature: number;
  humidity: number;
  condition: string;
  windSpeed: number;
  rainfall: number;
  feelsLike: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  location: string;
  icon: string;
  description: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('OPENWEATHER_API_KEY');
    
    if (!apiKey) {
      console.error('OPENWEATHER_API_KEY not configured');
      throw new Error('Weather API key not configured');
    }

    const { lat, lon, city } = await req.json();
    
    let url: string;
    
    if (lat && lon) {
      // Use coordinates
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);
    } else if (city) {
      // Use city name
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
      console.log(`Fetching weather for city: ${city}`);
    } else {
      // Default to a major agricultural region in India
      url = `https://api.openweathermap.org/data/2.5/weather?q=Nagpur,IN&appid=${apiKey}&units=metric`;
      console.log('Fetching weather for default location: Nagpur, IN');
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenWeather API error: ${response.status} - ${errorText}`);
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Weather data received:', JSON.stringify(data));

    // Extract relevant weather data
    const weatherData: WeatherResponse = {
      temperature: Math.round(data.main?.temp || 0),
      humidity: data.main?.humidity || 0,
      condition: data.weather?.[0]?.main || 'Unknown',
      windSpeed: Math.round((data.wind?.speed || 0) * 3.6), // Convert m/s to km/h
      rainfall: data.rain?.['1h'] || data.rain?.['3h'] || 0,
      feelsLike: Math.round(data.main?.feels_like || 0),
      pressure: data.main?.pressure || 0,
      visibility: Math.round((data.visibility || 0) / 1000), // Convert to km
      uvIndex: 0, // Not available in basic API
      location: data.name || 'Unknown',
      icon: data.weather?.[0]?.icon || '01d',
      description: data.weather?.[0]?.description || 'No description',
    };

    console.log('Processed weather data:', JSON.stringify(weatherData));

    return new Response(
      JSON.stringify(weatherData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
    console.error('Error in get-weather function:', errorMessage);
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        // Return fallback data so the app doesn't break
        fallback: true,
        temperature: 28,
        humidity: 65,
        condition: 'Partly Cloudy',
        windSpeed: 12,
        rainfall: 0,
        location: 'Default',
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 // Return 200 with fallback data instead of error
      }
    );
  }
});