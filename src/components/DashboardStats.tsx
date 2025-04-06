
import React from 'react';

interface DashboardStatsProps {
  totalItems: number;
  expiringSoon: number;
  expired: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ 
  totalItems, 
  expiringSoon, 
  expired 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Items</p>
            <p className="text-2xl font-bold">{totalItems}</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Expiring Soon</p>
            <p className="text-2xl font-bold text-warning">{expiringSoon}</p>
          </div>
          <div className="bg-warning/10 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-warning">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Expired</p>
            <p className="text-2xl font-bold text-expired">{expired}</p>
          </div>
          <div className="bg-expired/10 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-expired">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
