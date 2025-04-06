
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isRestaurantMode = location.pathname.includes('restaurant');
  
  return (
    <header className="border-b shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
            </svg>
          </div>
          <span className="font-bold text-xl hidden sm:inline">FoodWise</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {!isHome && (
            <div className="items-center gap-2 text-sm hidden md:flex">
              {isRestaurantMode ? (
                <div className="bg-warning/10 text-warning px-3 py-1 rounded-full">
                  Restaurant Mode
                </div>
              ) : (
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                  Home Mode
                </div>
              )}
            </div>
          )}
          
          {!isHome && (
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          )}
          
          {/* Placeholder for future user menu */}
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
