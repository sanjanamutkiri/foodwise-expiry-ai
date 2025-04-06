
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface FoodItemProps {
  id: string;
  name: string;
  category: string;
  expiryDate: Date;
  quantity: number;
  unit?: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const FoodItemCard: React.FC<FoodItemProps> = ({
  id,
  name,
  category,
  expiryDate,
  quantity,
  unit = 'units',
  onDelete,
  onEdit
}) => {
  // Calculate days until expiry
  const today = new Date();
  const timeDiff = expiryDate.getTime() - today.getTime();
  const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  // Define status based on days until expiry
  let status: 'fresh' | 'warning' | 'expired' = 'fresh';
  if (daysUntilExpiry < 0) {
    status = 'expired';
  } else if (daysUntilExpiry < 3) {
    status = 'warning';
  }
  
  // Status text and color mapping
  const statusConfig = {
    fresh: { text: `${daysUntilExpiry} days left`, bgColor: 'bg-fresh/10', textColor: 'text-fresh' },
    warning: { text: `${daysUntilExpiry} days left`, bgColor: 'bg-warning/10', textColor: 'text-warning' },
    expired: { text: 'Expired', bgColor: 'bg-expired/10', textColor: 'text-expired' },
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-gray-500 mb-2">{category}</p>
          </div>
          
          <Badge variant="outline" className={`${statusConfig[status].bgColor} ${statusConfig[status].textColor} border-0`}>
            {statusConfig[status].text}
          </Badge>
        </div>
        
        <div className="flex items-center mt-3">
          <p className="text-sm">
            <span className="font-medium">{quantity}</span> {unit}
          </p>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => onEdit && onEdit(id)}
          >
            <Edit className="mr-1 h-4 w-4" />
            Edit
          </Button>
          
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-gray-500 hover:text-destructive"
            onClick={() => onDelete && onDelete(id)}
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FoodItemCard;
