import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { updateUserWatchListController } from './controllers/updateUserWatchListController';
import { addUserWatchListController } from './controllers/addUserWatchListController';
import { getUserWatchListController } from './controllers/getUserWatchListController';

config();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/:email', getUserWatchListController);

app.post('/new-user', addUserWatchListController);
app.post('/', updateUserWatchListController);

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