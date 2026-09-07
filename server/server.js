import express from 'express';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import { PORT, MONGO_URL } from './config.js';
import eventRoutes from "./routes/event.js";
import eventRegisterRoutes from "./routes/eventRegisterRoutes.js";

import adminRoutes from './routes/admin.js';
import clubRoutes from "./routes/club.js";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173", //frontend URL
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());

//mmiddleware
app.use((req, res, next) => {
    console.log(`Path : ${req.path} | Method : ${req.method}`);
    next();
})

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/events",eventRoutes);
//app.use("/api/eventRegisters",eventRegisterRoutes);
app.use("/api/eventRegisters", eventRegisterRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/clubs", clubRoutes);

//connect Mongo database
mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listeneing on port ${PORT} & DB connected`);
        })
    })
    .catch((error) => {
        console.log(error);
    })
