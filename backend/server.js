require("dotenv").config({ path: "../.env" });


const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

const cors = require("cors");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");


app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.get("/", (req, res) => {
  res.send("CryptoSA backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




console.log("MONGO_URI =", process.env.MONGO_URI);
