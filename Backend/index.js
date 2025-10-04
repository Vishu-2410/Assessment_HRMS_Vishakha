import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
// import authRoutes from "./routes/auth.js";
// import employeeRoutes from "./routes/employees.js";
// import requestRoutes from "./routes/requests.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB(process.env.MONGO_URI);

//   app.use("/api/auth", authRoutes);
//   app.use("/api/employees", employeeRoutes);
//   app.use("/api/requests", requestRoutes);

  app.get("/", (req, res) => res.send("HRMS Backend Running"));

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
