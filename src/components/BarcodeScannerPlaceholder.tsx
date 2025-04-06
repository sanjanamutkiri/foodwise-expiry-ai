
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';

const BarcodeScannerPlaceholder: React.FC = () => {
  const handleScan = () => {
    toast.info("Barcode scanning feature coming soon!");
  };

  return (
    <Card className="border-dashed border-2 p-6">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="p-3 bg-muted rounded-full mb-4">
          <Camera className="h-6 w-6 text-muted-foreground" />
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Scan Barcode</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Quickly add items by scanning product barcodes
        </p>
        
        <Button onClick={handleScan} variant="outline" className="gap-2">
          <Camera className="h-4 w-4" />
          Scan Barcode
        </Button>
      </div>
    </Card>
  );
};

export default BarcodeScannerPlaceholder;
