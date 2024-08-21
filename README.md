URL Metadata Fetcher

Overview
URL Metadata Fetcher is a MERN stack application designed to fetch and display metadata from a list of URLs. The app features CSRF token validation for enhanced security and includes rate limiting to control the frequency of requests. Users can fetch metadata from 3 to 10 URLs per request.

Features
Fetch metadata (title, description, etc.) from multiple URLs
CSRF token validation for secure requests
Rate limiting to manage request frequency
Flexible URL input (3 to 10 URLs)
Technologies Used
Express: Server framework for handling API requests and responses
React: Frontend framework for building the user interface
Node.js: JavaScript runtime for server-side logic
Getting Started
Prerequisites
Node.js and npm (or yarn) installed
Basic knowledge of JavaScript, React, and Express
Installation
Clone the repository:

### git clone https://github.com/yourusername/url-metadata-fetcher.git

### cd url-metadata-fetcher

Install server dependencies:

### cd backend

### npm install

Install client dependencies:

### cd ../frontend

### npm install

Setup environment variables:

Create a .env file in the frontend directory with the following content:

REACT_APP_API_HOST

Start the server:

### cd server

### npm start

Start the client:

### cd ../frontend

npm start

Usage

Access the application:

Open your web browser and navigate to http://localhost:3000 to access the app.

Fetch Metadata:

Enter 3 to 10 URLs in the provided input field.
Submit the form to fetch metadata from the specified URLs.
The app will display metadata such as title, description, and more for each URL.
CSRF Token Validation
To enhance security, the app includes CSRF token validation. Ensure that the CSRF token is included in the headers of your requests. The token is automatically handled by the client-side React application.

Rate Limiting
To prevent abuse, the app enforces rate limits on requests. Ensure you do not exceed the maximum request frequency allowed. The default rate limit settings can be adjusted in the server/config/rateLimit.js file.

API Endpoints
POST /api/fetch-metadata - Fetch metadata from the specified URLs
Request Body: { urls: [array of URLs] }
Response: Metadata information for the provided URLs
Troubleshooting
Client Issues: Inspect browser console for JavaScript errors. Verify that the React application is correctly configured.
Contributing
Contributions are welcome! Please follow the standard GitHub workflow for submitting issues and pull requests. Ensure your code adheres to the project's coding standards and includes appropriate tests.
