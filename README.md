## **Overview**

This project is a **web-based classified ads platform** where users can browse different categories of ads, view subcategories, and manage favorite ads. The platform includes user authentication, session management, and a RESTful API to fetch and manipulate data dynamically.

It is built with **Node.js, Express.js, and Handlebars.js** for templating, along with **HTML, CSS, and JavaScript** for the frontend.

---

## **Features**

### **1. User Authentication**

- Users can **log in** via a form.
- Session management is handled via **session ID** stored in `localStorage`.
- Login status is dynamically displayed in the navbar.
- **Logout button** clears session data and updates the UI.

---

### **2. Classified Ads Browsing**

- Users can explore **various ad categories and subcategories**.
- Ads are fetched in real-time from the external **Wiki-Ads API**.
- Handlebars.js templates are used to dynamically render ad content.

---

### **3. Favorite Ads Management**

- Logged-in users can:
  - **Add ads to their favorites**
  - **View their personal favorites list**
  - **Remove ads from their favorites**
- Favorite ads are **stored per user in a MongoDB database**.
- Each favorite is tied to a specific user and session.
- UI updates immediately when a favorite is added or removed.

---

### **4. Backend Services & API**

- Backend powered by **Express.js** handles:
  - Page serving
  - Session validation
  - CRUD operations for favorites
- Key API Endpoints:
  - `POST /login` – Authenticate user
  - `GET /get-favourites` – Internal endpoint to get user's favorites
  - `GET /get-favourite-ads` – Public-facing route for frontend to retrieve favorites
  - `POST /add-to-favourites` – Save ad to favorites (MongoDB)
  - `DELETE /remove-from-favourites` – Remove ad from favorites (MongoDB)

---

### **5. Responsive and Dynamic UI**

- Mobile-first design using responsive CSS
- Favorite and logout buttons dynamically show/hide based on login status
- Interactive elements powered by JavaScript and Fetch API

---

## **Technologies Used**

### **Frontend**

- **HTML, CSS, JavaScript**
- **Handlebars.js** – For templating dynamic ad content
- **FontAwesome** – Icons and UI enhancements
- **Fetch API** – For dynamic, async communication with the backend
- **LocalStorage** – For storing session data client-side

### **Backend**

- **Node.js + Express.js** – Core backend framework
- **MongoDB** – Stores favorite ads per user
- **Mongoose** – For interacting with MongoDB
- **UUID** – Generates unique session IDs
- **Cors** – Handles cross-origin requests

---

## **External APIs & Services**

- **Wiki-Ads API** – Provides ad data via:  
  `https://wiki-ads.onrender.com/ads`

---

## **Future Improvements**

- Add full **user registration** and hashed password storage
- Use **JWT tokens** for secure session handling
- Add **favorites sorting and category filtering**

