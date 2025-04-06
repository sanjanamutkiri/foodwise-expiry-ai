
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DashboardStats from '@/components/DashboardStats';
import FoodItemCard from '@/components/FoodItemCard';
import AddFoodItemForm from '@/components/AddFoodItemForm';
import ExpiryWarnings from '@/components/ExpiryWarnings';
import { Search, Mic, ScanBarcode, FileText } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import VoiceScanPlaceholder from '@/components/VoiceScanPlaceholder';
import ExpiredFoodAdvice from '@/components/ExpiredFoodAdvice';

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
  
  // Calculate stats
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
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search inventory..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <AddFoodItemForm onAddItem={addInventoryItem} />
          </div>
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
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-3">Meal Suggestions</h3>
                    <div className="space-y-2">
                      <p>Based on your inventory, you could make:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Paneer Butter Masala (using Paneer and Garam Masala)</li>
                        <li>Jeera Rice (using Basmati Rice and spices)</li>
                        <li>Masala Chai (using Tea leaves and spices)</li>
                      </ul>
                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => setShowMealSuggestions(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {showExpiredFoodAdvice && <ExpiredFoodAdvice onClose={() => setShowExpiredFoodAdvice(false)} />}
            
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
                          onDelete={deleteInventoryItem}
                          onEdit={editInventoryItem}
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
                    {inventoryItems.filter(item => {
                      const daysUntilExpiry = Math.ceil(
                        (item.expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
                      );
                      return daysUntilExpiry >= 0 && daysUntilExpiry <= 3;
                    }).length > 0 ? (
                      inventoryItems
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
                            onDelete={deleteInventoryItem}
                            onEdit={editInventoryItem}
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
                    {inventoryItems.filter(item => 
                      item.expiryDate.getTime() < today.getTime()
                    ).length > 0 ? (
                      inventoryItems
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
                            onDelete={deleteInventoryItem}
                            onEdit={editInventoryItem}
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
          </div>
          
          <div className="md:col-span-1 space-y-6">
            <Card className="p-4">
              <h3 className="font-medium mb-3">Quick Actions</h3>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={handleInventoryReport}>
                  <FileText className="w-4 h-4 mr-2" />
                  Inventory Report
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Voice scanning feature coming soon!")}>
                  <Mic className="w-4 h-4 mr-2" />
                  Voice Scan
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Barcode scanning feature coming soon!")}>
                  <ScanBarcode className="w-4 h-4 mr-2" />
                  Scan Barcode
                </Button>

                <Button variant="outline" className="w-full justify-start" onClick={handleGetMealSuggestions}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.375H3" />
                  </svg>
                  Get Meal Suggestions
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={handleExpiredFoodAdvice}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  Expired Food Advice
                </Button>
              </div>
            </Card>
            
            <Card className="p-4 border-warning/20 bg-warning/5">
              <h3 className="font-medium mb-3">FIFO Reminder</h3>
              <p className="text-sm">
                Remember to follow the First-In, First-Out (FIFO) method when using inventory items. Use oldest stock first to minimize waste.
              </p>
            </Card>
            
            <Card className="p-4 bg-fresh/5 border-fresh/20">
              <CardContent className="p-0">
                <h3 className="font-medium mb-2">Storage Tips</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-fresh/20 p-0.5 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-fresh">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    Store paneer in brine water for longer shelf life
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-fresh/20 p-0.5 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-fresh">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    Store spices in airtight containers away from heat
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-fresh/20 p-0.5 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-fresh">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    Keep coriander in water to extend freshness
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDashboard;
