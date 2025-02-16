import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.register(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.login(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers (req:Request,res: Response,next: NextFunction){
    try {
        const listUsers = await UserService.getAllUser(req);
        res.status(200).json({
            data: listUsers,
            message: 'Success',
          });
    } catch (error) {
        next(error);
    }
  }
}

export default new UserController();
