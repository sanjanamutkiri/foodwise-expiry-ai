
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FoodItemCard from '@/components/FoodItemCard';

interface InventoryListProps {
  filteredItems: any[];
  inventoryItems: any[];
  today: Date;
  deleteInventoryItem: (id: string) => void;
  editInventoryItem: (id: string) => void;
  expiringSoon: number;
  expired: number;
}

const InventoryList: React.FC<InventoryListProps> = ({ 
  filteredItems, 
  inventoryItems, 
  today, 
  deleteInventoryItem, 
  editInventoryItem,
  expiringSoon,
  expired
}) => {
  return (
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
  );
};

export default InventoryList;
