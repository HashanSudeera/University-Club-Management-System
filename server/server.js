import express from 'express';
import { PORT, MONGO_URL } from './config.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

//mmiddleware
app.use((req, res, next) => {
    console.log(`Path : ${req.path} | Method : ${req.method}`);
    next();
})

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
