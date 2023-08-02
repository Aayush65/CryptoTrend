import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config();
const app = express();

app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response) => res.send("Hello World!!"));

app.listen(process.env.PORT || 3000, () => console.log(`Listening on Port ${process.env.PORT || 3000}`));