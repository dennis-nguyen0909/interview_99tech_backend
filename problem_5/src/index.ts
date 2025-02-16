import express from 'express';
import { connectDB } from './database';
import { errorHandler } from './middlewares/errorHandler';
import UserRouter from './routers/UserRouter';
import ProductRouter from './routers/ProductRouter';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
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
