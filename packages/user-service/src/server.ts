import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

export class server{
    public app:Application;

    public constructor(){
        this.app = express();
        this.configrationMiddleware();
        this.configreRoute();
    }

    private configrationMiddleware():void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));

        this.app.use(cors());
        this.app.use(helmet());

        this.app.use((req,res,next)=>{
            console.log(`${new Date().toISOString()}-${req.method} ${req.path}`);
            next();
        });
    }

    private configreRoute():void{
        this.app.use('/api/auth',authRoutes);
        this.app.use('/api/users',userRoutes);


        this.app.get('/health', (req, res) => {
            res.status(200).json({
              status: 'ok',
              message: 'User service is running',
              timestamp: new Date().toISOString()
            });
        });
    }


    public async connectToDatabase(): Promise<void> {
        try {
          await mongoose.connect(config.mongoUri);
          console.log('Connected to MongoDB');
        } catch (error) {
          console.error('MongoDB connection error:', error);
          process.exit(1);
        }
      }
    

    public start():void{
        const port =  config.port;

        this.app.listen(port,()=>{
            console.log(`server is running on port ${port}`);
        });
    }
}


export default new server();
