import React from 'react';
import './Contact.css';  // Import the CSS for styling

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Contact Header */}
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>If you have any questions or need assistance, feel free to reach out to us. We're here to help!</p>
      </div>

      {/* Contact Page Layout */}
      <div className="container">
        {/* Left Column: Contact Details */}
        <div className="contact-details">
          <h3> 📍 Our Office</h3>
          <p><i className="fas fa-map-marker-alt"></i> Smartlib, Bengaluru</p>
          <h3> ✉️  Email</h3>
          <p><i className="fas fa-envelope"></i> smartlib@gmail.com</p>
          <h3> 📞 Phone</h3>
          <p><i className="fas fa-phone-alt"></i> 8976543214</p>

        </div>

        {/* Right Column: Contact Form */}
        <div className="contact-form">
          <h3>Send Us a Message</h3>
          <form>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
