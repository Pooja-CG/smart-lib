import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      title: 'Advanced Search',
      description: 'Filter books by author, genre, publication date, availability, and ISBN. Get live suggestions as you type.',
    },
    {
      title: 'Book Recommendation System',
      description: 'Get personalized recommendations based on your borrowing history and view top-rated or popular books.',
    },
    {
      title: 'Ratings & Reviews',
      description: 'Rate and review the books you’ve read. Sort books based on ratings and feedback from other readers.',
    },
    {
      title: 'Book Reservation',
      description: 'Reserve unavailable books and receive notifications when they become available. Reservations are valid for 7 days.',
    },
    {
      title: 'User Profile & History',
      description: 'Maintain your profile, view your borrowing history, re-borrow past books, and update your reading progress.',
    },
    {
      title: 'Book Categories & Genres',
      description: 'Browse books by category or genre such as Fiction, Non-Fiction, Literature, Science, and more.',
    },
    {
      title: 'Notifications & Alerts',
      description: 'Get reminders before due dates and alerts for overdue books via pop-ups or email notifications.',
    },
    {
      title: 'Reading Challenges & Badges',
      description: 'Participate in challenges, track reading milestones, and earn badges for your achievements.',
    },
  ];

  return (
    <div className="features-container">
      <h2 className="features-heading">📚 Feature Overview</h2>
      <div className="features-list">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
