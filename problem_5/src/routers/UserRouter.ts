import express, { Router, Application } from 'express';
import UserController from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router: Router = express.Router();

const UserRouter = (app: Application): void => {
    router.post('/login', UserController.login);
    router.post('/register', UserController.register);
    router.get('',authMiddleware,UserController.getAllUsers);
    app.use('/api/v1/users', router);
};

export default UserRouter;