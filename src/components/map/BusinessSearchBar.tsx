
import React from 'react';
import { Input } from '@/components/ui/input';

interface BusinessSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const BusinessSearchBar: React.FC<BusinessSearchBarProps> = ({
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 border-b p-4">
      <div className="max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Search for services (barber, salon, massage, gym, etc.)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};
