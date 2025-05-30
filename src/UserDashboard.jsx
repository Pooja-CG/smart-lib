import React, { useState, useEffect } from 'react';
import SearchHistory from './SearchHistory'; // Import the new SearchHistory class
import './UserProfile.css';

// Function to fetch logged-in user data from the backend
const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await fetch('http://localhost:5000/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return data.user;
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return null;
  }
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // Initialize the SearchHistory instance
  const historyManager = new SearchHistory(5); // Limit to 5 entries

  useEffect(() => {
    const loadData = async () => {
      // Fetch user data
      const userData = await fetchUserData();
      if (userData) {
        setUser(userData);
      }

      // Load search history
      historyManager.loadFromLocalStorage();
      setSearchHistory(historyManager.getHistory());
    };

    loadData();
  }, []);

  if (!user) {
    return <div>Loading... (Please ensure you are logged in)</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="profile-title">User Profile</h1>

        {/* Profile Section */}
        <div className="profile-card">
          <div className="profile-icon">
            <img
              src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
              alt="User Profile"
            />
          </div>
          <h2 className="section-title">Account Details</h2>
          <div className="profile-info">
            <p>
              <strong>User ID:</strong> {user.userId}
            </p>
            <p>
              <strong>Name:</strong> {user.fullName || 'N/A'}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>

        {/* Search History Section */}
        <div className="search-history-card">
          <h2 className="section-title">Book Search History</h2>
          {searchHistory.length > 0 ? (
            <ul className="search-history-list">
              {searchHistory.map((book, index) => (
                <li key={index} className="search-history-item">
                  {book}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-history">No search history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;