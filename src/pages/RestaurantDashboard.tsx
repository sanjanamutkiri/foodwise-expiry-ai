import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import DashboardStats from '@/components/DashboardStats';
import ExpiryWarnings from '@/components/ExpiryWarnings';
import VoiceScanPlaceholder from '@/components/VoiceScanPlaceholder';
import ExpiredFoodAdvice from '@/components/ExpiredFoodAdvice';

// Importing our new components
import InventoryList from '@/components/restaurant/InventoryList';
import QuickActions from '@/components/restaurant/QuickActions';
import StorageTips from '@/components/restaurant/StorageTips';
import SearchBar from '@/components/restaurant/SearchBar';
import MealSuggestions from '@/components/restaurant/MealSuggestions';

// Mock data for initial restaurant inventory with Indian food items
const initialInventoryItems = [
  {
    id: uuidv4(),
    name: 'Paneer',
    category: 'Dairy & Paneer',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    quantity: 3,
    unit: 'kg'
  },
  {
    id: uuidv4(),
    name: 'Ghee',
    category: 'Dairy & Fats',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 14)),
    quantity: 2,
    unit: 'kg'
  },
  {
    id: uuidv4(),
    name: 'Ginger-Garlic Paste',
    category: 'Condiments',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    quantity: 0.5,
    unit: 'kg'
  },
  {
    id: uuidv4(),
    name: 'Basmati Rice',
    category: 'Grains & Rice',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 120)),
    quantity: 5,
    unit: 'kg'
  },
  {
    id: uuidv4(),
    name: 'Fresh Coriander',
    category: 'Herbs & Greens',
    expiryDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    quantity: 0.2,
    unit: 'kg'
  },
  {
    id: uuidv4(),
    name: 'Garam Masala',
    category: 'Spices',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 60)),
    quantity: 0.5,
    unit: 'kg'
  }
];

const RestaurantDashboard = () => {
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMealSuggestions, setShowMealSuggestions] = useState(false);
  const [showExpiredFoodAdvice, setShowExpiredFoodAdvice] = useState(false);
  
  // Functions for managing inventory
  const addInventoryItem = (item) => {
    const newItem = {
      ...item,
      id: uuidv4(),
    };
    setInventoryItems([...inventoryItems, newItem]);
  };
  
  const deleteInventoryItem = (id) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
  };
  
  const editInventoryItem = (id) => {
    console.log('Editing item', id);
    // Will be implemented in the next iteration
  };
  
  // Filter items based on search query
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate stats and warning items
  const today = new Date();
  const expiringSoon = inventoryItems.filter(item => {
    const daysUntilExpiry = Math.ceil(
      (item.expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    return daysUntilExpiry >= 0 && daysUntilExpiry <= 3;
  }).length;
  
  const expired = inventoryItems.filter(item => 
    item.expiryDate.getTime() < today.getTime()
  ).length;
  
  // Get items expiring in the next 3 days for warnings
  const warningItems = inventoryItems
    .filter(item => {
      const daysUntilExpiry = Math.ceil(
        (item.expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
      );
      return daysUntilExpiry >= 0 && daysUntilExpiry <= 3;
    })
    .map(item => ({
      id: item.id,
      name: item.name,
      daysLeft: Math.ceil(
        (item.expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
      )
    }))
    .sort((a, b) => a.daysLeft - b.daysLeft);
  
  // Event handlers
  const handleInventoryReport = () => {
    toast.success("Generating inventory report...");
    window.open("/inventory-report", "_blank");
  };

  const handleGetMealSuggestions = () => {
    setShowMealSuggestions(true);
  };

  const handleExpiredFoodAdvice = () => {
    setShowExpiredFoodAdvice(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Restaurant Inventory Dashboard</h1>
            <p className="text-gray-500">Manage your kitchen inventory and track expiry dates</p>
          </div>
          
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onAddItem={addInventoryItem} 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <DashboardStats 
              totalItems={inventoryItems.length} 
              expiringSoon={expiringSoon} 
              expired={expired}
            />
            
            {warningItems.length > 0 && (
              <div className="mt-6">
                <ExpiryWarnings items={warningItems} />
              </div>
            )}

            {showMealSuggestions && (
              <div className="mt-6">
                <MealSuggestions onClose={() => setShowMealSuggestions(false)} />
              </div>
            )}

            {showExpiredFoodAdvice && 
              <ExpiredFoodAdvice onClose={() => setShowExpiredFoodAdvice(false)} />
            }
            
            <InventoryList 
              filteredItems={filteredItems}
              inventoryItems={inventoryItems}
              today={today}
              deleteInventoryItem={deleteInventoryItem}
              editInventoryItem={editInventoryItem}
              expiringSoon={expiringSoon}
              expired={expired}
            />
          </div>
          
          <div className="md:col-span-1 space-y-6">
            <QuickActions 
              handleInventoryReport={handleInventoryReport}
              handleGetMealSuggestions={handleGetMealSuggestions}
              handleExpiredFoodAdvice={handleExpiredFoodAdvice}
              onAddItem={addInventoryItem}
            />
            
            <StorageTips />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDashboard;
