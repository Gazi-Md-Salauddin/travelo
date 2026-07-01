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
- Gravity UI Icons

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
├── app/
├── components/
├── lib/
├── public/
├── styles/
└── package.json
```

---

# ⚙️ Installation

## Clone Repository

```bash
https://github.com/Gazi-Md-Salauddin/travelo.git
```

## Frontend

```bash
cd travelo

npm install

npm run dev
```

## Backend

```bash
cd travelo-server

npm install

npm start
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

- Email Notifications
- Seat Selection
- Refund System
- Ticket Reviews
- Analytics Dashboard
- Real-time Seat Availability

---



# 👨‍💻 Developer

Developed with Gazi Md Salauddin using **Next.js**, **Express.js**, and **MongoDB**.