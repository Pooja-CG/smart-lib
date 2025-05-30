import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookProvider } from "./context/BookContext";

// Import your pages
import HomePage from "./HomePage";
import Register from "./Register";
import Login from "./Login";
import Books from "./Books";
import BookPage from "./BookPage";
import Dashboard from "./Dashboard";
import Contact from "./Contact";
import Reviews from "./Review"; // Note: File name says "Review" but route says "reviews"
import Features from './Features';
import UserProfile from './UserProfile';
import "./App.css";

function App() {
  return (
    <BookProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:bookId" element={<BookPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/features" element={<Features />} />
           <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </Router>
    </BookProvider>
  );
}

export default App;