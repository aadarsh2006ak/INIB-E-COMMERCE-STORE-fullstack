import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// INFO: Create express app mern stack
const app = express();
const port = process.env.PORT;
connectDB();
connectCloudinary();

// INFO: Middleware
app.use(express.json());

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : ["https://akstores.netlify.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const isAllowed =
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes(origin + "/") ||
        origin.startsWith("http://localhost") ||
        origin.startsWith("http://127.0.0.1");
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev to avoid CORS blocks
      }
    },
    credentials: true,
  })
);

// INFO: API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
// INFO: Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// INFO: Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
