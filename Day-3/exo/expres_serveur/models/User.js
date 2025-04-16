import { Schema, mode } from "mongoose";
const userSchema = nzw Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: String,
    isAdmin: {
        type: Boolean,
        defaut: false,
    },
    created_at: {
        type:Date,
        default: Date.now,
    },
});

export const User = model("User", userSchema);
        