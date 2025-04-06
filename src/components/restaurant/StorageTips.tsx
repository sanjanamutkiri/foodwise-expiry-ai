
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const StorageTips: React.FC = () => {
  return (
    <>
      <Card className="p-4 border-warning/20 bg-warning/5">
        <h3 className="font-medium mb-3">FIFO Reminder</h3>
        <p className="text-sm">
          Remember to follow the First-In, First-Out (FIFO) method when using inventory items. Use oldest stock first to minimize waste.
        </p>
      </Card>
      
      <Card className="p-4 bg-fresh/5 border-fresh/20">
        <CardContent className="p-0">
          <h3 className="font-medium mb-2">Storage Tips</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-fresh/20 p-0.5 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-fresh">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              Store paneer in brine water for longer shelf life
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-fresh/20 p-0.5 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-fresh">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              Store spices in airtight containers away from heat
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-fresh/20 p-0.5 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-fresh">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              Keep coriander in water to extend freshness
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default StorageTips;
