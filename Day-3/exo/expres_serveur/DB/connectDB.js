import mongoose from "mongoose";
mongoose
    .connect("mongodb://localhost:27017/db_classement_des_clubs_de_la_ligue_1")
    .then(() => console.log("connected"))
    .catch((err)=> console.error("connection error: ", err));