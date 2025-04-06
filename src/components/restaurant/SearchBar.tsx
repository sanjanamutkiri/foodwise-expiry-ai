
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import AddFoodItemForm from '@/components/AddFoodItemForm';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddItem: (item: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onAddItem }) => {
  return (
    <div className="flex items-center gap-2 w-full md:w-auto">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search inventory..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <AddFoodItemForm onAddItem={onAddItem} />
    </div>
  );
};

export default SearchBar;
