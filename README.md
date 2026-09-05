# 🛍️ AkStore — Modern MERN Stack E-Commerce Platform

<p align="center">
  <img src="frontend/src/assets/logo1.jpg" alt="AkStore Logo" width="120" style="border-radius: 50%" />
</p>

<p align="center">
  <b>A comprehensive, full-stack E-Commerce application with full product collections, advanced multi-filtering, persistent cart, admin dashboard, and multi-gateway payment integrations (Razorpay & Stripe).</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Cloudinary-Integration-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
</p>

---

## 🌟 Key Features

### 🛒 Customer Storefront (Frontend)
- **Extensive Collections & Realistic Pricing**:
  - **Men's Collection**: Cotton T-shirts, Polos, Shirts, Chinos, Tapered Trousers, Denim & Bomber Jackets.
  - **Women's Collection**: Cotton Tops, Crop Tops, Blouses, Palazzos, High-Waist Trousers, Puffer & Trench Jackets.
  - **Kids' Collection**: Graphic Tees, Peplum Tops, Joggers, Cargo Pants, and Denim Jeans.
- **Dynamic Filtering & Sorting**:
  - Filter simultaneously by **Categories** (*Men*, *Women*, *Kids*) and **Types** (*Topwear*, *Bottomwear*, *Winterwear*).
  - Sort by **Relevant**, **Price: Low to High**, or **Price: High to Low**.
- **Real-Time Search Bar**: Instant search with keyword filtering across the entire catalog.
- **Interactive Product Details Page**:
  - Multiple image thumbnails view & smooth hover zoom.
  - Interactive Size Selector (`S`, `M`, `L`, `XL`, `XXL`).
  - Related Products section dynamically filtered by category.
- **Persistent Cart & Instant Checkout**:
  - Multi-size cart items with real-time quantity adjustments.
  - LocalStorage persistence and token-authenticated cloud synchronization.
- **Multiple Payment Options**:
  - 💵 **Cash on Delivery (COD)**
  - 💳 **Razorpay Payment Gateway**
  - 💳 **Stripe Checkout Integration**
- **User Authentication & Orders Tracking**:
  - JWT-based Sign Up and Login with automatic token refresh.
  - Real-time Order Tracking page displaying delivery status and payment method.

---

### 🛡️ Admin Dashboard (Admin Panel)
- **Product Management**: Upload new products with multi-image support (via Cloudinary), category tags, sizes, and pricing.
- **Order Monitoring**: View all incoming customer orders, update order status (e.g. *Order Placed*, *Packing*, *Shipped*, *Out for Delivery*, *Delivered*), and manage payments.
- **Secure Admin Authentication**: Dedicated protected routes with admin token verification.

---

## 🏗️ Project Architecture

```plaintext
AkStore-mernstack-project/
├── backend/                  # Express.js REST API Server
│   ├── config/               # MongoDB & Cloudinary configuration
│   ├── controllers/          # User, Product, Cart, and Order controllers
│   ├── middleware/           # Auth, AdminAuth, and Multer upload middleware
│   ├── models/               # Mongoose schemas (User, Product, Order)
│   ├── routes/               # API endpoint route definitions
│   ├── seed.js               # Database seeder script
│   └── server.js             # Express app entry point & CORS configuration
│
├── frontend/                 # Customer React Web App (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── assets/           # Curated collection images & product catalog
│   │   ├── components/       # Reusable UI components (NavBar, ProductItem, Hero, etc.)
│   │   ├── context/          # ShopContext for global state & cart management
│   │   └── pages/            # Home, Collection, Product, Cart, PlaceOrder, Orders, Login
│   └── index.html            # Entry HTML with CSP configuration
│
└── admin/                    # Admin Management React Web App (Vite + Tailwind CSS)
    ├── src/
    │   ├── components/       # Admin Navbar, Sidebar, etc.
    │   └── pages/            # Add Products, List Products, Orders Management
    └── index.html
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** database URI or local MongoDB instance

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/aadarsh2006ak/INIB-E-COMMERCE-STORE2.git
cd INIB-E-COMMERCE-STORE2
```

---

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@akstore.com
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FRONTEND_URL=http://localhost:5173,http://localhost:5174
```

Start the backend server:
```bash
npm start
# or for development mode:
npm run server
```

*(Optional) Seed the database with sample collection products:*
```bash
npm run seed
```

---

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Run the frontend development server:
```bash
npm run dev
```
Open **http://localhost:5173** in your browser.

---

### 4️⃣ Admin Panel Setup
```bash
cd ../admin
npm install
```

Create a `.env` file in the `admin/` directory:
```env
VITE_BACKEND_URL=http://localhost:4000
```

Run the admin panel development server:
```bash
npm run dev
```
Open **http://localhost:5174** in your browser.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/user/register` | Register a new user | No |
| `POST` | `/api/user/login` | Login user & return JWT token | No |
| `POST` | `/api/user/admin` | Admin login | No |
| `GET` | `/api/product/list` | Fetch all products | No |
| `POST` | `/api/product/add` | Add product with images | Admin Token |
| `POST` | `/api/product/remove` | Delete a product | Admin Token |
| `POST` | `/api/product/single` | Get single product details | No |
| `POST` | `/api/cart/get` | Get user cart items | User Token |
| `POST` | `/api/cart/add` | Add item to cart | User Token |
| `POST` | `/api/cart/update` | Update item quantity in cart | User Token |
| `POST` | `/api/order/place` | Place COD Order | User Token |
| `POST` | `/api/order/stripe` | Initialize Stripe Checkout session | User Token |
| `POST` | `/api/order/razorpay` | Initialize Razorpay Order | User Token |
| `POST` | `/api/order/userorders` | Get user order history | User Token |
| `POST` | `/api/order/list` | Get all orders for admin | Admin Token |
| `POST` | `/api/order/status` | Update order delivery status | Admin Token |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/aadarsh2006ak/INIB-E-COMMERCE-STORE2/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).
