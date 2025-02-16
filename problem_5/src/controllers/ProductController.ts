import { Request, Response, NextFunction } from 'express';
import ProductService from '../services/ProductService';

class ProductController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ProductService.create(req);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
  async getDetail (req:Request,res:Response,next:NextFunction){
    try {
      const idProduct = req.params.id;
      const result = await ProductService.getDetail(idProduct);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  async update (req:Request,res:Response,next:NextFunction){
    try {
      const data = req.body;
      const idProduct=req.params.id;
      const result = await ProductService.update(data,idProduct);
      res.status(result.status).json(result);
    } catch (error) {
      next(error)
    }
  }
  async delete (req:Request,res:Response,next:NextFunction){
    try {
      const ids = req.body.ids;
      const userId=req.body?.userId
      const result = await ProductService.delete(ids,userId);
      res.status(result.status).json(result);
    } catch (error) {
      next(error)
    }
  }
  async getAll (req:Request,res:Response,next:NextFunction){
    try {
      const result = await ProductService.getAll(req);
      res.status(result.status).json(result);
    } catch (error) {
      next(error)
    }
  }
}

export default new ProductController();
