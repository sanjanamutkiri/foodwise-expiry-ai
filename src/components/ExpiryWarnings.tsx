
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ExpiryItem {
  id: string;
  name: string;
  daysLeft: number;
}

interface ExpiryWarningsProps {
  items: ExpiryItem[];
}

const ExpiryWarnings: React.FC<ExpiryWarningsProps> = ({ items }) => {
  if (!items.length) {
    return null;
  }

  return (
    <Card className="border-warning/20 bg-warning/5">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-warning">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          Expiring Soon
        </h3>
        
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span className="font-medium">{item.name}</span>
              <Badge variant="outline" className="bg-warning/10 text-warning border-0">
                {item.daysLeft === 0 ? 'Today' : 
                  item.daysLeft === 1 ? 'Tomorrow' : 
                  `${item.daysLeft} days`}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpiryWarnings;
