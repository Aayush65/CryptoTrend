import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';

config();
const app = express();

app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response) => res.send("Hello World!!"));

mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        console.clear();
        console.log(`Connected to MongoDB and Listening on Port ${process.env.PORT}`);
        app.listen(process.env.PORT);
    })
    .catch((err) => {
        console.clear();
        console.log("Can't connect to the MongoDB");
        console.log(err);
    });