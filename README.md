## **Overview**
This project is a **web-based classified ads platform** where users can browse different categories of ads, view subcategories, and add favorite ads. The platform includes user authentication, session management, and an API to fetch ads dynamically.

It is designed with **Node.js, Express.js, and Handlebars.js** for templating, alongside **HTML, CSS, and JavaScript** for the frontend.

## **Features**
### **1. User Authentication**
- Users can **log in** via a form.
- Session management is handled using a **session ID**.
- The login status is dynamically updated on the navbar.

### **2. Classified Ads Management**
- Users can browse **various ad categories**.
- Ads are fetched dynamically from an external API (`wiki-ads.onrender.com`).
- The site uses **Handlebars.js** templates for rendering.

### **3. Favorite Ads**
- Users can **add ads to their favorites**.
- Favorite ads are stored per user (simulated with an in-memory database).
- Users can view their favorite ads on a dedicated page.

### **4. API and Backend Services**
- **Express.js server** handles requests and serves HTML pages.
- API endpoints:
  - `/login` - Authenticates users.
  - `/get-favourites` - Retrieves a user's favorite ads.
  - `/add-to-favourites` - Adds an ad to the user's favorites.

### **5. Responsive UI**
- The website is **mobile-friendly**.
- Navigation bar and filters ensure an easy browsing experience.


## **Technologies Used**
### **Frontend:**
- **HTML, CSS, JavaScript**
- **Handlebars.js** (templating engine)
- **FontAwesome** (icons)
- **AJAX / Fetch API** (for dynamic content loading)

### **Backend:**
- **Node.js & Express.js** (server-side framework)
- **UUID** (for session management)
- **Cors & Body-Parser** (for API requests)
- **LocalStorage** (for session persistence)
- **Mock authentication system** (stored in memory)

### **External APIs & Services**
- **Wiki-Ads API** (`https://wiki-ads.onrender.com/`) for fetching ads dynamically.


## **Future Improvements**
- Implement **a real database** (MongoDB/PostgreSQL) instead of an in-memory store.
- Enhance security for **user authentication**.

