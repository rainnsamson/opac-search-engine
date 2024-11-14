import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full animate-fade-in">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="w-full px-6 py-4 text-lg text-gray-900 border-2 border-primary-200 
                   rounded-2xl shadow-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-400 
                   transition-all duration-300 ease-in-out bg-white/80 backdrop-blur-sm
                   placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-primary-500
                   hover:text-primary-700 transition-colors duration-200 ease-in-out
                   bg-primary-50 rounded-xl group-hover:bg-primary-100"
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
};