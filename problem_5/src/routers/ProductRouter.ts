import express, { Router, Application } from 'express';
import ProductController from '../controllers/ProductController';
import {authMiddleware, authUserMiddleware } from '../middlewares/authMiddleware';

const router: Router = express.Router();

const ProductRouter = (app: Application): void => {
    router.post('',authMiddleware,ProductController.create);
    router.get('/:id',ProductController.getDetail)
    router.patch('/:id',ProductController.update);
    router.delete('',authUserMiddleware,ProductController.delete)
    router.get('',ProductController.getAll);
    app.use('/api/v1/products', router);
};

export default ProductRouter;