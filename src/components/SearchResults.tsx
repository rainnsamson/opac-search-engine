import React, { useState } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
  callNumber: string;
  copyright: string;
  location: string;
  availability: number; // This will store the number of available copies
}

interface SearchResultsProps {
  results: Book[];
  loading: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, loading }) => {
  const [searched, setSearched] = useState(false); // Track whether a search has been performed

  // Effect to set searched to true when the results change (i.e., after a search is performed)
  React.useEffect(() => {
    if (!loading) {
      setSearched(true); // Mark as searched when loading is finished
    }
  }, [results, loading]);

  if (loading) {
    return (
      <div className="w-full mt-8 animate-fade-in">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Show 'No results found' only if the user has searched and no results are found
  if (searched && results.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div className="w-full mt-8 space-y-4 animate-fade-in">
      {results.map((book, index) => (
        <div
          key={book.id}
          style={{ animationDelay: `${index * 100}ms` }}
          className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg 
                   hover:shadow-xl transition-all duration-300 ease-in-out
                   border-2 border-transparent hover:border-primary-200
                   animate-fade-in"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h3>
          <p className="text-gray-600 text-lg">By {book.author}</p>
          <div className="mt-4 space-y-2">
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
            {/* Display Availability */}
            <div className="flex justify-between items-center">
              <span className="text-primary-600 font-medium">Availability:</span>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium
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
