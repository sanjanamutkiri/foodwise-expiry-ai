
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center px-4 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 sm:text-5xl md:text-6xl">
        <span className="text-primary">FoodWise</span>: AI Expiry Tracker
      </h1>
      
      <p className="text-xl mb-8 max-w-2xl">
        Minimize food wastage and maximize resourceful consumption using AI and smart inventory tracking.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
        <Card className="flex-1 p-6 hover:shadow-lg transition-shadow border-2 border-primary/20 hover:border-primary">
          <h2 className="text-2xl font-bold mb-3">🏡 Home Mode</h2>
          <p className="mb-6 text-gray-600">
            Track your kitchen items, get expiry notifications, and receive AI-generated meal suggestions.
          </p>
          <Button 
            onClick={() => navigate('/home-dashboard')} 
            className="w-full"
          >
            Enter Home Mode
          </Button>
        </Card>
        
        <Card className="flex-1 p-6 hover:shadow-lg transition-shadow border-2 border-primary/20 hover:border-primary">
          <h2 className="text-2xl font-bold mb-3">👨‍🍳 Restaurant Mode</h2>
          <p className="mb-6 text-gray-600">
            Manage inventory, track bulk items, and minimize wastage for your restaurant.
          </p>
          <Button 
            onClick={() => navigate('/restaurant-dashboard')} 
            variant="outline" 
            className="w-full border-primary hover:bg-primary hover:text-primary-foreground"
          >
            Enter Restaurant Mode
          </Button>
        </Card>
      </div>
      
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-4">Why Choose FoodWise?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="bg-fresh/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fresh">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Track Expiry Dates</h4>
            <p className="text-gray-600">Never forget when food expires with smart notifications.</p>
          </div>
          
          <div>
            <div className="bg-info/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-info">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.309 48.309 0 01-8.135-1.088c-1.717-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">AI Meal Suggestions</h4>
            <p className="text-gray-600">Get creative recipe ideas based on items in your kitchen.</p>
          </div>
          
          <div>
            <div className="bg-warning/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-warning">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Reduce Food Waste</h4>
            <p className="text-gray-600">Save money and help the environment by minimizing waste.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
