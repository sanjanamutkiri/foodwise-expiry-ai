
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MealSuggestionsProps {
  onClose: () => void;
}

const MealSuggestions: React.FC<MealSuggestionsProps> = ({ onClose }) => {
  return (
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
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealSuggestions;
