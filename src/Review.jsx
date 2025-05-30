import React, { useState } from 'react';
import './Review.css';

const Review = () => {
  // Initial state for reviews and form fields
  const [reviews, setReviews] = useState([
    { book: 'The Alchmeist', username: 'John Doe', rating: 4, message: 'Great book!' },
    { book: '1984', username: 'Jane Smith', rating: 5, message: 'Excellent read, highly recommend it!' },
    { book: 'War and Peace', username: 'Alice Johnson', rating: 3, message: 'Good, but could be better.' },
    { book: 'The Road', username: 'Bob White', rating: 2, message: 'Not my type of book.' },
    { book: 'The Great Gatsby', username: 'Emma Brown', rating: 5, message: 'Loved every page!' },
    { book: 'Pride and Prejudice', username: 'Chris Green', rating: 4, message: 'Interesting but a bit slow.' },
  ]);
  const [newReview, setNewReview] = useState({ book: '', username: '', rating: '', message: '' });
  const [sortOption, setSortOption] = useState('high-to-low');

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new review at the beginning of the array
    setReviews([newReview, ...reviews]);

    // Clear the form after submission
    setNewReview({ book: '', username: '', rating: '', message: '' });
  };

  // Handle sorting option change
  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    // Sort the reviews based on the selected option
    const sortedReviews = [...reviews];
    if (option === 'high-to-low') {
      sortedReviews.sort((a, b) => b.rating - a.rating); // Sort in descending order
    } else {
      sortedReviews.sort((a, b) => a.rating - b.rating); // Sort in ascending order
    }
    setReviews(sortedReviews); // Update the reviews state with the sorted array
  };

  return (
    <div className="review-section">
      <h3>Reviews</h3>

      {/* Sort Options */}
      <div className="sort-options">
        <select onChange={handleSortChange} value={sortOption}>
          <option value="high-to-low">Rating: High to Low</option>
          <option value="low-to-high">Rating: Low to High</option>
        </select>
      </div>

      {/* Review Cards in Grid */}
      <div className="reviews">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <p><strong>Book: {review.book}</strong></p>
            <p><strong>{review.username}</strong></p>
            <p className="rating">Rating: {'⭐'.repeat(review.rating)}</p>
            <p>{review.message}</p>
          </div>
        ))}
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="book"
            placeholder="Book Name"
            value={newReview.book}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Your Name"
            value={newReview.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="rating"
            placeholder="Rating (1 to 5)"
            value={newReview.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
          />
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Write your review..."
            value={newReview.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Review;
