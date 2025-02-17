import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtUtils';
import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
interface ServiceResponse {
  status: number;
  data: any;
  message?: string;
  error?: number;
}

class UserService {
  async register(userData: { 
    email: string; 
    password: string; 
    fullName: string; 
    phone?: string 
  }): Promise<ServiceResponse> {
    if (!userData.email || !userData.password || !userData.fullName) {
      return {
        status: 400,
        data: {},
        message: 'Please fill in all required information',

      };
    }
    // Check if email exists
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      return {
        status: 400,
        data: {},
        message: 'Email is already in use',

      };
    }

    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordStrengthRegex.test(userData.password)) {
      return {
        status: 400,
        data: {},
        message: 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.',
      };
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Create new user
    const newUser = await UserModel.create({
      ...userData,
      password: hashedPassword,
      isActive: true,
      role: 'user'
    });

    return {
      status: 201,
      data: {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        phone: newUser.phone,
        role: newUser.role
      },
      message: 'Registration successful',

    };
  }

  async login(credentials: { email: string; password: string }): Promise<ServiceResponse> {
    const user = await UserModel.findOne({ email: credentials.email });
    if (!user) {
      return {
        status: 401,
        data: {},
        message: 'Invalid email or password',

      };
    }

    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
    if (!isValidPassword) {
      return {
        status: 401,
        data: {},
        message: 'Invalid email or password',

      };
    }

    if (!user.isActive) {
      return {
        status: 403,
        data: {},
        message: 'Account is locked',

      };
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    return {
      status: 200,
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        }
      },
      message: 'Login successful',

    };
  }

  async getAllUser(req: Request): Promise<ServiceResponse> {
    try {
      const current = parseInt((req.query as any).page || '1');
      const pageSize = parseInt((req.query as any).limit || '10');
      const email = (req.query as any).email || '';
  
      const skip = (current - 1) * pageSize;
  
      const query: any = {};
      if (email) {
        query.email = { $regex: email, $options: 'i' };
      }
  
      const result = await UserModel.find(query)
        .skip(skip)
        .limit(pageSize)
        .sort({createdAt:-1});
  
      const totalItems = await UserModel.countDocuments(query);
      const totalPages = Math.ceil(totalItems / pageSize);
  
      return {
        status: 200,
        data: {
          items: result,
          meta: {
            count: result.length,
            current_page: current,
            per_page: pageSize,
            total: totalItems,
            total_pages: totalPages,
          },
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {},
        message: 'Error retrieving user list',
      };
    }
  }

  async getDetail(userId:string):Promise<ServiceResponse>{
    try {
        const user = await UserModel.findById(userId).select('-password');
        if(!user){
            return {
                status: 404,
                data: {},
                message: 'User not found!',
              };
        }
        return {
            status: 200,
            data: user,
          };
    } catch (error) {
        return {
            status: 500,
            data: {},
            message: 'Error retrieving user list',
          };
    }
  }
  

  
  async refreshToken(req: Request): Promise<ServiceResponse> {
    try {
      const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'duydeptrai';
      const token = req.body.refresh_token;
  
      const user = await new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET, (err: any, decodedUser: JwtPayload | any) => {
          if (err) {
            return reject(err);
          } else {
            if (decodedUser) {
              resolve(decodedUser);
            } else {
              reject(new Error('User decoding failed'));
            }
          }
        });
      });
  
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role
      };
  
      const accessToken = await generateAccessToken(payload);
      const refreshToken = await generateRefreshToken(payload);
  
      return {
        status: 200,
        message: "Success!",
        data: {
          accessToken,
          refreshToken
        }
      };
  
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        data: {},
        message: 'Error retrieving user list',
      };
    }
  }

}

export default new UserService();