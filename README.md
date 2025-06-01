SmartLib - Library Management System 📚

Overview

SmartLib is a modern library management system designed to streamline book browsing, borrowing, and management for users. Built with a React front-end and enhanced with efficient data structures and algorithms, SmartLib offers a seamless experience for library users. Key features include an optimized book search using Horspool's algorithm, a Most Recently Used (MRU) book tracking system with a Doubly Linked List and Hash Map, a user-friendly homepage with analytics, and automated email notifications for book borrowing. Deployed on Netlify, SmartLib is ideal for small to medium-sized libraries aiming to digitize their operations. 📖✨

Features

Efficient Book Search 🔍

Search for books by title or author using Horspool's algorithm.
Includes genre filtering for refined search results.
Time Complexity: O(n/m) average case for string matching.
Most Recently Used (MRU) Tracking 🔄
Tracks up to 5 recently viewed books using a Doubly Linked List and Hash Map.
Doubly Linked List: Maintains the order of books (most recent at the start, oldest at the end).
Hash Map: Provides O(1) lookups to check if a book is in the history and access its node.
Displayed in a dedicated "Recently Viewed Books" section for quick access.

User-Friendly Homepage 🏠

Displays analytics, borrowed books preview, featured books, and feature highlights.
Responsive design for a seamless experience across devices.

Borrowing Notifications 📧

Sends automated email notifications to users upon borrowing a book.
Includes details like book title, borrow date, due date (7 days), and return instructions.

Responsive Design 📱

Styled with CSS for a clean and intuitive user interface.
Scalable Architecture 🚀
Front-end focused with potential for backend integration (e.g., for dynamic book data or user authentication).

Technologies Used

Front-End:

React.js: For building the user interface.
React Router: For client-side routing.
CSS: For styling components (e.g., HomePage.css, Books.css).

Data Structures & Algorithms:

Horspool's Algorithm: For efficient book searching in Books.jsx.
Doubly Linked List + Hash Map: For tracking Most Recently Used books with O(1) operations.

Email Notifications:

Python: For sending automated emails (email_notification.py).
smtplib: For SMTP email integration with Gmail.
NLTK: For potential text processing (currently used for generating sample text).


Getting Started

Prerequisites

Node.js (>= 14.0.0) and npm (>= 5.6) for the React front-end.
Python (>= 3.6) for the email notification script.
Git: For version control and deployment.

Installation

Clone the Repository:

git clone https://github.com/Pooja-CG/smart-lib.git
cd smart-lib
Install Front-End Dependencies: Navigate to the smartlib directory and install the required packages:

cd smartlib
npm install



Install Python Dependencies (for email notifications): Install the required Python packages for the email script:

pip install nltk

Then, in a Python shell, download NLTK data (optional if not using generate_text):

import nltk
nltk.download('punkt')
nltk.download('stopwords')

Running the Application Locally
Start the React Front-End:

cd smartlib
npm start
The app will run at http://localhost:3000.

Test the Email Notification:


Open email_notification.py and update the following fields with your email credentials:
sender_email: Your Gmail address (e.g., studysynchub24@gmail.com).
sender_password: Your Gmail App Password (generate this in your Google Account settings under Security > 2-Step Verification > App Passwords).
recipient_email: The recipient’s email address.
Replace placeholders (e.g., [Book Title], [Due Date]) with actual values.

Run the script:

python email_notification.py
Check the recipient email for the borrowing notification. 📬

Usage

Browse Books:

Visit the /books page to view and search for books by title or author.
Use the genre filter to narrow down results.
View Recently Used Books:
See the "Recently Viewed Books" section to quickly access up to 5 of your most recently viewed books.
Clicking a book moves it to the top of the list.

Borrow a Book:

Select a book to borrow (functionality can be extended with a backend).
Receive an email notification with borrowing details and a 7-day return deadline.

Explore the Homepage:

Check analytics, borrowed books, and featured sections for a comprehensive library experience.

Return a Book:

Follow the instructions in the email to return the book within 7 days to avoid late fees.

Project Structure

smartlib/src/component/ui/: Contains reusable UI components (e.g., card).

smartlib/src/Books.jsx: Implements the book search page with Horspool's algorithm and MRU tracking using a Doubly Linked List and Hash Map.

smartlib/src/HomePage.jsx: Renders the homepage with analytics, borrowed books, and feature highlights.

smartlib/src/HomePage.css, Books.css: Styles for the homepage and books page.

email_notification.py: Python script for sending borrowing confirmation emails.

Contact

For questions or feedback, reach out to poojacg48@gmail.com. 📧
