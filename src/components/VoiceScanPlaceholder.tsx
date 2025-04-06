
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface VoiceScanPlaceholderProps {
  onAddItem?: (item: {
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
  'Spices',
  'Herbs & Greens',
  'Grains & Rice',
  'Other'
];

// Helper function to determine the most likely category based on the food name
const determineFoodCategory = (foodName: string): string => {
  const lowerCaseName = foodName.toLowerCase();
  
  // Common Indian food categories mapping
  if (/rice|basmati|pulao|biryani/.test(lowerCaseName)) return 'Grains & Rice';
  if (/paneer|milk|curd|yogurt|ghee|butter|cheese/.test(lowerCaseName)) return 'Dairy & Eggs';
  if (/chicken|mutton|fish|prawn|egg/.test(lowerCaseName)) return 'Meat & Seafood';
  if (/onion|tomato|potato|carrot|cucumber|capsicum|beetroot|coriander/.test(lowerCaseName)) return 'Fruits & Vegetables';
  if (/cumin|coriander|turmeric|garam masala|cardamom|clove|cinnamon/.test(lowerCaseName)) return 'Spices';
  if (/bread|naan|paratha|roti/.test(lowerCaseName)) return 'Bakery';
  if (/tea|coffee|juice|water|soda|soft drink/.test(lowerCaseName)) return 'Beverages';
  if (/biscuit|cookie|chips|mixture|snack/.test(lowerCaseName)) return 'Snacks';
  if (/oil|sauce|chutney|pickle|paste/.test(lowerCaseName)) return 'Condiments';
  if (/mint|coriander|fenugreek|curry leaf/.test(lowerCaseName)) return 'Herbs & Greens';
  if (/dal|lentil|pulses|beans|chickpea/.test(lowerCaseName)) return 'Pantry Items';
  
  // Default category
  return 'Other';
};

const VoiceScanPlaceholder: React.FC<VoiceScanPlaceholderProps> = ({ onAddItem }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  
  useEffect(() => {
    // Check if browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Speech recognition is not supported in this browser');
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-IN'; // Set language to English (India)
    
    recognitionInstance.onresult = (event) => {
      const current = event.resultIndex;
      const speechResult = event.results[current][0].transcript;
      setTranscript(speechResult);
      processVoiceInput(speechResult);
    };
    
    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      toast.error(`Error: ${event.error}`);
      setIsListening(false);
    };
    
    recognitionInstance.onend = () => {
      setIsListening(false);
    };
    
    setRecognition(recognitionInstance);
    
    return () => {
      // Clean up
      if (recognition) {
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
      }
    };
  }, []);
  
  const processVoiceInput = async (input: string) => {
    setIsProcessing(true);
    
    try {
      // Simple parsing for food items
      // Format expected: "<quantity> <unit> <food name>"
      // Example: "2 kg tomatoes" or "500 g paneer"
      
      const words = input.trim().toLowerCase().split(' ');
      
      // Try to extract quantity, unit, and food name
      let quantity = 1;
      let unit = 'pcs';
      let foodName = '';
      
      // Check if first word is a number
      if (!isNaN(parseFloat(words[0]))) {
        quantity = parseFloat(words[0]);
        
        // Check if second word could be a unit
        const possibleUnit = words[1];
        const validUnits = ['kg', 'g', 'pcs', 'pieces', 'piece', 'ml', 'l', 'liters', 'tbsp', 'tsp', 'cups', 'dozen'];
        
        if (validUnits.includes(possibleUnit) || 
            validUnits.some(u => possibleUnit.includes(u))) {
          unit = possibleUnit;
          foodName = words.slice(2).join(' ');
        } else {
          foodName = words.slice(1).join(' ');
        }
      } else {
        // No quantity specified, assume it's just the food name
        foodName = input;
      }
      
      // Normalize units
      if (['piece', 'pieces'].includes(unit)) unit = 'pcs';
      if (unit === 'liters') unit = 'l';
      
      // Capitalize food name
      foodName = foodName.charAt(0).toUpperCase() + foodName.slice(1);
      
      // Determine category based on food name
      const category = determineFoodCategory(foodName);
      
      // Set expiry date to 7 days from now (default)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      
      // Add the item to inventory
      if (onAddItem) {
        onAddItem({
          name: foodName,
          category,
          expiryDate,
          quantity,
          unit
        });
        
        toast.success(`Added ${quantity} ${unit} of ${foodName}`);
      } else {
        toast.info(`Detected: ${quantity} ${unit} of ${foodName} (${category})`);
        toast.error('Could not add item to inventory - no handler provided');
      }
      
    } catch (error) {
      console.error('Error processing voice input:', error);
      toast.error('Failed to process voice input. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleVoiceScan = () => {
    if (!recognition) {
      toast.error('Speech recognition is not available');
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognition.start();
      setIsListening(true);
      toast.info('Listening... Say food item details');
    }
  };

  return (
    <Card className="border-dashed border-2 p-6">
      <div className="flex flex-col items-center justify-center text-center">
        <div className={`p-3 rounded-full mb-4 ${isListening ? 'bg-red-100 animate-pulse' : 'bg-muted'}`}>
          {isListening ? (
            <Mic className="h-6 w-6 text-red-500" />
          ) : (
            <Mic className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Voice Input</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Add items to your inventory by speaking into your microphone
        </p>
        
        {transcript && (
          <div className="mb-4 p-2 bg-muted rounded-md w-full">
            <p className="text-sm"><strong>Heard:</strong> {transcript}</p>
          </div>
        )}
        
        <Button 
          onClick={handleVoiceScan} 
          variant={isListening ? "destructive" : "outline"} 
          className="gap-2"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : isListening ? (
            <>
              <MicOff className="h-4 w-4" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" />
              Start Voice Input
            </>
          )}
        </Button>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <p>Try saying: "2 kg tomatoes" or "500 g paneer"</p>
        </div>
      </div>
    </Card>
  );
};

export default VoiceScanPlaceholder;
