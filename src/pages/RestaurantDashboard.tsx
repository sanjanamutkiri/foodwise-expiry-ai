
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
import { Search } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Mock data for initial restaurant inventory state
const initialInventoryItems = [
  {
    id: uuidv4(),
    name: 'Chicken Thighs',
    category: 'Meat & Seafood',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    quantity: 5,
    unit: 'kg'
  },
  {
    id: uuidv4(),
    name: 'Heavy Cream',
    category: 'Dairy & Eggs',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    quantity: 2,
    unit: 'l'
  },
  {
    id: uuidv4(),
    name: 'Bell Peppers',
    category: 'Fruits & Vegetables',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 4)),
    quantity: 3,
    unit: 'kg'
  },
  {
    id: uuidv4(),
    name: 'Salmon Fillets',
    category: 'Meat & Seafood',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    quantity: 2,
    unit: 'kg'
  },
  {
    id: uuidv4(),
    name: 'Mixed Greens',
    category: 'Fruits & Vegetables',
    expiryDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    quantity: 1,
    unit: 'kg'
  },
  {
    id: uuidv4(),
    name: 'Tomato Sauce',
    category: 'Pantry Items',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    quantity: 10,
    unit: 'l'
  }
];

const RestaurantDashboard = () => {
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [searchQuery, setSearchQuery] = useState('');
  
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
                <Button variant="outline" className="w-full justify-start" onClick={() => alert('Feature coming soon!')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                  Scan Invoice
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={() => alert('Feature coming soon!')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  Scan Barcode
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={() => alert('Feature coming soon!')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                  Inventory Report
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
                    Store dairy products at the back of the refrigerator
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-fresh/20 p-0.5 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-fresh">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    Keep raw meats on the bottom shelf
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-fresh/20 p-0.5 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-fresh">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    Rotate freezer items regularly
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
