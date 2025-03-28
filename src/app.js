import express from "express";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/post", postRoutes);

app.use(errorHandler);

export default app;
