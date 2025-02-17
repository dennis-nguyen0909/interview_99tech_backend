import { ServiceResponse } from '../types';
import  { Request } from 'express';
import ProductModel, { IProduct } from '../models/ProductModel';

class ProductService {
   async create(req: Request): Promise<ServiceResponse> {
    try {
      const { name, description, price, category, stock, sizes, colors,userId } = req.body;
    
      if (!userId) {
        return {
          status: 404,
          message: 'userId is required!',
          data: null,
        };
      }

      if (!name || !description || !price || !category || stock === undefined) {
        return {
          status: 404,
          message: 'Missing required fields: name, description, price, category, stock, sizes, and colors are required',
          data: null,
        };
      }

      const newProduct = new ProductModel({
        name,
        description,
        price,
        category,
        stock,
        sizes,
        colors,
        userId,
      });

      const savedProduct = await newProduct.save();

      return {
        status: 201,
        message: 'Product created successfully',
        data: savedProduct,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Failed to create product',
        data: null,
        error
      };
    }
  }
  async getDetail(idProduct:string):Promise<ServiceResponse>{
    try {
      const product = await ProductModel.findById(idProduct);
      if(!product){
        return {
          status:400,
          message:'Not found!',
          data:null
        }
      }
      return {
        status:200,
        data:product,
        message:'Success'
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Error from server!',
        data: null,
        error
      };
    }
  }
  async update(data:IProduct,idProduct:string):Promise<ServiceResponse>{
    try {
      // Tìm sản phẩm dựa trên idProduct
      const product = await ProductModel.findById(idProduct);
    
      // Nếu không tìm thấy sản phẩm
      if (!product) {
        return {
          status: 404,
          message: 'Product not found!',
          data: null
        };
      }
    
      console.log("product",product?.userId+'')
      console.log(" data?.userId", data?.userId)
      if (product.userId?.toString() !== data?.userId) {
        return {
          status: 403,
          message: 'You do not have permission to update this product!',
          data: null
        };
      }
    
      const productUpdated = await ProductModel.findByIdAndUpdate(idProduct, {
        ...data
      }, {
        new: true
      });
    
      if (!productUpdated) {
        return {
          status: 400,
          message: 'Update failed!',
          data: null
        };
      }
    
      return {
        status: 200,
        data: productUpdated,
        message: 'Success'
      };
    
    } catch (error) {
      return {
        status: 500,
        message: 'Error from server!',
        data: null,
        error
      };
    }
    
  }

  async delete(ids: string[], userId: string): Promise<ServiceResponse> {
    try {
      const result = await ProductModel.deleteMany({
        _id: { $in: ids },
        userId: userId,
      });
  
      if (result.deletedCount > 0) {
        return {
          status: 200,
          message: 'Products deleted successfully',
          data: result,
        };
      } else {
        return {
          status: 404,
          message: 'No products found to delete or user is unauthorized',
          data: null,
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Error from server!',
        data: null,
        error,
      };
    }
  }
  
  async getAll(req: Request): Promise<ServiceResponse> {
    try {
      const current = parseInt((req.query as any).page || '1');
      const pageSize = parseInt((req.query as any).limit || '10');
      const search = (req.query as any).search || '';
      const userId = (req.query as any).userId || ''; 
      const skip = (current - 1) * pageSize;
  
      const query: any = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      if(userId){
        query.userId=userId
      }
  
      console.log("query",query)
      const result = await ProductModel.find(query)
        .skip(skip)
        .limit(pageSize)
        .sort({createdAt:-1});
  
      const totalItems = await ProductModel.countDocuments(query);
      const totalPages = Math.ceil(totalItems / pageSize);
  
      return {
        message: 'Success',
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
}

export default new ProductService();