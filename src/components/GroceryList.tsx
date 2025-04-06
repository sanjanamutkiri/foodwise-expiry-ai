
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, ListChecks, Download, Printer } from 'lucide-react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  isChecked: boolean;
  frequency?: number; // How many times it was bought in the past
}

interface FoodItem {
  id: string;
  name: string;
  category: string;
  expiryDate: Date;
  quantity: number;
  unit: string;
}

interface GroceryListProps {
  suggestedItems: GroceryItem[];
  pastPurchases: FoodItem[];
  onAddToInventory?: (items: FoodItem[]) => void;
}

const GroceryList: React.FC<GroceryListProps> = ({ 
  suggestedItems, 
  pastPurchases,
  onAddToInventory
}) => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(suggestedItems);
  
  const toggleItemChecked = (id: string) => {
    setGroceryItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };
  
  const generateList = () => {
    // Get the most frequently purchased items from past purchases
    const frequentItems = pastPurchases.reduce((acc, item) => {
      const existingItem = acc.find(i => i.name.toLowerCase() === item.name.toLowerCase());
      if (existingItem) {
        existingItem.frequency = (existingItem.frequency || 0) + 1;
      } else {
        acc.push({
          id: uuidv4(),
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          isChecked: false,
          frequency: 1
        });
      }
      return acc;
    }, [] as GroceryItem[]);
    
    // Sort by frequency and take top 10
    const topItems = frequentItems
      .sort((a, b) => (b.frequency || 0) - (a.frequency || 0))
      .slice(0, 10);
    
    // Add any existing items that aren't in the top frequent items
    const newList = [...topItems];
    groceryItems.forEach(item => {
      if (!newList.find(i => i.name.toLowerCase() === item.name.toLowerCase())) {
        newList.push(item);
      }
    });
    
    setGroceryItems(newList);
    toast.success("Grocery list generated based on your purchase history!");
  };
  
  const downloadList = () => {
    const listText = groceryItems
      .map(item => `${item.quantity} ${item.unit} ${item.name}`)
      .join('\n');
    
    const element = document.createElement('a');
    const file = new Blob([listText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'grocery_list.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Grocery list downloaded!");
  };
  
  const printList = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>My Grocery List</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { text-align: center; }
              ul { list-style-type: none; padding: 0; }
              li { padding: 8px 0; border-bottom: 1px solid #eee; }
            </style>
          </head>
          <body>
            <h1>My Grocery List</h1>
            <ul>
              ${groceryItems.map(item => `
                <li>
                  <input type="checkbox"> 
                  ${item.quantity} ${item.unit} ${item.name}
                </li>
              `).join('')}
            </ul>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      
      toast.success("Printing grocery list!");
    } else {
      toast.error("Could not open print window. Please check your popup settings.");
    }
  };
  
  const addItemsToInventory = () => {
    if (onAddToInventory) {
      // Convert checked grocery items to food items
      const itemsToAdd = groceryItems
        .filter(item => item.isChecked)
        .map(item => ({
          id: uuidv4(),
          name: item.name,
          category: 'Groceries',
          expiryDate: new Date(new Date().setDate(new Date().getDate() + 14)), // Default 2 weeks expiry
          quantity: item.quantity,
          unit: item.unit
        }));
      
      onAddToInventory(itemsToAdd);
      
      // Uncheck the added items
      setGroceryItems(prev => 
        prev.map(item => item.isChecked ? { ...item, isChecked: false } : item)
      );
      
      toast.success(`Added ${itemsToAdd.length} items to your inventory!`);
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Weekly Grocery List</span>
          <Button onClick={generateList} size="sm" className="h-8">
            <ListChecks className="h-4 w-4 mr-2" />
            Make List
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-2">
            {groceryItems.length > 0 ? (
              groceryItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`item-${item.id}`}
                      checked={item.isChecked}
                      onCheckedChange={() => toggleItemChecked(item.id)}
                    />
                    <label 
                      htmlFor={`item-${item.id}`} 
                      className={`text-sm cursor-pointer ${item.isChecked ? 'line-through text-gray-400' : ''}`}
                    >
                      {item.quantity} {item.unit} {item.name}
                    </label>
                  </div>
                  {item.frequency && (
                    <span className="text-xs text-muted-foreground">
                      Bought {item.frequency} times
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Click "Make List" to generate a grocery list based on your purchase history
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" onClick={downloadList}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button variant="outline" size="sm" onClick={printList}>
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        {onAddToInventory && (
          <Button size="sm" onClick={addItemsToInventory} disabled={!groceryItems.some(item => item.isChecked)}>
            <Plus className="h-4 w-4 mr-2" />
            Add to Inventory
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GroceryList;
