import React, { useState } from 'react';
import { Book } from '../types'; // Assuming the Book type is defined here

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book; // Accepting a single book instead of an array of books
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, book }) => {
  if (!isOpen) return null;

  const [idNumber, setIdNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [courseYear, setCourseYear] = useState('');
  const [reason, setReason] = useState('');

  const isFormValid = idNumber.trim() !== '' && fullName.trim() !== '' && courseYear.trim() !== '' && reason.trim() !== '';

  const handleBorrow = () => {
    if (isFormValid) {
      console.log('Borrowing the book:', book);
      onClose(); // Close the modal after borrowing
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Borrow Book</h3>
        <div className="space-y-4">
          <div>
            <label className="text-primary-600 font-medium" htmlFor="idNumber">ID Number:</label>
            <input
              id="idNumber"
              type="text"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>

          <div>
            <label className="text-primary-600 font-medium" htmlFor="fullName">Full Name:</label>
            <input
              id="fullName"
              type="text"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-primary-600 font-medium" htmlFor="courseYear">Course/Year:</label>
            <input
              id="courseYear"
              type="text"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={courseYear}
              onChange={(e) => setCourseYear(e.target.value)}
            />
          </div>

          <div>
            <label className="text-primary-600 font-medium" htmlFor="bookSelection">Select Book to Borrow:</label>
            <p>{book.title} by {book.author}</p> {/* Display the selected book's title and author */}
          </div>

          <div>
            <label className="text-primary-600 font-medium" htmlFor="reason">Reason for Borrowing:</label>
            <textarea
              id="reason"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {(!isFormValid && idNumber || fullName || courseYear || reason) && (
            <div className="text-red-500 text-sm mt-2">
              All fields (ID Number, Full Name, Course/Year, Reason) are required to borrow a book.
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
            Close
          </button>
          <button
            onClick={handleBorrow} // Handle borrow action
            disabled={!isFormValid} // Disable button if form is not valid
            className={`px-4 py-2 rounded-md ${isFormValid ? 'bg-primary-500 text-white' : 'bg-gray-400 text-gray-700'}`}
          >
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
