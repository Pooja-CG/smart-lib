import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Books.css';

// Trie Node class
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.bookIndices = []; // Store indices of books that contain this word
  }
}

// Trie class
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word into the Trie
  insert(word, bookIndex) {
    let node = this.root;
    for (let char of word.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEndOfWord = true;
    node.bookIndices.push(bookIndex);
  }

  // Search for words in the Trie that start with the given prefix
  searchPrefix(prefix) {
    let node = this.root;
    for (let char of prefix.toLowerCase()) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char);
    }
    return this.collectBookIndices(node);
  }

  // Collect all book indices under a Trie node (DFS traversal)
  collectBookIndices(node) {
    let bookIndices = [];
    if (node.isEndOfWord) {
      bookIndices.push(...node.bookIndices);
    }
    for (let child of node.children.values()) {
      bookIndices.push(...this.collectBookIndices(child));
    }
    return [...new Set(bookIndices)]; // Remove duplicates
  }
}

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const books = [
    { id: 1, name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction' },
    { id: 2, name: '1984', author: 'George Orwell', genre: 'Dystopian' },
    { id: 3, name: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction' },
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

  // Build Trie when component mounts
  const [trie] = useState(() => {
    const newTrie = new Trie();
    books.forEach((book, index) => {
      // Split book name and author into words and insert into Trie
      const nameWords = book.name.toLowerCase().split(/\s+/);
      const authorWords = book.author.toLowerCase().split(/\s+/);
      nameWords.forEach(word => newTrie.insert(word, index));
      authorWords.forEach(word => newTrie.insert(word, index));
    });
    return newTrie;
  });

  // Search and filter books
  useEffect(() => {
    if (!searchTerm.trim()) {
      // If no search term, show all books (filtered by genre)
      const filtered = books.filter(book =>
        selectedGenre === 'All' || book.genre === selectedGenre
      );
      setFilteredBooks(filtered.map(book => ({ book, score: 0 })));
      return;
    }

    // Search using Trie
    const searchWords = searchTerm.toLowerCase().split(/\s+/);
    let matchedIndices = new Set();

    searchWords.forEach(word => {
      const indices = trie.searchPrefix(word);
      indices.forEach(index => matchedIndices.add(index));
    });

    // Map indices to books, calculate scores, and apply genre filter
    let results = Array.from(matchedIndices).map(index => {
      const book = books[index];
      // Simple scoring: +2 for each word match in name, +1 for each word match in author
      let score = 0;
      const nameLower = book.name.toLowerCase();
      const authorLower = book.author.toLowerCase();
      searchWords.forEach(word => {
        if (nameLower.includes(word)) score += 2;
        if (authorLower.includes(word)) score += 1;
      });
      return { book, score };
    });

    // Apply genre filter
    results = results.filter(({ book }) =>
      selectedGenre === 'All' || book.genre === selectedGenre
    );

    // Sort by score (descending)
    results.sort((a, b) => b.score - a.score);

    setFilteredBooks(results);
  }, [searchTerm, selectedGenre, trie, books]);

  const handleBookClick = (bookId) => {
    setSelectedBookId(bookId);
  };

  return (
    <div className="book-page">
      <h1 className="book-title">📚 Library Books</h1>
      <p className="explore-text">Explore, read, and enjoy!</p>

      <div className="search-filter-section">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Dystopian">Dystopian</option>
          <option value="Adventure">Adventure</option>
          <option value="Historical Fiction">Historical Fiction</option>
          <option value="Romance">Romance</option>
          <option value="Horror">Horror</option>
          <option value="Satire">Satire</option>
          <option value="Philosophical Fiction">Philosophical Fiction</option>
          <option value="Gothic Fiction">Gothic Fiction</option>
          <option value="Epic Poetry">Epic Poetry</option>
          <option value="Memoir">Memoir</option>
        </select>
      </div>

      <div className="book-list">
        {filteredBooks.map(({ book }) => (
          <div
            className={`book-item ${selectedBookId === book.id ? 'selected' : ''}`}
            key={book.id}
            onClick={() => handleBookClick(book.id)}
          >
            <h2 className="book-name">
              <Link to={`/book/${book.id}`} className="book-link">{book.name}</Link>
            </h2>
            <p className="book-author">Author: {book.author}</p>
            <p className="book-genre">Genre: {book.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;