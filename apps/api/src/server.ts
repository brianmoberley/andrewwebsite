import express from "express";
import cors from "express-cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

import { errorHandler } from "./middleware/error-handler.js";
import { requestLogger } from "./middleware/logger.js";

// Routes
import authRoutes from "./routes/auth.js";
import leadsRoutes from "./routes/leads.js";
import customersRoutes from "./routes/customers.js";
import estimatesRoutes from "./routes/estimates.js";
import invoicesRoutes from "./routes/invoices.js";
import projectsRoutes from "./routes/projects.js";
import scheduleRoutes from "./routes/schedule.js";
import messagesRoutes from "./routes/messages.js";
import filesRoutes from "./routes/files.js";
import portfolioRoutes from "./routes/portfolio.js";
import paymentsRoutes from "./routes/payments.js";
import webhooksRoutes from "./routes/webhooks.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.WEB_BASE_URL || "http://localhost:3000",
      process.env.ADMIN_BASE_URL || "http://localhost:3002",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("combined"));
app.use(requestLogger);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/estimates", estimatesRoutes);
app.use("/api/invoices", invoicesRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/files", filesRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/webhooks", webhooksRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Not found",
    path: req.path,
  });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
