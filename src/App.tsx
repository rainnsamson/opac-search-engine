import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Book } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'; // Importing the book icon

function App() {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
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

      const querySnapshots = await Promise.all([
        getDocs(qTitle),
        getDocs(qAuthor),
        getDocs(qCallNumber),
      ]);

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

  const handleBorrow = () => {
    console.log('Borrow button clicked');
    // Add logic to handle borrowing here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      
      {/* Navbar Section */}
      <nav className="bg-blue-600 text-white p-4 fixed w-full top-0 left-0 z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold">CIT Online Public Access Catalog</h1>
            <p className="text-sm">Discover our vast collection of books</p>
          </div>

          {/* Borrow Button */}
          <button
            onClick={handleBorrow}
            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition duration-200 flex items-center justify-center"
            title="Borrow a Book"
          >
            <FontAwesomeIcon icon={faBookOpen} className="text-xl" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20"> {/* Added padding to avoid navbar overlap */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
            <SearchResults results={searchResults} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
