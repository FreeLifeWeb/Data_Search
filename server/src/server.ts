import express, { Request, Response } from 'express';
import fs from 'fs-extra';
import morgan from 'morgan';
import cors from 'cors';
import dataRouter from './routes/apiRoute';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
    cors({
        credentials: true,
        origin: true,
    })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', dataRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
