import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Book } from './types';
import CITLogo from './logo/CIT logo.png';

function App() {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const booksRef = collection(db, 'books-collection');
      const qTitle = query(
        booksRef,
        where('title', '>=', searchQuery),
        where('title', '<=', searchQuery + '\uf8ff')
      );

      const qAuthor = query(
        booksRef,
        where('author', '>=', searchQuery),
        where('author', '<=', searchQuery + '\uf8ff')
      );

      const qCallNumber = query(
        booksRef,
        where('callNumber', '>=', searchQuery),
        where('callNumber', '<=', searchQuery + '\uf8ff')
      );

      const querySnapshots = await Promise.all([getDocs(qTitle), getDocs(qAuthor), getDocs(qCallNumber)]);

      const books: Book[] = [];
      querySnapshots.forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const book: Book = {
            id: doc.id,
            title: data.title,
            author: data.author,
            callNumber: data.callNumber || '',
            copyright: data.copyright || '',
            location: data.location || '',
            availability: data.availability || 0,
          };
          if (!books.some((b) => b.id === book.id)) {
            books.push(book);
          }
        });
      });

      setSearchResults(books);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center justify-start p-4 sm:p-6 overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-4 w-full">
        {/* Logo with subtle shadow */}
        <img src={CITLogo} alt="CIT Logo" className="h-16 mx-auto mb-3 shadow-sm" />

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-500">
          CIT Online Public Access Catalog
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-4">
          Explore and manage library resources with CIT’s Online Catalog. Find academic and research materials to support your learning.
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="w-full max-w-lg mx-auto mb-1 shadow-lg rounded-lg px-4 sm:px-6 py-4 sm:py-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Search Results Section */}
      <div className="flex-1 w-full max-w-lg mx-auto mt-2 overflow-y-auto">
        <SearchResults results={searchResults} loading={loading} searched={searched} />
      </div>
    </div>
  );
}

export default App;
