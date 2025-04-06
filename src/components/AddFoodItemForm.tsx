
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

interface AddFoodItemFormProps {
  onAddItem: (item: {
    name: string;
    category: string;
    expiryDate: Date;
    quantity: number;
    unit: string;
  }) => void;
}

const foodCategories = [
  'Fruits & Vegetables',
  'Dairy & Eggs',
  'Meat & Seafood',
  'Bakery',
  'Pantry Items',
  'Frozen Food',
  'Beverages',
  'Snacks',
  'Condiments',
  'Other'
];

const unitOptions = ['pcs', 'kg', 'g', 'l', 'ml', 'tbsp', 'tsp', 'cups', 'dozen'];

const AddFoodItemForm: React.FC<AddFoodItemFormProps> = ({ onAddItem }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('pcs');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !category || !expiryDate) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const newItem = {
      name,
      category,
      expiryDate: new Date(expiryDate),
      quantity,
      unit
    };
    
    onAddItem(newItem);
    toast.success(`${name} added successfully`);
    
    // Reset form and close dialog
    setName('');
    setCategory('');
    setExpiryDate('');
    setQuantity(1);
    setUnit('pcs');
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={16} /> Add Food Item
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new food item</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Milk, Apples, Chicken Breast"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {foodCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="unit">Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  {unitOptions.map(u => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button type="submit">Add Item</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFoodItemForm;
