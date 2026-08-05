# TechCrush Capstone Project

# Event Ticket Booking & Reservation API

## Overview

The Event Ticket Booking & Reservation API is a RESTful backend application that enables event organizers to create and manage events while allowing users to browse events, reserve tickets, make payments, and receive reservation confirmation emails.

The project was developed as part of the TechCrush Capstone Project using Node.js, Express.js, PostgreSQL, and Sequelize ORM, following a layered architecture with controllers, services, middleware, validators, and utilities.

---

## Features

### Authentication & Authorization

- User registration
- User login
- JWT authentication
- Password hashing with bcrypt
- Protected routes
- Role-based authorization (USER and ORGANIZER)

### Event Management

- Create events
- Update events
- Delete events
- Get all events
- Get a single event
- Get organizer's events
- Search events
- Filter events by category
- Pagination
- Upload event banner images to Cloudinary

### Reservation Management

- Reserve event tickets
- View user reservations
- Get reservation details
- Cancel reservations
- Automatic ticket availability updates
- Database transaction support

### Payment Management

- Simulated payment processing
- Unique payment reference generation
- Reservation confirmation
- Email notification after successful payment

### Additional Features

- Centralized error handling
- Custom AppError implementation
- Async handler utility
- Request validation
- Environment variable configuration
- Sequelize model relationships
- Clean service-based architecture

---

## Technology Stack

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL
- Sequelize ORM

### Authentication

- JSON Web Token (JWT)
- bcryptjs

### File Storage

- Cloudinary
- Multer

### Email Service

- Nodemailer

### Other Packages

- dotenv
- uuid
- express-validator

---

## Project Structure

```
src/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
│
server.js
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=event_ticket_db
DB_USER=your_database_username
DB_PASSWORD=your_database_password

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the application

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/auth/register |
| POST | /api/v1/auth/login |
| GET | /api/v1/auth/me |

### Events

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/events |
| GET | /api/v1/events |
| GET | /api/v1/events/my-events |
| GET | /api/v1/events/:id |
| PUT | /api/v1/events/:id |
| DELETE | /api/v1/events/:id |

### Reservations

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/reservations |
| GET | /api/v1/reservations |
| GET | /api/v1/reservations/:id |
| PATCH | /api/v1/reservations/:id/cancel |

### Payments

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/payments |

---

## Authentication

Protected endpoints require a valid JWT Bearer Token.

Example:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Search, Filtering and Pagination

The Events endpoint supports query parameters.

Example:

```
GET /api/v1/events?page=1&limit=10&category=Technology&search=Summit
```

---

## Email Notifications

After a successful payment, a reservation confirmation email is automatically sent to the user containing:

- Event information
- Venue
- Date
- Time
- Ticket quantity
- Total amount
- Payment reference

---

## Image Upload

Event banner images are uploaded to Cloudinary, and the secure image URL is stored in the database.

---

## Error Response Format

Example:

```json
{
    "success": false,
    "status": "error",
    "message": "Event not found"
}
```

---

## Future Improvements

- Integration with real payment gateways (Paystack, Flutterwave or Stripe)
- QR Code ticket generation
- Ticket verification system
- Refund management
- Event analytics dashboard
- Docker support

---

## Author

Ojetunde Kabir Olatunde

Backend Developer

---

## License

This project was developed for educational andlearning purposes.