import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Middleware kiểm tra quyền admin
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization as string | undefined;
    if (!token) {
        return res.status(401).json({
            message: "Authentication required: Token missing or invalid",
            status: 401
        });
    }

    const accessToken = process.env.ACCESS_TOKEN_SECRET as string || 'duydeptrai';

    jwt.verify(token.split(' ')[1], accessToken, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Unauthorized",
                status: 403,
                err
            });
        }

        const decodedUser = user as JwtPayload;

        if (decodedUser?.role === 'admin') {
            next();
        } else {
            return res.status(403).json({
                message: "Permission required: Admin access only",
                status: 403
            });
        }
    });
};

// Middleware kiểm tra quyền người dùng hoặc admin
export const authUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization as string | undefined;
    if (!token) {
        return res.status(401).json({
            message: "Authentication required: Token missing or invalid",
            status: 401
        });
    }

    const accessToken = process.env.ACCESS_TOKEN_SECRET as string || 'duydeptrai';

    jwt.verify(token.split(' ')[1], accessToken, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Token expired or invalid",
                status: 403,
                err
            });
        }

        const decodedUser = user as JwtPayload;
        if (decodedUser?.id) {
            req.body.userId=decodedUser?.id;
            next();
        } else {
            return res.status(403).json({
                message: "Permission denied",
                status: 'Error'
            });
        }
    });
};
