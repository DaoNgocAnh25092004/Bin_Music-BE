# Bin Music

## Overview

This Music Website is a platform designed to provide users with an interactive and enjoyable experience for exploring, discovering, and listening to music. It features a modern design, responsive layout, and various functionalities to enhance user engagement.

---

## Features

### User Features:

1. **Browse Music:** Explore a vast collection of music categorized by genre, artist, album, or mood.
2. **Search Functionality:** Quickly find your favorite songs, artists, or albums using a powerful search engine.
3. **Playlist Creation:** Create and manage personalized playlists.
4. **Music Player:** A seamless music player with features like play, pause, next, previous, and shuffle.
5. **User Authentication:** Secure login and registration with options for Google or Facebook integration.

### Admin Features:

1. **Content Management:** Add, update, or remove music, artists, and albums.
2. **User Management:** Manage registered users and their permissions.
3. **Analytics Dashboard:** View insights about user engagement and popular tracks.

---

## Technologies Used

### Frontend:

- **HTML5 & CSS3:** For structuring and styling the website.
- **JavaScript (React.js):** For building the user interface.
- **Redux:** For state management.
- **Axios:** For API calls.

### Backend:

- **Node.js (Express):** For server-side logic and APIs.
- **MongoDB:** For storing user data and music library.
- **JWT (JSON Web Tokens):** For authentication.

### Additional Tools:

- **HeidiSQL & MariaDB:** For relational database features (if applicable).
- **Cloudinary:** For storing and managing media files.

---

## Installation

### Prerequisites:

1. Node.js and npm installed.
2. MongoDB or MariaDB set up and running.

### Steps:

1. Clone the repository:
   ```bash
   [git clone https://github.com/your-username/music-website.git](https://github.com/DaoNgocAnh25092004/Bin_Music-FE.git)
   ```
2. Navigate to the project directory:
   ```bash
   cd music-website
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     MONGO_URI=your_mongo_connection_string
     JWT_SECRET=your_secret_key
     CLOUDINARY_URL=your_cloudinary_url
     ```
5. Run the application:
   ```bash
   npm start
   ```

---

## Usage

1. Access the website via the URL provided after starting the server (default: http://localhost:3000).
2. Register as a new user or log in to your account.
3. Explore music, create playlists, and enjoy the content.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For questions or suggestions, please contact us at daongocanh25092004#gmail.com.
