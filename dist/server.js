import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import restaurantRoutes from "./routes/restaurantRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
// Default route
app.get("/", (req, res) => {
    res.send("TastyTrack API is running...");
});
app.use("/api/restaurants", restaurantRoutes);
// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((error) => console.log("Database connection error:", error));
