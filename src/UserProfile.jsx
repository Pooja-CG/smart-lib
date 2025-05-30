import React, { useState, useEffect } from 'react';
import './UserProfile.css';

// Function to fetch logged-in user data from the backend
const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await fetch('http://localhost:5000/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return data.user; // Expecting { userId, fullName, email }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return null; // Handle error gracefully
  }
};

// Mock function for search history (unchanged)
const fetchSearchHistory = () => {
  return [
    'The Great Gatsby',
    'To Kill a Mockingbird',
    '1984 by George Orwell',
    'Pride and Prejudice',
    'The Catcher in the Rye',
  ];
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch user data and search history on component mount
  useEffect(() => {
    const loadData = async () => {
      ///bioFetch user data
      const userData = await fetchUserData();
      if (userData) {
        setUser(userData);
      }

      // Fetch search history
      const history = fetchSearchHistory();
      setSearchHistory(history);
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
            {/* Password field removed since it's not returned by the API */}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default UserProfile;