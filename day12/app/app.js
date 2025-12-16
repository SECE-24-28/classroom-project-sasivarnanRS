const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const rechargeRoutes = require("./src/routes/rechargeRoutes");
const planRoutes = require("./src/routes/planRoutes");
const statsRoutes = require("./src/routes/statsRoutes");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  next();
});

// Database connection
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recharges", rechargeRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/stats", statsRoutes);

// Test route (optional)
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// Server start
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;