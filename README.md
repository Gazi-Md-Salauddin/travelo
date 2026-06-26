# 🎫 Travelo - Online Ticket Booking Platform

Travelo is a modern online ticket booking platform where users can browse available tickets, book seats securely, and manage their bookings. Vendors can create, update, and manage tickets through a dedicated dashboard.

## 🌐 Live Demo

 https://travelo-dun-two.vercel.app


---

# ✨ Features

## 👤 User Features

- User Authentication (Sign Up & Login)
- Browse Available Tickets
- Search & Filter Tickets
- View Ticket Details
- Book Tickets
- Secure Payment Integration
- Booking History
- Responsive Design
- Dark & Light Theme

## 🏢 Vendor Features

- Vendor Dashboard
- Add New Tickets
- Update Ticket Information
- Delete Tickets
- View Customer Bookings
- Manage Available Seats

## 🔐 Security

- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Secure API Endpoints
- Environment Variable Support

---

# 🛠️ Tech Stack

## Frontend

- Next.js
- React.js
- JavaScript
- HeroUI
- Tailwind CSS
- Better Auth
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB
- JWT
- CORS
- Dotenv

---

# 📂 Project Structure

```text
Travelo
│
├── client/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public
│   └── styles/
│
├── server/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── index.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/travelo.git
```

## Frontend

```bash
cd client

npm install

npm run dev
```

## Backend

```bash
cd server

npm install

npm start
```

---

# 🔑 Environment Variables

## Frontend (.env.local)

```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

## Backend (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 📌 API Endpoints

## Authentication

```http
POST /api/auth/login
POST /api/auth/register
```

## Tickets

```http
GET    /api/tickets
GET    /api/tickets/:id
POST   /api/tickets
PATCH  /api/tickets/:id
DELETE /api/tickets/:id
```

## Bookings

```http
POST /api/bookings
GET  /api/bookings
GET  /api/bookings/vendor/:email
```

---

# 📱 Responsive

- ✅ Mobile
- ✅ Tablet
- ✅ Laptop
- ✅ Desktop

---

# 🔮 Future Improvements

- QR Code Tickets
- Email Notifications
- Seat Selection
- Admin Dashboard
- Refund System
- Ticket Reviews
- Analytics Dashboard
- Real-time Seat Availability

---



# 👨‍💻 Developer

Developed with Gazi Md Salauddin using **Next.js**, **Express.js**, and **MongoDB**.