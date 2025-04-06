
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';

const VoiceScanPlaceholder: React.FC = () => {
  const handleVoiceScan = () => {
    toast.info("Voice scanning feature coming soon!");
  };

  return (
    <Card className="border-dashed border-2 p-6">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="p-3 bg-muted rounded-full mb-4">
          <Mic className="h-6 w-6 text-muted-foreground" />
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Voice Input</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Add items to your inventory by speaking into your microphone
        </p>
        
        <Button onClick={handleVoiceScan} variant="outline" className="gap-2">
          <Mic className="h-4 w-4" />
          Start Voice Input
        </Button>
      </div>
    </Card>
  );
};

export default VoiceScanPlaceholder;
