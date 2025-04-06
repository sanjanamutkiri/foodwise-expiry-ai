
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardStats from '@/components/DashboardStats';
import FoodItemCard from '@/components/FoodItemCard';
import AddFoodItemForm from '@/components/AddFoodItemForm';
import ExpiryWarnings from '@/components/ExpiryWarnings';
import MealSuggestions from '@/components/MealSuggestions';
import BarcodeScannerPlaceholder from '@/components/BarcodeScannerPlaceholder';
import { Search } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Mock data for initial state
const initialFoodItems = [
  {
    id: uuidv4(),
    name: 'Milk',
    category: 'Dairy & Eggs',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    quantity: 1,
    unit: 'l'
  },
  {
    id: uuidv4(),
    name: 'Chicken Breast',
    category: 'Meat & Seafood',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    quantity: 500,
    unit: 'g'
  },
  {
    id: uuidv4(),
    name: 'Apples',
    category: 'Fruits & Vegetables',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    quantity: 6,
    unit: 'pcs'
  },
  {
    id: uuidv4(),
    name: 'Bread',
    category: 'Bakery',
    expiryDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    quantity: 1,
    unit: 'pcs'
  }
];

// Mock meal suggestions based on inventory
const mockMealSuggestions = [
  {
    id: uuidv4(),
    name: 'Chicken Apple Salad',
    ingredients: ['Chicken Breast', 'Apples', 'Lettuce'],
    difficulty: 'Easy' as const,
    prepTime: '20 mins'
  },
  {
    id: uuidv4(),
    name: 'French Toast',
    ingredients: ['Bread', 'Milk', 'Eggs'],
    difficulty: 'Easy' as const,
    prepTime: '15 mins'
  }
];

const HomeDashboard = () => {
  const [foodItems, setFoodItems] = useState(initialFoodItems);
  const [searchQuery, setSearchQuery] = useState('');
  
  const addFoodItem = (item) => {
    const newItem = {
      ...item,
      id: uuidv4(),
    };
    setFoodItems([...foodItems, newItem]);
  };
  
  const deleteFoodItem = (id) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };
  
  const editFoodItem = (id) => {
    console.log('Editing item', id);
    // Will be implemented in the next iteration
  };
  
  // Filter items based on search query
  const filteredItems = foodItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate stats
  const today = new Date();
  const expiringSoon = foodItems.filter(item => {
    const daysUntilExpiry = Math.ceil(
      (item.expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    return daysUntilExpiry >= 0 && daysUntilExpiry <= 3;
  }).length;
  
  const expired = foodItems.filter(item => 
    item.expiryDate.getTime() < today.getTime()
  ).length;
  
  // Get items expiring in the next 3 days for warnings
  const warningItems = foodItems
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
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Home Kitchen Dashboard</h1>
            <p className="text-gray-500">Track your food items and manage expiry dates</p>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search items..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <AddFoodItemForm onAddItem={addFoodItem} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <DashboardStats 
              totalItems={foodItems.length} 
              expiringSoon={expiringSoon} 
              expired={expired}
            />
            
            {warningItems.length > 0 && (
              <div className="mt-6">
                <ExpiryWarnings items={warningItems} />
              </div>
            )}
            
            <div className="mt-8">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Items ({filteredItems.length})</TabsTrigger>
                  <TabsTrigger value="expiring">Expiring Soon ({expiringSoon})</TabsTrigger>
                  <TabsTrigger value="expired">Expired ({expired})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.length > 0 ? (
                      filteredItems.map(item => (
                        <FoodItemCard
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          category={item.category}
                          expiryDate={item.expiryDate}
                          quantity={item.quantity}
                          unit={item.unit}
                          onDelete={deleteFoodItem}
                          onEdit={editFoodItem}
                        />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-10">
                        <p className="text-gray-500">No items found. Add some items to your inventory!</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="expiring" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {foodItems.filter(item => {
                      const daysUntilExpiry = Math.ceil(
                        (item.expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
                      );
                      return daysUntilExpiry >= 0 && daysUntilExpiry <= 3;
                    }).length > 0 ? (
                      foodItems
                        .filter(item => {
                          const daysUntilExpiry = Math.ceil(
                            (item.expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
                          );
                          return daysUntilExpiry >= 0 && daysUntilExpiry <= 3;
                        })
                        .map(item => (
                          <FoodItemCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            expiryDate={item.expiryDate}
                            quantity={item.quantity}
                            unit={item.unit}
                            onDelete={deleteFoodItem}
                            onEdit={editFoodItem}
                          />
                        ))
                    ) : (
                      <div className="col-span-full text-center py-10">
                        <p className="text-gray-500">No items expiring soon.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="expired" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {foodItems.filter(item => 
                      item.expiryDate.getTime() < today.getTime()
                    ).length > 0 ? (
                      foodItems
                        .filter(item => item.expiryDate.getTime() < today.getTime())
                        .map(item => (
                          <FoodItemCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            expiryDate={item.expiryDate}
                            quantity={item.quantity}
                            unit={item.unit}
                            onDelete={deleteFoodItem}
                            onEdit={editFoodItem}
                          />
                        ))
                    ) : (
                      <div className="col-span-full text-center py-10">
                        <p className="text-gray-500">No expired items.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="mt-10">
              <MealSuggestions recipes={mockMealSuggestions} />
            </div>
          </div>
          
          <div className="md:col-span-1 space-y-6">
            <BarcodeScannerPlaceholder />
            
            <Card className="p-4 border-primary/20 bg-primary/5">
              <h3 className="font-medium mb-2">Tips to Reduce Food Waste</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/20 p-0.5 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  Store fruits and vegetables properly to extend freshness
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/20 p-0.5 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  Freeze items that are about to expire
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/20 p-0.5 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  Plan your meals around what needs to be used first
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/20 p-0.5 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  Don't overshop - buy only what you need
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeDashboard;
