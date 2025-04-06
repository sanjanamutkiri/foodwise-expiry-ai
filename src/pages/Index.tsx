
import React from 'react';
import LandingHero from '@/components/LandingHero';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="flex-1">
        <LandingHero />
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 FoodWise. An AI-powered food expiry tracking system.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
