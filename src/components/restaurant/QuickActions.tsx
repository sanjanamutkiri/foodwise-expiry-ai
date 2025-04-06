
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Mic, ScanBarcode } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import VoiceScanPlaceholder from '@/components/VoiceScanPlaceholder';

interface QuickActionsProps {
  handleInventoryReport: () => void;
  handleGetMealSuggestions: () => void;
  handleExpiredFoodAdvice: () => void;
  onAddItem?: (item: any) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  handleInventoryReport, 
  handleGetMealSuggestions,
  handleExpiredFoodAdvice,
  onAddItem
}) => {
  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false);
  
  return (
    <Card className="p-4">
      <h3 className="font-medium mb-3">Quick Actions</h3>
      
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start" onClick={handleInventoryReport}>
          <FileText className="w-4 h-4 mr-2" />
          Inventory Report
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={() => setVoiceDialogOpen(true)}
        >
          <Mic className="w-4 h-4 mr-2" />
          Voice Scan
        </Button>
        
        <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Barcode scanning feature coming soon!")}>
          <ScanBarcode className="w-4 h-4 mr-2" />
          Scan Barcode
        </Button>

        <Button variant="outline" className="w-full justify-start" onClick={handleGetMealSuggestions}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.375H3" />
          </svg>
          Get Meal Suggestions
        </Button>
        
        <Button variant="outline" className="w-full justify-start" onClick={handleExpiredFoodAdvice}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          Expired Food Advice
        </Button>
      </div>
      
      <Dialog open={voiceDialogOpen} onOpenChange={setVoiceDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <VoiceScanPlaceholder onAddItem={onAddItem} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default QuickActions;
