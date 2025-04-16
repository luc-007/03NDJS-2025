import express from "express";
import express from ".db/connectDB.js";
import autoRoutes from "./routes/auth.js;

//connect db
connectDB;

// init express
const app = express();

//any middleware here

//API route
app.use("/api/v1/", authRoutes;

//any error handler her

const port = process.env.PORT || 5000; // .env PORT or Hard coded

app.listen(port, () => {
    console.log('server running on port ${port}');
});