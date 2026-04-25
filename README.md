# 🍽️ FoodHub — Smart Food Ordering Platform

FoodHub is a full-stack food ordering platform designed to connect customers with local food providers in a seamless, scalable, and modern way. It enables users to browse meals, place orders, make payments, and interact through reviews—while providers manage offerings and fulfill orders efficiently.

---

## 🚀 Core Features

### 👤 Customer Features

- Browse meals by category, cuisine, and diet type
- Add items to cart and manage quantities
- Place orders with:
  - Cash on Delivery (COD)
  - Online Payment (SSLCommerz integration)

- Track order status (Placed → Preparing → Ready → Delivered)
- Submit reviews (rating + comment) after delivery
- View:
  - ⭐ Top Rated Meals
  - 🔥 Most Ordered Meals
  - 📈 Most Popular Meals (extendable)

---

### 🧑‍🍳 Provider Features

- Manage meals (create, update, delete)
- Set availability of meals
- View incoming orders
- Approve and process orders
- Track order lifecycle

---

### 💳 Payment System

- Integrated SSLCommerz payment gateway
- Secure transaction flow:
  - Payment initiation
  - Gateway redirection
  - Success / Fail / Cancel callbacks

- Payment statuses:
  - Pending
  - Paid
  - Failed

---

## 🏗️ Tech Stack

### Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- Server Actions

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (NeonDB)

### Payment Integration

- SSLCommerz

---

## 🧠 System Architecture

```
Frontend (Next.js)
   ↓
Server Actions / API Calls
   ↓
Backend (Express)
   ↓
Prisma ORM
   ↓
PostgreSQL Database
   ↓
Payment Gateway (SSLCommerz)
```

---

## 📦 Database Design (Core Models)

### 🛒 Order

- Tracks customer orders
- Linked with OrderItems
- Includes payment and delivery status

### 🍔 Meal

- Food item listed by provider
- Categorized by cuisine and diet

### ⭐ Review

- One review per user per meal
- Used for rating system

### 🛍️ Cart & CartItem

- Temporary storage before order placement

---

## 🔄 Order Flow

### Cash on Delivery

1. User adds items to cart
2. Enters address
3. Clicks “Place Order (COD)”
4. Order created with:
   - PaymentStatus: PENDING
   - OrderStatus: PLACED

---

### Online Payment

1. User clicks “Pay Online”
2. Redirect to Payment Page
3. Enters address
4. Payment initiated
5. Redirect to SSLCommerz
6. On success:
   - PaymentStatus → PAID
   - OrderStatus → PLACED

---

## 📊 Smart Data Features

FoodHub supports dynamic insights:

- **Top Rated Meals**
  - Based on average review rating

- **Most Ordered Meals**
  - Based on total order quantity

- **Most Popular Meals (Extendable)**
  - Can be based on:
    - View count
    - Wishlist count
    - Votes

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/foodhub.git
cd foodhub
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3. Environment Variables

Create `.env` in backend:

```env
DATABASE_URL=your_database_url

SSL_STORE_ID=your_store_id
SSL_STORE_PASS=your_store_password
```

---

### 4. Database Setup

```bash
npx prisma migrate dev
npx prisma generate
```

---

### 5. Run Project

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm run dev
```

---

## 🔐 Security Considerations

- Auth middleware for protected routes
- Payment validation via gateway callbacks
- Server-side validation for all critical operations

---

## 🧪 Future Improvements

- Real-time order tracking
- Notification system (email/SMS)
- Advanced analytics dashboard
- AI-based food recommendation system
- Multi-vendor scaling

---

## 🎯 Project Goals

- Build a production-ready full-stack system
- Implement real-world payment integration
- Practice scalable architecture using Prisma + Next.js
- Deliver a strong portfolio-level project

---

## 📌 Conclusion

FoodHub is not just a basic CRUD food app—it is a structured, scalable system that simulates real-world food delivery platforms with payment integration, analytics, and user interaction layers.

---

---
