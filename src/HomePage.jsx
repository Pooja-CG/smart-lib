import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useBooks } from './context/BookContext';
import './HomePage.css';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState('');
  const { borrowedBooks } = useBooks();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUsername('User');
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError('');
    setSearchResults([]);

    if (!searchQuery.trim()) {
      setSearchError('Please enter a search query');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/books/search', {
        params: { query: searchQuery },
      });

      if (response.data.success) {
        setSearchResults(response.data.books);
      } else {
        setSearchError(response.data.message || 'No books found');
      }
    } catch (err) {
      console.error('Search error:', err);
      setSearchError(err.response?.data?.message || err.message || 'Failed to search books');
    }
  };

  const featureHighlights = [
    {
      title: 'Advanced Search',
      description: 'Filter books by author, genre, and more with live suggestions.',
      icon: '🔍',
    },
    {
      title: 'Book Recommendation System',
      description: 'Get personalized recommendations based on your history.',
      icon: '📖',
    },
    {
      title: 'Notifications & Alerts',
      description: 'Stay informed with due date reminders and overdue alerts.',
      icon: '🔔',
    },
  ];

  return (
    <div className="homepage-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">📚 SmartLib</h1>
          <nav className="main-navigation">
            <Link to="/" className="nav-button">Home</Link>
            <Link to="/books" className="nav-button">Books</Link>
            <Link to="/dashboard" className="nav-button">Dashboard</Link>
            <Link to="/features" className="nav-button">Features</Link>
            <Link to="/reviews" className="nav-button">Reviews</Link>
            <Link to="/contact" className="nav-button">Contact</Link>

            <div className="auth-buttons">
              <Link to="/login" className="nav-button auth">Login</Link>
              <Link to="/register" className="nav-button auth">Register</Link>
              <Link to="/userprofile" className="nav-button">User</Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="homepage-main">
        {username && (
          <section className="greeting-section">
            {/* Empty section as per original code */}
          </section>
        )}

        <section className="welcome-section">
          <h2>
            Welcome to <span className="highlight">SmartLib 📚</span>
          </h2>
          <p>
            Your intelligent library companion — manage books, track
            analytics, and explore with ease!
          </p>
        </section>

        <section className="analytics-section">
          <h3>Analytics</h3>
          <p>
            Track library statistics, usage patterns, and generate insights
            using advanced data analysis.
          </p>
          <div className="cards-grid">
            <div className="card">
              <h4>Total Books</h4>
              <p className="number">8,942</p>
              <span className="positive">+3.2% from last month</span>
            </div>
            <div className="card">
              <h4>Active Members</h4>
              <p className="number">2,834</p>
              <span className="positive">+5.1% from last month</span>
            </div>
            <div className="card">
              <h4>Checkouts Today</h4>
              <p className="number">147</p>
              <span className="negative">-2.3% from yesterday</span>
            </div>
            <div className="card">
              <h4>Overdue Returns</h4>
              <p className="number">38</p>
              <span className="positive">-8.4% from last week</span>
            </div>
          </div>
        </section>

        {username && (
          <section className="borrowed-books-preview">
            <h3>Your Borrowed Books</h3>
            <p>Keep track of your borrowed books and due dates.</p>
            {borrowedBooks.length > 0 ? (
              <>
                <table className="borrowed-books-table">
                  <thead>
                    <tr>
                      <th>Book</th>
                      <th>Author</th>
                      <th>Due Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowedBooks.slice(0, 3).map((book, index) => (
                      <tr key={index} className={book.status === "Overdue" ? "overdue-row" : ""}>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.dueDate}</td>
                        <td>
                          <span className={`status-badge ${book.status.toLowerCase()}`}>
                            {book.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Link to="/dashboard" className="view-dashboard-button">
                  View Full Dashboard
                </Link>
              </>
            ) : (
              <p className="no-books-message">📚 You haven’t borrowed any books yet.</p>
            )}
          </section>
        )}

        <section className="featured-books-section">
          <h3>Featured Books</h3>
          <div className="books-grid">
            <div className="book-card">
              <h4>The Great Gatsby</h4>
              <p>F. Scott Fitzgerald</p>
              <p className="description">A classic novel about the American Dream.</p>
            </div>
            <div className="book-card">
              <h4>To Kill a Mockingbird</h4>
              <p>Harper Lee</p>
              <p className="description">A powerful story of justice and morality.</p>
            </div>
            <div className="book-card">
              <h4>1984</h4>
              <p>George Orwell</p>
              <p className="description">A dystopian tale of surveillance and control.</p>
            </div>
          </div>
          <Link to="/books" className="view-more-button">View More Books</Link>
        </section>

        <section className="feature-highlights-section">
          <h3>Feature Highlights</h3>
          <p>Discover what makes SmartLib special.</p>
          <div className="features-grid">
            {featureHighlights.map((feature, index) => (
              <div key={index} className="feature-card">
                <span className="feature-icon">{feature.icon}</span>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
          <Link to="/features" className="view-all-features-button">
            See All Features
          </Link>
        </section>

        <section className="events-section">
          <h3>Upcoming Events</h3>
          <p>Stay updated with our latest library events and workshops!</p>
          <ul className="events-list">
            <li>
              <strong>Book Reading Club</strong> - May 20, 2025
              <p>Join us for a discussion on classic literature.</p>
            </li>
            <li>
              <strong>Author Meet & Greet</strong> - June 5, 2025
              <p>Meet your favorite authors and get signed copies!</p>
            </li>
            <li>
              <strong>Library Workshop</strong> - June 15, 2025
              <p>Learn how to use SmartLib’s advanced features.</p>
            </li>
          </ul>
        </section>

        <section className="testimonials-section">
          <h3>What Our Users Say</h3>
          <p>Hear from our community of book lovers and library members.</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"SmartLib has made managing my reading list so easy! I love the analytics feature."</p>
              <h4>- Sarah K.</h4>
            </div>
            <div className="testimonial-card">
              <p>"The search functionality is fantastic. I found all my favorite books in seconds!"</p>
              <h4>- John D.</h4>
            </div>
            <div className="testimonial-card">
              <p>"The events at SmartLib are amazing. I attended a workshop and learned so much!"</p>
              <h4>- Emily R.</h4>
            </div>
          </div>
        </section>

        <section className="quick-links-section">
          <h3>Quick Links</h3>
          <p>Explore key features of SmartLib to enhance your library experience.</p>
          <div className="quick-links-grid">
            <Link to="/dashboard" className="quick-link-button">View Your Dashboard</Link>
            <Link to="/features" className="quick-link-button">Discover Features</Link>
            <Link to="/books" className="quick-link-button">Browse Books</Link>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2025 SmartLib. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;