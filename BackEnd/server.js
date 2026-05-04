const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
    syncDB
} = require("./models");

const app = express();

/* MIDDLEWARES */
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({
    extended: true
}));

app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/donors", require("./routes/donorRoutes"));
app.use("/api/hospitals", require("./routes/hospitalRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/history", require("./routes/donationHistoryRoutes"));
app.use("/api/requests", require("./routes/bloodRequestRoutes"));
app.use("/api/stock", require("./routes/stockRoutes"));
app.get("/", (req, res) => {
    res.json({
        message: "Server is running "
    });
});

/* DB SYNC */
syncDB();

/* START SERVER */
app.listen(5000, () => {
    console.log("Server running on port 5000 🚀");
});