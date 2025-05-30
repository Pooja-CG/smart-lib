// pages/Dashboard.jsx
import React from "react";
import { useBooks } from "./context/BookContext"; // Import the context
import "./Dashboard.css";

const Dashboard = () => {
  const { borrowedBooks, returnBook, message } = useBooks(); // Access context

  const handleReturn = (borrowId, bookName) => {
    returnBook(borrowId); // Return the book by borrowId
  };

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      <p className="dashboard-subtitle">Track your borrowed books, due dates, and fines.</p>

      {/* Success Message after Borrow or Return */}
      {message && <p className="success-message">{message}</p>}

      {borrowedBooks.length > 0 ? (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Book</th>
              <th>Author</th>
              <th>Due Date</th>
              <th>Fine</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book, index) => (
              <tr key={index} className={book.status === "Overdue" ? "overdue-row" : ""}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.dueDate}</td>
                <td>₹{book.fine}</td>
                <td>
                  <span className={`status-badge ${book.status.toLowerCase()}`}>{book.status}</span>
                </td>
                <td>
                  <button 
                    className="return-button" 
                    onClick={() => handleReturn(book.borrowId, book.name)}
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-books-message">📚 No borrowed books currently.</p>
      )}
    </div>
  );
};

export default Dashboard;
