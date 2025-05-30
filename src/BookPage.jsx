import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooks } from './context/BookContext';
import SearchHistory from './SearchHistory'; // Import the new SearchHistory class
import './BookPage.css';

const BookPage = () => {
  const { bookId } = useParams();
  const { borrowBook, returnBook, borrowedBooks, message } = useBooks();
  const [borrowed, setBorrowed] = useState(false);
  const [returnCount, setReturnCount] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [currentBadge, setCurrentBadge] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  // Initialize the SearchHistory instance
  const historyManager = new SearchHistory(5); // Limit to 5 entries

  const books = [
    { id: 1, name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American dream.' },
    { id: 2, name: '1984', author: 'George Orwell', genre: 'Dystopian', description: 'A chilling vision of a totalitarian future.' },
    { id: 3, name: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A tale of racial injustice and moral growth.' },
    { id: 4, name: 'Moby-Dick', author: 'Herman Melville', genre: 'Adventure' },
    { id: 5, name: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction' },
    { id: 6, name: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance' },
    { id: 7, name: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
    { id: 8, name: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
    { id: 9, name: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian' },
    { id: 10, name: 'The Chronicles of Narnia', author: 'C.S. Lewis', genre: 'Fantasy' },
    { id: 11, name: 'War and Peace', author: 'Leo Tolstoy', genre: 'Historical Fiction' },
    { id: 12, name: 'The Picture of Dorian Gray', author: 'Oscar Wilde', genre: 'Philosophical Fiction' },
    { id: 13, name: 'Frankenstein', author: 'Mary Shelley', genre: 'Gothic Fiction' },
    { id: 14, name: 'Dracula', author: 'Bram Stoker', genre: 'Horror' },
    { id: 15, name: 'The Odyssey', author: 'Homer', genre: 'Epic Poetry' },
    { id: 16, name: 'The Road', author: 'Cormac McCarthy', genre: 'Dystopian' },
    { id: 17, name: 'Catch-22', author: 'Joseph Heller', genre: 'Satire' },
    { id: 18, name: 'The Alchemist', author: 'Paulo Coelho', genre: 'Adventure' },
    { id: 19, name: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', genre: 'Non-Fiction' },
    { id: 20, name: 'Educated', author: 'Tara Westover', genre: 'Memoir' },
  ];
  const book = books.find(b => b.id === parseInt(bookId));

  useEffect(() => {
    // Check if the book is borrowed
    const isBorrowed = borrowedBooks.some(b => b.id === book?.id);
    setBorrowed(isBorrowed);

    // Load return count from localStorage
    const savedCount = localStorage.getItem('returnCount');
    if (savedCount) {
      setReturnCount(parseInt(savedCount));
    }

    // Load search history on component mount
    historyManager.loadFromLocalStorage();
    setSearchHistory(historyManager.getHistory());

    // Add the current book to search history if a book is found
    if (book) {
      historyManager.add(book.name);
      setSearchHistory(historyManager.getHistory());
    }
  }, [borrowedBooks, book]);

  const handleBorrow = () => {
    borrowBook(book);
    setBorrowed(true);
  };

  const handleReturn = () => {
    returnBook(book.id);
    setBorrowed(false);

    const newCount = returnCount + 1;
    setReturnCount(newCount);
    localStorage.setItem('returnCount', newCount);

    let badgeMessage = '';
    if (newCount === 1) {
      badgeMessage = '🎉 You earned the First Return badge!';
    } else if (newCount === 2) {
      badgeMessage = '✨ Impressive! You returned the second book too. Keep going!';
    } else if (newCount === 3) {
      badgeMessage = '🔥 Third book returned! You’re building an amazing reading streak!';
    } else if (newCount >= 4 && newCount <= 5) {
      badgeMessage = `🌟 You've returned ${newCount} books! You're becoming a reading pro!`;
    } else if (newCount > 5) {
      badgeMessage = `🏆 Incredible! ${newCount} returns — you're unstoppable!`;
    }

    setCurrentBadge(badgeMessage);
    setShowBadge(true);
  };

  if (!book) {
    return (
      <div className="book-container">
        <h2>Book not found</h2>
        <Link to="/books" className="back-link">← Back to Books List</Link>
      </div>
    );
  }

  return (
    <div className="book-container">
      <div className="book-card">
        <h2 className="book-title">{book.name}</h2>
        <p className="book-author">by {book.author}</p>
        <p className="book-genre">Genre: {book.genre}</p>
        <p className="book-description">{book.description}</p>

        <div className="book-actions">
          {!borrowed ? (
            <button className="borrow-button" onClick={handleBorrow}>Borrow</button>
          ) : (
            <button className="return-button" onClick={handleReturn}>Return</button>
          )}
        </div>

        {message && <p className="success-message">{message}</p>}

        {/* Floating Notification */}
        {showBadge && currentBadge && (
          <div className="badge-popup">
            <h3>🏅 Congratulations!</h3>
            <p>{currentBadge}</p>
            <button className="close-button" onClick={() => setShowBadge(false)}>Close</button>
          </div>
        )}

        <Link to="/books" className="back-link">← Back to Books List</Link>
      </div>

      {/* Search History Section */}
      <div className="search-history-card">
        <h2 className="section-title">Recent Book Views</h2>
        {searchHistory.length > 0 ? (
          <ul className="search-history-list">
            {searchHistory.map((bookName, index) => (
              <li key={index} className="search-history-item">
                {bookName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-history">No recent views available.</p>
        )}
      </div>
    </div>
  );
};

export default BookPage;