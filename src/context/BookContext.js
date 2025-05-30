import React, { createContext, useState, useContext } from 'react';

// 1. Create a context for the borrowed books
const BookContext = createContext();

// 2. Create a provider component
export const BookProvider = ({ children }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [message, setMessage] = useState(""); // Optional: For showing success messages

  // Function to borrow a book
  const borrowBook = (book) => {
    const uniqueBorrowId = Date.now() + Math.random(); // Create a unique ID
    setBorrowedBooks((prevBooks) => [
      ...prevBooks,
      { 
        ...book,
        borrowId: uniqueBorrowId, // Important: use borrowId instead of id
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toDateString(), // 7 days from now
        fine: 0,
        status: 'On Time'
      },
    ]);
    setMessage(`✅ Book "${book.name}" borrowed successfully!`);
    setTimeout(() => setMessage(""), 3000); // Clear message after 3s
  };

  // Function to return a book
  const returnBook = (borrowId) => {
    setBorrowedBooks((prevBooks) =>
      prevBooks.filter((book) => book.borrowId !== borrowId)
    );
    setMessage(`✅ Book returned successfully!`);
    setTimeout(() => setMessage(""), 3000); // Clear message after 3s
  };

  // 3. Provide the state and functions through context
  return (
    <BookContext.Provider value={{ borrowedBooks, borrowBook, returnBook, message }}>
      {children}
    </BookContext.Provider>
  );
};

// 4. Custom hook to use the BookContext in other components
export const useBooks = () => {
  return useContext(BookContext);
};
