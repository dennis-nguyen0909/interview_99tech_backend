import express from 'express';
import { connectDB } from './database';
import { errorHandler } from './middlewares/errorHandler';
import UserRouter from './routers/UserRouter';
import ProductRouter from './routers/ProductRouter';
import cors from 'cors'
const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(errorHandler); 
// Routes
UserRouter(app);
ProductRouter(app)

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
