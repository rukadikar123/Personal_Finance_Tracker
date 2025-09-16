# Personal Finance Tracker

A full-stack web application to track your income and expenses, built with React, Redux, Node.js, Express, and MongoDB.

---
[Deployed URL](https://personal-finance-tracker-frontend-13ka.onrender.com)
Note: This app is hosted on Render (free tier).
The backend spins down after inactivity, so the first request may take 10-20 seconds to load.

## Backend

### Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication (with cookies)
- bcryptjs (for password hashing)
- dotenv (for environment variables)
- CORS & cookie-parser

### Features

- User authentication (signup, login, logout)
- JWT-based session management (stored in HTTP-only cookies)
- CRUD operations for transactions (add, edit, delete, list)
- Each transaction linked to the authenticated user
- Input validation and error handling

### API Endpoints

#### Auth Routes (`/api/auth`)
- `POST /signup` — Register a new user  
  **Body:** `{ name, email, password }`
- `POST /login` — Login user  
  **Body:** `{ email, password }`
- `GET /getUser` — Get current logged-in user (requires authentication)
- `GET /logout` — Logout current user (requires authentication)

#### Transaction Routes (`/api/transaction`)
- `GET /` — Get all transactions for the logged-in user
- `POST /add` — Add a new transaction  
  **Body:** `{ title, amount, date, category }`
- `PATCH /:id` — Update a transaction by ID  
  **Body:** `{ title?, amount?, date?, category? }`
- `DELETE /:id` — Delete a transaction by ID

### Folder Structure

```
Backend/
│
├── config/
│   └── DBConnect.js
├── controller/
│   ├── Transaction.controller.js
│   └── User.controller.js
├── Middleware/
│   └── isAuthenticated.js
├── model/
│   ├── Transaction.schema.js
│   └── User.schema.js
├── routes/
│   ├── transaction.routes.js
│   └── user.routes.js
└── index.js
```

### Running the Backend

```bash
cd Backend
npm install
npm run dev
```

---

## Frontend

### Tech Stack

- React.js (with hooks)
- Redux Toolkit
- React Router DOM
- Axios
- React Toastify
- Tailwind CSS

### Features

- User authentication (signup, login, logout)
- Protected routes (only authenticated users can access main app)
- Add, edit, and delete transactions
- View all transactions for the logged-in user
- Responsive UI with Tailwind CSS
- Toast notifications for feedback

### Folder Structure

```
Frontend/
│
├── public/
├── src/
│   ├── Components/
│   │   └── Navbar.jsx
│   ├── CustomHooks/
│   │   └── useGetUser.js
│   ├── Pages/
│   │   ├── AddOrEdit.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── Redux/
│   │   ├── authSlice.js
│   │   └── store.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json
```


### Running the Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## License

MIT
