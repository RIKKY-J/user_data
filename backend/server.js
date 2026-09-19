import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import logger from "./middleware/logger.js";

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});