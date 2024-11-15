import React from 'react';
import { Book } from '../types'; // Adjust the path as needed

interface SearchResultsProps {
  results: Book[];
  loading: boolean;
  searched: boolean; // New prop to track if a search was performed
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, loading, searched }) => {
  if (loading) {
    return (
      <div className="w-full mt-8 flex justify-center items-center">
        {/* Centered spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  if (searched && results.length === 0) {
    return <div className="mt-8 text-center text-gray-600">No results found</div>;
  }

  return (
    <div className="w-full mt-8 space-y-6">
      {results.map((book, index) => (
        <div
          key={book.id}
          style={{ animationDelay: `${index * 100}ms` }}
          className="max-w-2xl w-full mx-auto p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-transparent hover:border-primary-200 animate-fade-in"
        >
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1">{book.title}</h3>
          <p className="text-gray-600 text-sm sm:text-base">By {book.author}</p>

          <div className="mt-3 space-y-2 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="text-primary-600 font-medium">Call Number:</span>
              <span className="text-gray-700">{book.callNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-600 font-medium">Copyright:</span>
              <span className="text-gray-700">{book.copyright}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-600 font-medium">Location:</span>
              <span className="text-gray-700">{book.location}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-primary-600 font-medium">Availability:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium
                  ${book.availability > 0
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                  }`}
              >
                {book.availability > 0 ? `${book.availability} Available` : 'Not Available'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
