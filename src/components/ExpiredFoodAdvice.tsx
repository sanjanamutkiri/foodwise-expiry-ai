
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExpiredFoodAdviceProps {
  onClose: () => void;
}

const ExpiredFoodAdvice: React.FC<ExpiredFoodAdviceProps> = ({ onClose }) => {
  return (
    <Card className="my-6">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3">What to Do with Expired Food</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Composting</h4>
            <p className="text-sm text-muted-foreground">
              Most expired vegetables, fruits, and plant-based foods can be turned into compost, 
              creating nutrient-rich soil for your garden.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium">Animal Feed</h4>
            <p className="text-sm text-muted-foreground">
              Certain expired items like bread, vegetables, and fruit can be used as animal feed
              for chickens or livestock (ensure it's not moldy or spoiled).
            </p>
          </div>
          
          <div>
            <h4 className="font-medium">Fertilizer</h4>
            <p className="text-sm text-muted-foreground">
              Coffee grounds, egg shells, and vegetable scraps can be directly added to soil 
              as fertilizer for your plants.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium">Cooking Ingredients</h4>
            <p className="text-sm text-muted-foreground">
              Slightly expired milk can be used for making paneer or curd. 
              Stale bread can be transformed into breadcrumbs or bread pakoras.
            </p>
          </div>
          
          <div className="pt-2">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpiredFoodAdvice;
