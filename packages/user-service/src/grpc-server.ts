import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import config from './config';



export class server{
    public app: Application;


    constructor(){
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
    }

    private configureMiddleware(): void {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(cookieParser());
    }

    private configureRoutes(): void {
        this.app.get('/', (req, res) => {
            res.send('Server is running');
        });
    }
}